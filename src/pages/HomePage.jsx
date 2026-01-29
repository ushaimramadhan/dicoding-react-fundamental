import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getActiveNotes, deleteNote, archiveNote } from '../utils/network-data';
import NoteItem from '../components/NoteItem';
import SearchBar from '../components/SearchBar';

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const keyword = searchParams.get('keyword') || '';

  useEffect(() => {
    async function fetchNotes() {
      const { data } = await getActiveNotes();
      if (data) {
        setNotes(data);
      }
      setLoading(false); 
    }

    fetchNotes();
  }, []); 

  async function onDeleteHandler(id) {
    await deleteNote(id);
    const { data } = await getActiveNotes();
    setNotes(data);
  }

  async function onArchiveHandler(id) {
    await archiveNote(id);
    const { data } = await getActiveNotes();
    setNotes(data);
  }

  function onKeywordChangeHandler(keyword) {
    setSearchParams({ keyword });
  }

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });

  return (
    <section className="homepage">
      <h2>Catatan Aktif</h2>
      
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />

      {loading ? (
        <p className="notes-list__empty-message">Memuat data...</p>
      ) : (
        <>
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
        </>
      )}
      
      <div className="homepage__action">
        <Link to="/notes/new" className="action">Tambah</Link>
      </div>
    </section>
  );
}

export default HomePage;