import FullCalendar from "@fullcalendar/react";
import { FC, useEffect, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useQuery } from "react-query";
import { authStore } from "../../store/authStore";
import { getFeatures } from "../../services/feature";
import { FeatureCalendarEvent } from "../../interfaces/components";

const Calendar: FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState<FeatureCalendarEvent[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);

  const { userId } = authStore((state) => state);

  const { data: features } = useQuery({
    queryKey: ["features"],
    queryFn: () => getFeatures({ userId }),
  });

  useEffect(() => {
    const events: FeatureCalendarEvent[] =
      features?.map((feature) => {
        return {
          title: feature.name,
          id: feature.id,
        };
      }) || [];
    setEvents(events);
  }, [features]);

  const handleDateClick = (date: string) => {
    if (new Date(date) < new Date()) return;
    setSelectedDate(date);
    toggleModal();
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
    const featuresId = arg.event._def.publicId;
    const feature = features?.find((features) => features.id === featuresId);
    if (feature) {
      setSelectedBooking(feature);
    }
  };

  return (
    <div>
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
        initialView="timeGridWeek"
        eventClick={handleEventClick}
      />
    </div>
  );
};

export default Calendar;
