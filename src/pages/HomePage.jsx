import React from 'react';
import { useSearchParams } from 'react-router-dom'; // Kita siapkan utk search nanti
import { getActiveNotes, deleteNote, archiveNote } from '../utils/local-data';
import NoteItem from '../components/NoteItem';
import { Link } from 'react-router-dom';

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = React.useState(getActiveNotes());
  const keyword = searchParams.get('keyword') || '';

  function onDeleteHandler(id) {
    deleteNote(id);
    setNotes(getActiveNotes());
  }

  function onArchiveHandler(id) {
    archiveNote(id); // Panggil fungsi arsip dari data lokal
    setNotes(getActiveNotes()); // Update state (catatan akan hilang dari sini)
  }

  // Filter notes berdasarkan keyword search (Opsional 2 - sekalian disiapkan)
  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });

  return (
    <section className="homepage">
      <h2>Catatan Aktif</h2>
      {filteredNotes.length > 0 ? (
        <div className="notes-list">
          {filteredNotes.map((note) => (
            <NoteItem 
              key={note.id} 
              {...note} 
              onDelete={onDeleteHandler}
              onArchive={onArchiveHandler} // Pass handler arsip
            />
          ))}
        </div>
      ) : (
        <p className="notes-list__empty-message">Tidak ada catatan</p>
      )}
      <div className="homepage__action">
        <Link to="/notes/new" className="action">Tambah</Link>
      </div>
    </section>
  );
}

export default HomePage;