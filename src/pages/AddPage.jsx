import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNote } from "../utils/local-data";

function AddPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  function onTitleChangeEventHandler(event) {
    setTitle(event.target.value);
  }

  function onBodyChangeEventHandler(event) {
    setBody(event.target.value);
  }

  function onSubmitEventHandler(event)  {
    event.preventDefault();
    addNote({ title, body });
    navigate('');
  }

  return (
    <section className="add-new-page">
      <h2>Tambah Catatan</h2>
      <form onSubmit={onSubmitEventHandler}>
        <div className="add-new-page__input">
          <input 
            className="add-new-page__input__title"
            placeholder="Judul Catatan..."
            value={title}
            onChange={onTitleChangeEventHandler}
            required 
          />
          <textarea
            className="add-new-page__input__body"
            placeholder="Tuliskan catatanmu di sini..."
            value={body}
            onChange={onTitleChangeEventHandler}
            required
          ></textarea>
        </div>
        <div className="add-new-page__action">
          <button className="action" type="submit" title="Simpan">Simpan</button>
        </div>
      </form>
    </section>
  )
}
export default AddPage;