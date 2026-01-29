import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import { register } from "../utils/network-data";

function RegisterPage() {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const navigate = useNavigate();

  async function onRegisterHandler(event) {
    event.preventDefault();

    const { error } = await register({ name, email, password });
    if (!error) {
      alert('Register berhasil! Silakan login.');
      navigate('/');
    }
  }

  return(
    <section className="register-page">
      <h2>Isi form untuk mendaftar akun.</h2>
      <div className="input-register">
        <form onSubmit={onRegisterHandler}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} onChange={onNameChange} />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={onEmailChange} />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={onPasswordChange} />

          <button>Register</button>
        </form>
      </div>
      <p>Sudah punya akun? <Link to={'/'}>Login di sini</Link></p>
    </section>
  )
}

export default RegisterPage;