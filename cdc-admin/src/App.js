import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import $ from 'jquery';
import InputCustomizado  from './componentes/InputCustmizado';

class App extends Component {

  constructor() {
    super();
    this.state = { lista: [], nome: '', email: '', senha: '' };
    this.enviaForm = this.enviaForm.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setSenha = this.setSenha.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: "http://cdc-react.herokuapp.com/api/autores",
      dataType: 'json',
      success: function (resposta) {
        this.setState({ lista: resposta });
      }.bind(this)
    });
  }

  enviaForm(evento) {
    evento.preventDefault();
    $.ajax({
      url: 'http://cdc-react.herokuapp.com/api/autores',
      contentType: 'application/json', //como vai ser enviado
      dataType: 'json',//o tipo de dado da resposta
      type: 'post', // tipo de requisicao
      data: JSON.stringify({ nome: this.state.nome, email: this.state.email, senha: this.state.senha }),    //uma string
      success: function (resposta) {
        console.log('enviado com sucesso')
        this.setState({ lista: resposta });
      }.bind(this),
      error: function (resposta) {
        console.log('erro')
      }
    })
  }

  setNome(evento) {
    this.setState({ nome: evento.target.value });
  }

  setEmail(evento) {
    this.setState({ email: evento.target.value });

  }

  setSenha(evento) {
    this.setState({ senha: evento.target.value });

  }


  render() {
    return (
      //o react nao injeta uma string, ele retorna varios elementos do react, Ex.:
      // React.createElement(..)
      <div id="layout">
        <a href="#menu" id="menuLink" className="menu-link">

          <span></span>
        </a>

        <div id="menu">
          <div className="pure-menu">
            <a className="pure-menu-heading" href="https://google.com">Company</a>

            <ul className="pure-menu-list">
              <li className="pure-menu-item"><a href="#Home" className="pure-menu-link">Home</a></li>
              <li className="pure-menu-item"><a href="#Autor" className="pure-menu-link">Autor</a></li>
              <li className="pure-menu-item"><a href="#Livro" className="pure-menu-link">Livro</a></li>
            </ul>
          </div>
        </div>

        <div id="main">
          <div className="header">
            <h1>Cadastro de Autores</h1>
          </div>
          <div className="content" id="content">

            <div className="pure-form pure-form-aligned">
              <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
              
                <InputCustomizado id="" type="text" name="nome" value={this.state.nome} onChange={this.state.setNome} label="Nome"/>

                <InputCustomizado id="" type="text" name="email" value={this.state.email} onChange={this.state.setEmail} label="Email"/>

                <InputCustomizado id="" type="text" name="senha" value={this.state.senha} onChange={this.state.setSenha} label="Senha"/>
                
                <div className="pure-control-group">
                  <label></label>
                  <button type="submit" className="pure-button pure-button-primary">Gravar</button>
                </div>
              </form>

            </div>
            <div>
              <table className="pure-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>email</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.lista.map(function (autor) {
                      return (
                        <tr key={autor.id}>
                          <td>{autor.nome}</td>
                          <td>{autor.email}</td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
