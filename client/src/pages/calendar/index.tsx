import FullCalendar from "@fullcalendar/react";
import { FC, useEffect } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const Calendar: FC = () => {
  const events = [
    { title: "event 1", date: "2021-09-01" },
    { title: "event 2", date: "2021-09-02" },
  ];

  useEffect(() => {
    console.log("Events", events);
  }, [events]);

  const handleDateClick = (arg: any) => {
    alert(arg.dateStr);
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
        //   dateClick={onDateClick}
        dateClick={handleDateClick}
        events={events}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        //   eventClick={onEventClick}
      />
    </div>
  );
};

export default Calendar;
