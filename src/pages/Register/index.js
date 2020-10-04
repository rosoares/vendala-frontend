import React, {useState} from "react";
import api from "../../shared/api";
import {useHistory} from 'react-router-dom';

const Register = () => {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirmation, setPasswordConfirmation] = useState();
  const [loading, setLoading] = useState();
  const history = useHistory();

  const _registerUser = (event) => {
    event.preventDefault();
    setLoading(true);

    let data = {
      name: name,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation
    }

    api.post('/users', data)
      .then(response => {
        alert(response.statusText);
        history.push('/login')
      })
      .catch(error => {
        alert(error);
      })
      .finally(() => setLoading(false))
  }

  return (
    <div>
      <h1>Cadastro de Usuário</h1>
      <form onSubmit={_registerUser}>
        <input
          type="text"
          name="name"
          placeholder="Nome"
          required
          onChange={(e) => setName(e.target.value)}
        />
        <br/>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <br/>
        <input
          type="password"
          name="password"
          placeholder="Senha"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <br/>
        <input
          type="password"
          name="password_confirmation"
          placeholder="Confirme a Senha"
          required
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <br/>
        {
          loading ?
            <p>Carregando...</p> :
            <button type="submit">Cadastrar</button>
        }
      </form>
      <br/>
    </div>
  )
}

export default Register;