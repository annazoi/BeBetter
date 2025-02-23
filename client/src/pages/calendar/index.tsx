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
import { Button, Header, Icon } from "semantic-ui-react";
import { Feature, History } from "../../interfaces/feature";
import { HistoryType } from "../../enums/historyType";
import "./style.css";
// import { date } from "yup";
// import { h } from "@fullcalendar/core/preact.js";

const Calendar: FC = () => {
  const { userId } = authStore((state) => state);

  const [selectedDate, setSelectedDate] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState<historiesCalendarEvent[]>([]);
  const [selectedFeature, setSelectedFeature] = useState<any | null>(null);
  const [selectedhistory, setSelectedHistory] = useState<History | null>(null);
  const [isOpenDate, setIsOpenDate] = useState<boolean>(false);
  const [selectedDateEvents, setSelectedDateEvents] = useState<
    historiesCalendarEvent[]
  >([]);

  const { data: features } = useQuery({
    queryKey: ["features"],
    queryFn: () => getFeatures({ userId }),
  });

  useEffect(() => {
    const formattedEvents: historiesCalendarEvent[] =
      features?.flatMap((feature) =>
        feature.history.map((history: any) => {
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
            title: feature.name,
            id: history.id,
            date: utcDate,
            type: history.type,
          };
        })
      ) || [];

    setEvents(formattedEvents);
  }, [features]);

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
  };

  return (
    <div>
      <Modal
        color={
          selectedhistory?.type === HistoryType.NEGATIVE
            ? "rgb(199, 171, 171)"
            : "rgb(171, 199, 171)"
        }
        name={selectedFeature?.name}
        onOpen={isModalOpen}
        onClose={() => {
          handleModal();
          setSelectedFeature(null);
        }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <Icon
            name={
              selectedhistory?.type === HistoryType.NEGATIVE
                ? "arrow alternate circle down outline"
                : "arrow alternate circle up outline"
            }
          />
          <p>{selectedhistory?.description}</p>
        </div>
      </Modal>

      <Modal onOpen={isOpenDate} onClose={() => setIsOpenDate(false)}>
        {selectedDateEvents.length == 0 ? (
          <div>
            <Header as="h3">No events for this date</Header>
            <div>{selectedDate}</div>
          </div>
        ) : (
          <>
            <Header as="h3">Events for this date</Header>
            <div className="history-list">
              {selectedDateEvents.map((event: any) => (
                <Button
                  key={event.id}
                  onClick={() => handleEventClick({ event: { id: event.id } })}
                  color={event.type === HistoryType.NEGATIVE ? "red" : "green"}
                  style={{
                    marginBottom: "10px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Icon
                    name={
                      event.type === HistoryType.NEGATIVE
                        ? "arrow alternate circle down outline"
                        : "arrow alternate circle up outline"
                    }
                    style={{ color: "white" }}
                  />
                  <text
                    style={{
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    {event.title}
                  </text>
                  <text
                    style={{
                      marginLeft: "10px",
                      fontSize: "10px",
                      color: "darkolivegreen",
                    }}
                  >
                    {event.date
                      .toISOString()
                      .split("T")[1]
                      .split(".")[0]
                      .slice(0, 5)}
                  </text>
                </Button>
              ))}
            </div>
          </>
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
        // events={lessEvents}
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
            <div>
              <span style={{ fontWeight: "bold" }}>{info.dayNumberText}</span>
              <br />
              {matchingEvents.length > 0 ? (
                <span style={{ fontSize: "10px", color: "blue" }}>
                  {matchingEvents.length} Events 📅
                </span>
              ) : (
                <span style={{ fontSize: "10px", color: "gray" }}>
                  No Events
                </span>
              )}
            </div>
          );
        }}
      />
    </div>
  );
};

export default Calendar;
