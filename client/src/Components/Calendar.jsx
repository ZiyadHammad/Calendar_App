import React, { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import AddEventModal from "./AddEvent";
import axios from "axios";
import moment from "moment";

const Calendar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);

  const onEventAdded = (event) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent({
      start: moment(event.start).toDate(),
      end: moment(event.end).toDate(),
      title: event.title
    });
  };

  async function handleEventAdd(data) {
    await axios.post("/api/calendar/create-event", data.event);
  }

  async function handledatesSet(data) {
    const response = await axios.get(
      "/api/calendar/get-events?start=" +
        moment(data.start).toISOString() +
        "&end=" +
        moment(data.end).toISOString
    );

    setEvents(response.data)
  }
  return (
    <section>
      <button onClick={() => setModalOpen(true)}>Add Event</button>

      <div style={{ position: "relative", zIndex: 0 }}>
        <FullCalendar
          events={events}
          datesSet={(date) => handledatesSet(date)}
          ref={calendarRef}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          eventAdd={(event) => handleEventAdd(event)}
        />
      </div>

      <AddEventModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onEventAdded={(event) => onEventAdded(event)}
      />
    </section>
  );
};

export default Calendar;
