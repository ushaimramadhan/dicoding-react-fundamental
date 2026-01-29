import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNote, deleteNote } from "../utils/network-data";
import { showFormattedDate } from "../utils";

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNote() {
      const { data } = await getNote(id);
      setNote(data);
      setLoading(false);
    }
    fetchNote();
  }, [id]);

  async function onDeleteHandler() {
    await deleteNote(id);
    navigate('/');
  }

  if (loading) {
    return <section><p>Memuat catatan...</p></section>;
  }

  if (!note) {
    return <section><p>Catatan tidak ditemukan.</p></section>;
  }

  return (
    <section className="detail-page">
      <h3 className="detail-page__title">{note.title}</h3>
      <p className="detail-page__createdAt">{showFormattedDate(note.createdAt)}</p>
      <div className="detail-page__body">{note.body}</div>

      <div className="detail-page__action">
        <button 
            className="action" 
            type="button" 
            title="Hapus" 
            onClick={onDeleteHandler}
        >
            Hapus
        </button>
      </div>
    </section>
  );
}

export default DetailPage;