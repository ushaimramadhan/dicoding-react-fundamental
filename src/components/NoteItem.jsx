import React from "react";
import { showFormattedDate } from "../utils";
import { Link } from "react-router-dom";

function NoteItem({ id, title, body, createdAt, onDelete }) {
  return (
    <div className="note-item">
      <div className="note-item__content">
        <h3 className="note-item__title">
          <Link to={`/notes/${id}`}>{title}</Link>
        </h3>
        <p className="note-item__date">{showFormattedDate(createdAt)}</p>
        <p className="note-item__body">{body}</p>
      </div>
      <div className="note-item__action">
        <button className="note-item__delete-button" onClick={() => onDelete(id)}>Delete</button>
      </div>
    </div>
  )
}

export default NoteItem;