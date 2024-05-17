import FullCalendar from "@fullcalendar/react";
import { FC, useEffect, useMemo, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useMutation, useQuery } from "react-query";
import { authStore } from "../../store/authStore";
import { getFeatures, getFeature, createFeature } from "../../services/feature";
import { historiesCalendarEvent } from "../../interfaces/components";
import Modal from "../../components/ui/Modal";
import {
  Button,
  Container,
  Form,
  Header,
  Segment,
  TextArea,
} from "semantic-ui-react";
import Input from "../../components/ui/Input";
import { Feature, History, NewFeature } from "../../interfaces/feature";
import { set } from "react-hook-form";

const Calendar: FC = () => {
  const { userId } = authStore((state) => state);

  const [selectedDate, setSelectedDate] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState<historiesCalendarEvent[]>([]);
  const [selectedFeature, setSelectedFeature] = useState<any | null>(null);
  const [selectedhistory, setSelectedHistory] = useState<History | null>(null);

  const { data: features, refetch } = useQuery({
    queryKey: ["features"],
    queryFn: () => getFeatures({ userId }),
    onSuccess: (data) => {
      console.log("features", data);
    },
  });

  useEffect(() => {
    const events: historiesCalendarEvent[] =
      features?.flatMap((feature) => {
        return feature.history.map((history) => {
          return {
            title: feature.name,
            id: history.id,
            date: new Date(history.date),
            // backgroundColor: history.color,
          };
        });
      }) || [];
    setEvents(events);
    console.log("events", events);
    console.log("data", features);
  }, [features]);

  const handleDateClick = (date: string) => {
    // if (new Date(date) < new Date()) return;
    setSelectedDate(date);
  };

  const handleDateClick2 = (arg: any) => {
    handleDateClick(arg.dateStr);
  };

  const toggleModal = () => {
    if (selectedDate) {
      setSelectedDate(undefined);
    }
    setIsModalOpen(!isModalOpen);
  };

  const handleEventClick = (arg: any) => {
    toggleModal();
    const historyId = arg.event.id;
    let selectedFeature: Feature | null = null;
    let selectedHistory: History | null = null;

    features?.map((feature) => {
      feature.history.find((history) => {
        if (history.id === historyId) {
          selectedHistory = history;
          selectedFeature = feature;
        }
      });
    });

    setSelectedHistory(selectedHistory);
    setSelectedFeature(selectedFeature);
    console.log("selectedHistory", selectedHistory);
    console.log("selectedFeature", selectedFeature);
  };

  const handleDateChange = () => {
    refetch();
  };

  const handleCancel = () => {
    refetch();
    setSelectedFeature(null);
  };

  return (
    <div>
      <Modal
        name={selectedFeature?.name}
        onOpen={isModalOpen}
        onClose={() => {
          toggleModal();
          setSelectedFeature(null);
        }}
      >
        <div>
          <Header as="h2">{selectedhistory?.type}</Header>
          <p>{selectedhistory?.description}</p>
        </div>
      </Modal>

      <FullCalendar
        allDaySlot={false}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek",
        }}
        slotDuration={"00:30:00"}
        selectable={true}
        dateClick={handleDateClick2}
        events={events}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        eventClick={handleEventClick}
      />
    </div>
  );
};

export default Calendar;
