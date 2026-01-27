import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getArchivedNotes, deleteNote, unarchiveNote } from '../utils/local-data';
import NoteItem from '../components/NoteItem';

function ArchivedPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = React.useState(getArchivedNotes());
  const keyword = searchParams.get('keyword') || '';

  function onDeleteHandler(id) {
    deleteNote(id);
    setNotes(getArchivedNotes());
  }

  function onUnarchiveHandler(id) {
    unarchiveNote(id); // Kembalikan ke catatan aktif
    setNotes(getArchivedNotes()); // Update state
  }

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });

  return (
    <section className="archives-page">
      <h2>Catatan Arsip</h2>
      {filteredNotes.length > 0 ? (
        <div className="notes-list">
          {filteredNotes.map((note) => (
            <NoteItem 
              key={note.id} 
              {...note} 
              onDelete={onDeleteHandler}
              onArchive={onUnarchiveHandler} // Di sini fungsinya unarchive
            />
          ))}
        </div>
      ) : (
        <p className="notes-list__empty-message">Arsip kosong</p>
      )}
    </section>
  );
}

export default ArchivedPage;