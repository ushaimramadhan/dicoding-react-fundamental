import React from "react";
import { getAllNotes, deleteNote } from "../utils/local-data";
import NoteItem from "../components/NoteItem";
import { Link } from "react-router-dom";

function HomePage() {
  const [notes, setNotes] = React.useState(getAllNotes());

  function onDeleteHandler(id) {
    deleteNote(id);
    setNotes(getAllNotes());
  }

  return (
    <section className="homepage">
      <h2>Catatan Aktif</h2>
      {notes.length > 0 ? (
        <div className="notes-list">
          {notes.map((note) => (
            <NoteItem
              key={note.id}
              {...note}
              onDelete={onDeleteHandler}
            />
          ))}
        </div>
      ) : (
        <p className="notes-list__empty-message">Tidak ada catatan</p>
      )}

      <div className="homepage__action">
        <Link to='/notes/new' className="action">Tambah</Link>
      </div>
    </section>
  );
}

export default HomePage;