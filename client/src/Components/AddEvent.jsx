import React, { useState } from "react";
import Modal from "react-modal";
import DateTime from 'react-datetime'

const AddEvent = ({ isOpen, onClose, onEventAdded }) => {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState(new Date())
  const [end, setEnd] = useState(new Date())

  const onSubmit = (e) => {
    e.preventDefault()

    onEventAdded({
        title,
        start,
        end
    })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <form onSubmit={onSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div>
          <label>Start Date</label>
          <DateTime value={start} onChange={date => setStart(date)} />
        </div>

        <div>
          <label>End Date</label>
          <DateTime value={end} onChange={date => setEnd(date)} />
        </div>

        <button>Add Event</button>
      </form>
    </Modal>
  );
};

export default AddEvent;
