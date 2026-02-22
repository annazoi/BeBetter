import FullCalendar from "@fullcalendar/react";
import { FC, useEffect, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid/index.js";
import timeGridPlugin from "@fullcalendar/timegrid/index.js";
import interactionPlugin from "@fullcalendar/interaction/index.js";
import { useQuery } from "react-query";
import { authStore } from "../../store/authStore";
import { getActivities } from "../../services/activity";
import { historiesCalendarEvent } from "../../interfaces/components";
import Modal from "../../components/ui/Modal";
import { Header, Icon } from "semantic-ui-react";
import { Activity, History } from "../../interfaces/activity";
import { HistoryType } from "../../enums/historyType";
import "./style.css";
// import { date } from "yup";
// import { h } from "@fullcalendar/core/preact.js";

const Calendar: FC = () => {
  const { userId } = authStore((state) => state);

  const [selectedDate, setSelectedDate] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState<historiesCalendarEvent[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<any | null>(null);
  const [selectedhistory, setSelectedHistory] = useState<History | null>(null);
  const [isOpenDate, setIsOpenDate] = useState<boolean>(false);
  const [selectedDateEvents, setSelectedDateEvents] = useState<
    historiesCalendarEvent[]
  >([]);

  const { data: activities } = useQuery({
    queryKey: ["activities"],
    queryFn: () => getActivities({ userId }),
  });

  useEffect(() => {
    const formattedEvents: historiesCalendarEvent[] =
      activities?.flatMap((activity) =>
        activity.history.map((history: any) => {
          const localDate = new Date(history.date); // This is in local time
          const utcDate = new Date(
            localDate.getUTCFullYear(),
            localDate.getUTCMonth(),
            localDate.getUTCDate(),
            localDate.getUTCHours(),
            localDate.getUTCMinutes(),
            localDate.getUTCSeconds()
          ); // Convert to UTC

          return {
            title: activity.name,
            id: history.id,
            date: utcDate,
            type: history.type,
          };
        })
      ) || [];

    setEvents(formattedEvents);
  }, [activities]);

  useEffect(() => {
    if (selectedDate) {
      const filteredEvents = events.filter(
        (event: any) => event.date.toISOString().split("T")[0] === selectedDate
      );
      setSelectedDateEvents(filteredEvents);
    }
  }, [selectedDate, events]);

  const handleDateClick = (arg: any) => {
    setIsOpenDate(true);
    setSelectedDate(arg.dateStr);
    console.log("selectedDate", arg.dateStr);
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
    let selectedActivity: Activity | null = null;
    let selectedHistory: History | null = null;

    activities?.map((activity) => {
      activity.history.find((history) => {
        if (history.id === historyId) {
          selectedHistory = history;
          selectedActivity = activity;
        }
      });
    });

    setSelectedHistory(selectedHistory);
    setSelectedActivity(selectedActivity);
  };

  return (
    <div>
      <Modal
        color={
          selectedhistory?.type === HistoryType.NEGATIVE
            ? "rgba(255, 71, 87, 0.05)"
            : "rgba(29, 211, 176, 0.05)"
        }
        name={selectedActivity?.name}
        onOpen={isModalOpen}
        onClose={() => {
          handleModal();
          setSelectedActivity(null);
        }}
      >
        <div style={{ display: "flex", gap: "10px", alignItems: 'center' }}>
          <Icon
            name={
              selectedhistory?.type === HistoryType.NEGATIVE
                ? "arrow alternate circle down outline"
                : "arrow alternate circle up outline"
            }
            color={selectedhistory?.type === HistoryType.NEGATIVE ? 'red' : 'green'}
            size="large"
          />
          <p style={{ margin: 0, fontSize: '1.1rem' }}>{selectedhistory?.description}</p>
        </div>
      </Modal>

      <Modal name={`Events for ${selectedDate}`} onOpen={isOpenDate} onClose={() => setIsOpenDate(false)}>
        {selectedDateEvents.length == 0 ? (
          <div style={{ textAlign: 'center', padding: '30px' }}>
            <Icon name="calendar alternate outline" size="huge" style={{ opacity: 0.2, marginBottom: '15px' }} />
            <Header as="h3">No events for this date</Header>
          </div>
        ) : (
          <div className="history-list">
            {selectedDateEvents.map((event: any) => (
              <button
                key={event.id}
                className="history-item-btn"
                onClick={() => handleEventClick({ event: { id: event.id } })}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icon
                    name={
                      event.type === HistoryType.NEGATIVE
                        ? "arrow alternate circle down outline"
                        : "arrow alternate circle up outline"
                    }
                    color={event.type === HistoryType.NEGATIVE ? 'red' : 'green'}
                  />
                  <span style={{ fontWeight: "600" }}>{event.title}</span>
                </div>
                <span style={{ fontSize: "0.8rem", opacity: 0.6 }}>
                  {event.date
                    .toISOString()
                    .split("T")[1]
                    .split(".")[0]
                    .slice(0, 5)}
                </span>
              </button>
            ))}
          </div>
        )}
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
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        eventClick={handleEventClick}
        dayCellContent={(info) => {
          const formatToLocalDate = (date: Date) => {
            return (
              date.getFullYear() +
              "-" +
              String(date.getMonth() + 1).padStart(2, "0") +
              "-" +
              String(date.getDate()).padStart(2, "0")
            );
          };

          const formattedInfoDate = formatToLocalDate(info.date);
          const matchingEvents = events.filter((event: any) => {
            const formattedEventDate = formatToLocalDate(event.date);
            return formattedEventDate === formattedInfoDate;
          });

          return (
            <div style={{ padding: '4px' }}>
              <span style={{ fontWeight: "700", fontSize: '1.1rem' }}>{info.dayNumberText}</span>
              <div style={{ marginTop: '4px' }}>
                {matchingEvents.length > 0 ? (
                  <span style={{
                    fontSize: "0.75rem",
                    color: "var(--success)",
                    background: 'rgba(29, 211, 176, 0.1)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontWeight: '600'
                  }}>
                    {matchingEvents.length} {matchingEvents.length === 1 ? 'Event' : 'Events'}
                  </span>
                ) : (
                  <span style={{ fontSize: "0.75rem", opacity: 0.3 }}>
                    Empty
                  </span>
                )}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default Calendar;
