import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import "./styles.scss";
import logoImage from "../../assets/logo.svg";
import api from "../../services/api";
import heroesImage from "../../assets/heroes.png";
export default function Logon(props) {
  const [id, setId] = useState();
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await api.post("session", { id });
      localStorage.setItem("ongId", id);
      localStorage.setItem("ongName", response.data.name);

      history.push("/profile");
    } catch {
      alert("Falha no login, por favor tente novamente mais tarde");
    }
  }

  return (
    <div className={"logon-container"}>
      <section className={"form"}>
        <img src={logoImage} alt={"be the hero"} />
        <form onSubmit={handleLogin}>
          <h1>Faça seu login</h1>
          <input
            placeholder="Sua Id"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className={"button"} type="submit">
            Entrar
          </button>

          <Link className={"back-link"} to="/register">
            <FiLogIn size={16} color={"#e02041"} />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImage} alt={"heroes"} />
    </div>
  );
}
