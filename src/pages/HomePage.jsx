import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getActiveNotes, deleteNote, archiveNote } from '../utils/local-data';
import NoteItem from '../components/NoteItem';
import SearchBar from '../components/SearchBar'; // Import SearchBar

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = React.useState(getActiveNotes());
  
  // Ambil keyword dari URL. Jika kosong, defaultnya string kosong.
  const keyword = searchParams.get('keyword') || '';

  function onDeleteHandler(id) {
    deleteNote(id);
    setNotes(getActiveNotes());
  }

  function onArchiveHandler(id) {
    archiveNote(id);
    setNotes(getActiveNotes());
  }

  // Fungsi ini akan mengubah URL saat diketik
  function onKeywordChangeHandler(keyword) {
    setSearchParams({ keyword });
  }

  // Filter notes berdasarkan keyword
  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });

  return (
    <section className="homepage">
      <h2>Catatan Aktif</h2>
      
      {/* Pasang SearchBar di sini */}
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />

      {filteredNotes.length > 0 ? (
        <div className="notes-list">
          {filteredNotes.map((note) => (
            <NoteItem 
              key={note.id} 
              {...note} 
              onDelete={onDeleteHandler}
              onArchive={onArchiveHandler}
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