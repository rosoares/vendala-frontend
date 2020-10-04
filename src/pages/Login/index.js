import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import api from "../../shared/api";
import {setToken} from "../../shared/auth";

const Login = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState();
  const history = useHistory();

  const _login = (event) => {
    event.preventDefault();

    setLoading(true);

    let data = {
      email: email,
      password: password,
    }

    api.post('auth/login', data)
      .then(response => {
        alert("Logged in");
        setToken(response.data.access_token);
        history.push('/products');
      })
      .catch(error => alert(error))
      .finally(() => setLoading(false))
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={_login}>
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
        {
          loading ?
            <p>Carregando...</p> :
            <button type="submit">Login</button>
        }
      </form>
    </div>
  )
}

export default Login;