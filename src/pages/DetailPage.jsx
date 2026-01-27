import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNote, deleteNote } from "../utils/local-data";
import { showFormattedDate } from "../utils";

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const note = getNote(id);

  if (!note) {
    return <section><p>Catatan tidak ditemukan.</p></section>;
  }

  function onDeleteHandler() {
    deleteNote(id);
    navigate('/');
  }

  return (
    <section className="detail-page">
      <h3 className="detail-page__title">{note.title}</h3>
      <p className="detail-page__createdAt">{showFormattedDate(note.createdAt)}</p>
      <div className="detail-page__body">{note.body}</div>

      <div className="detail-page__action">
        <button className="action" type="button" title="Hapus" onClick={onDeleteHandler}>Hapus</button>
      </div>
    </section>
  )
}

export default DetailPage;