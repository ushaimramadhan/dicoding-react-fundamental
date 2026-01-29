import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getArchivedNotes, deleteNote, unarchiveNote } from '../utils/network-data';
import NoteItem from '../components/NoteItem';
import SearchBar from '../components/SearchBar';

function ArchivedPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const keyword = searchParams.get('keyword') || '';

  useEffect(() => {
    async function fetchArchivedNotes() {
      const { data } = await getArchivedNotes();
      if (data) {
        setNotes(data);
      }
      setLoading(false);
    }

    fetchArchivedNotes();
  }, []);

  async function onDeleteHandler(id) {
    await deleteNote(id);
    const { data } = await getArchivedNotes();
    setNotes(data);
  }

  async function onUnarchiveHandler(id) {
    await unarchiveNote(id);
    const { data } = await getArchivedNotes();
    setNotes(data);
  }

  function onKeywordChangeHandler(keyword) {
    setSearchParams({ keyword });
  }

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });

  return (
    <section className="archives-page">
      <h2>Catatan Arsip</h2>
      
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />

      {loading ? (
        <p className="notes-list__empty-message">Memuat arsip...</p>
      ) : (
        <>
          {filteredNotes.length > 0 ? (
            <div className="notes-list">
              {filteredNotes.map((note) => (
                <NoteItem 
                  key={note.id} 
                  {...note} 
                  onDelete={onDeleteHandler}
                  onArchive={onUnarchiveHandler}
                />
              ))}
            </div>
          ) : (
            <p className="notes-list__empty-message">Arsip kosong</p>
          )}
        </>
      )}
    </section>
  );
}

export default ArchivedPage;