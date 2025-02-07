import FullCalendar from "@fullcalendar/react";
import { FC, useEffect, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useQuery } from "react-query";
import { authStore } from "../../store/authStore";
import { getFeatures } from "../../services/feature";
import { historiesCalendarEvent } from "../../interfaces/components";
import Modal from "../../components/ui/Modal";
import { Header } from "semantic-ui-react";
import { Feature, History } from "../../interfaces/feature";

const Calendar: FC = () => {
  const { userId } = authStore((state) => state);

  const [selectedDate, setSelectedDate] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState<historiesCalendarEvent[]>([]);
  const [selectedFeature, setSelectedFeature] = useState<any | null>(null);
  const [selectedhistory, setSelectedHistory] = useState<History | null>(null);

  const { data: features } = useQuery({
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

  const handleDateClick = (arg: any) => {
    // if (new Date(arg.dateStr) < new Date()) return;
    setSelectedDate(arg.dateStr);
  };

  const handleModal = () => {
    if (selectedDate) {
      setSelectedDate(undefined);
    }
    setIsModalOpen(!isModalOpen);
  };

  const handleEventClick = (arg: any) => {
    handleModal();
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

  // const handleDateChange = () => {
  //   refetch();
  // };

  // const handleCancel = () => {
  //   refetch();
  //   setSelectedFeature(null);
  // };

  return (
    <div>
      <Modal
        name={selectedFeature?.name}
        onOpen={isModalOpen}
        onClose={() => {
          handleModal();
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
        dateClick={handleDateClick}
        events={events}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        eventClick={handleEventClick}
      />
    </div>
  );
};

export default Calendar;
