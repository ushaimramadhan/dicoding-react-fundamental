import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addNote } from '../utils/local-data';

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

  function onSubmitEventHandler(event) {
    event.preventDefault(); // Mencegah reload browser
    addNote({ title, body }); // Simpan data
    navigate('/'); // Kembali ke Home
  }

  return (
    <section className="add-new-page">
      <h2>Tambah Catatan</h2>
      {/* PERHATIKAN: Tag form membungkus input DAN tombol */}
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
            onChange={onBodyChangeEventHandler}
            required
          ></textarea>
        </div>
        
        {/* Tombol HARUS ada di dalam scope <form> agar type="submit" bekerja */}
        <div className="add-new-page__action">
          <button className="action" type="submit">Simpan</button>
        </div>
      </form> 
    </section>
  );
}

export default AddPage;