import FullCalendar from "@fullcalendar/react";
import { FC, useEffect, useMemo, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid/index.js";
import timeGridPlugin from "@fullcalendar/timegrid/index.js";
import interactionPlugin from "@fullcalendar/interaction/index.js";
import { useQuery } from "react-query";
import { authStore } from "../../store/authStore";
import { getActivities } from "../../services/activity";
import { historiesCalendarEvent } from "../../interfaces/components";
import Modal from "../../components/ui/Modal";
import { Activity, History } from "../../interfaces/activity";
import { HistoryType } from "../../enums/historyType";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Hash,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import "./style.css";

const formatToLocalDate = (date: Date) => {
  return (
    date.getFullYear() +
    "-" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date.getDate()).padStart(2, "0")
  );
};

const formatDisplayDate = (dateStr: string | null) => {
  if (!dateStr) return "";
  const date = new Date(`${dateStr}T12:00:00`);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
};

const formatEventTime = (date: Date) => {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const getEventTypeMeta = (type?: string) => {
  switch (type) {
    case HistoryType.NEGATIVE:
      return { label: "Missed", Icon: TrendingDown, tone: "negative" as const };
    case HistoryType.POSITIVE:
      return { label: "Success", Icon: TrendingUp, tone: "positive" as const };
    case HistoryType.NUMERIC:
      return { label: "Logged", Icon: Hash, tone: "numeric" as const };
    case HistoryType.BOOLEAN:
      return { label: "Completed", Icon: CheckCircle2, tone: "boolean" as const };
    default:
      return { label: "Entry", Icon: CheckCircle2, tone: "neutral" as const };
  }
};

const Calendar: FC = () => {
  const { userId } = authStore((state) => state);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalView, setModalView] = useState<"day-list" | "event-detail">("day-list");
  const [events, setEvents] = useState<historiesCalendarEvent[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [selectedHistory, setSelectedHistory] = useState<History | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { data: activities } = useQuery({
    queryKey: ["activities"],
    queryFn: () => getActivities({ userId }),
  });

  useEffect(() => {
    const formattedEvents: historiesCalendarEvent[] =
      activities?.flatMap((activity) =>
        activity.history.map((history: any) => {
          const localDate = new Date(history.date);
          const utcDate = new Date(
            localDate.getUTCFullYear(),
            localDate.getUTCMonth(),
            localDate.getUTCDate(),
            localDate.getUTCHours(),
            localDate.getUTCMinutes(),
            localDate.getUTCSeconds()
          );

          return {
            title: activity.name,
            id: history.id,
            date: utcDate,
            type: history.type,
            description: history.description,
            value: history.value,
          };
        })
      ) || [];

    setEvents(formattedEvents);
  }, [activities]);

  const selectedDateEvents = useMemo(() => {
    if (!selectedDate) return [];
    return events.filter(
      (event) => event.date && formatToLocalDate(event.date) === selectedDate
    );
  }, [selectedDate, events]);

  const handleDateClick = (arg: { dateStr: string }) => {
    setSelectedDate(arg.dateStr);
    setSelectedActivity(null);
    setSelectedHistory(null);
    setModalView("day-list");
    setIsModalOpen(true);
  };

  const findEventContext = (historyId: string) => {
    for (const item of activities ?? []) {
      const match = item.history.find((entry) => entry.id === historyId);
      if (match) {
        return { activity: item, history: match };
      }
    }
    return { activity: null, history: null };
  };

  const openEventDetail = (historyId: string) => {
    const { activity, history } = findEventContext(historyId);
    if (!activity || !history) return;

    setSelectedActivity(activity);
    setSelectedHistory(history);
    setModalView("event-detail");
    setIsModalOpen(true);
  };

  const backToDateList = () => {
    setModalView("day-list");
    setSelectedActivity(null);
    setSelectedHistory(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalView("day-list");
    setSelectedDate(null);
    setSelectedActivity(null);
    setSelectedHistory(null);
  };

  const handleCalendarEventClick = (arg: { event: { id: string } }) => {
    const { activity, history } = findEventContext(arg.event.id);
    if (!activity || !history?.date) return;

    setSelectedDate(formatToLocalDate(new Date(history.date)));
    setSelectedActivity(activity);
    setSelectedHistory(history);
    setModalView("event-detail");
    setIsModalOpen(true);
  };

  const eventDetailMeta = getEventTypeMeta(selectedHistory?.type);
  const EventDetailIcon = eventDetailMeta.Icon;

  return (
    <div className="animate-fade-up">
      <div className="calendar-page-header">
        <h1 className="calendar-page-title">Calendar</h1>
        <p className="calendar-page-subtitle">Review your habit history day by day</p>
      </div>

      <Modal
        size="small"
        onOpen={isModalOpen}
        onClose={closeModal}
        header={
          modalView === "event-detail" ? (
            <div className="calendar-event-detail-header">
              {selectedDate && (
                <button
                  type="button"
                  className="calendar-event-back"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    backToDateList();
                  }}
                >
                  <ArrowLeft size={16} />
                  Back to day
                </button>
              )}
              <div className={`calendar-event-type-badge calendar-event-type-badge--${eventDetailMeta.tone}`}>
                <EventDetailIcon size={14} strokeWidth={2.5} />
                {eventDetailMeta.label}
              </div>
              <h2 className="calendar-event-detail-title font-display">{selectedActivity?.name}</h2>
              {selectedHistory?.date && (
                <p className="calendar-event-detail-meta">
                  {formatDisplayDate(formatToLocalDate(new Date(selectedHistory.date)))}
                  {" · "}
                  {formatEventTime(new Date(selectedHistory.date))}
                </p>
              )}
            </div>
          ) : (
            <div className="calendar-day-header">
              <div className="calendar-day-header__icon">
                <CalendarDays size={20} strokeWidth={2} />
              </div>
              <div>
                <p className="calendar-day-header__eyebrow">Daily log</p>
                <h2 className="calendar-day-header__title font-display">
                  {formatDisplayDate(selectedDate)}
                </h2>
                <p className="calendar-day-header__count">
                  {selectedDateEvents.length}{" "}
                  {selectedDateEvents.length === 1 ? "entry" : "entries"}
                </p>
              </div>
            </div>
          )
        }
      >
        <div key={modalView} className="calendar-modal-panel">
          {modalView === "event-detail" && selectedHistory ? (
            <div className="calendar-event-detail-body">
              {selectedHistory.type === HistoryType.NUMERIC && selectedHistory.value != null && (
                <div className="calendar-event-stat">
                  <span className="calendar-event-stat__label">Value logged</span>
                  <span className="calendar-event-stat__value font-display">
                    {selectedHistory.value}
                    {selectedActivity?.unit ? ` ${selectedActivity.unit}` : ""}
                  </span>
                </div>
              )}

              <div className="calendar-event-note">
                <span className="calendar-event-note__label">Note</span>
                <p className="calendar-event-note__text">
                  {selectedHistory.description?.trim()
                    ? selectedHistory.description
                    : "No note was added for this entry."}
                </p>
              </div>
            </div>
          ) : selectedDateEvents.length === 0 ? (
            <div className="calendar-empty-state">
              <div className="calendar-empty-state__icon">
                <CalendarDays size={28} strokeWidth={1.5} />
              </div>
              <h3 className="calendar-empty-state__title font-display">Nothing logged yet</h3>
              <p className="calendar-empty-state__text">
                No habit entries were recorded on this day.
              </p>
            </div>
          ) : (
            <div className="calendar-event-list">
              {selectedDateEvents.map((event) => {
                const meta = getEventTypeMeta(event.type);
                const TypeIcon = meta.Icon;

                return (
                  <button
                    key={event.id}
                    type="button"
                    className={`calendar-event-row calendar-event-row--${meta.tone}`}
                    onClick={() => openEventDetail(event.id!)}
                  >
                    <div className={`calendar-event-row__icon calendar-event-row__icon--${meta.tone}`}>
                      <TypeIcon size={18} strokeWidth={2.25} />
                    </div>
                    <div className="calendar-event-row__content">
                      <span className="calendar-event-row__title">{event.title}</span>
                      <span className="calendar-event-row__type">{meta.label}</span>
                    </div>
                    <div className="calendar-event-row__meta">
                      {event.date && (
                        <span className="calendar-event-row__time">{formatEventTime(event.date)}</span>
                      )}
                      <ChevronRight size={16} className="calendar-event-row__chevron" />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </Modal>

      <FullCalendar
        allDaySlot={false}
        headerToolbar={
          isMobile
            ? { left: "prev,next", center: "title", right: "today" }
            : { left: "prev,next today", center: "title", right: "dayGridMonth,timeGridWeek" }
        }
        slotDuration={"00:30:00"}
        selectable={true}
        dateClick={handleDateClick}
        contentHeight={isMobile ? "auto" : 700}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        eventClick={handleCalendarEventClick}
        dayCellContent={(info) => {
          const formattedInfoDate = formatToLocalDate(info.date);
          const matchingEvents = events.filter(
            (event) => event.date && formatToLocalDate(event.date) === formattedInfoDate
          );

          return (
            <div className={`calendar-day-cell ${matchingEvents.length > 0 ? "has-events" : ""}`}>
              <span className="day-number">{info.dayNumberText}</span>
              <div className="event-count-wrapper">
                {matchingEvents.length > 0 ? (
                  <span className="event-badge">
                    {isMobile
                      ? matchingEvents.length
                      : `${matchingEvents.length} ${matchingEvents.length === 1 ? "Event" : "Events"}`}
                  </span>
                ) : (
                  <span className="empty-day-state">{isMobile ? "" : "Empty"}</span>
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
