import React, { Component } from 'react';
import $ from 'jquery';
import InputCustomizado from './componentes/InputCustmizado';

class FormularioAutor extends Component {
    constructor() {
        super();
        this.state = {nome: '', email: '', senha: '' };
        this.enviaForm = this.enviaForm.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
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
               this.props.callbackAtualizaListagem(resposta);
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
            <div className="pure-form pure-form-aligned">
              <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">

                <InputCustomizado id="" type="text" name="nome" value={this.state.nome} onChange={this.state.setNome} label="Nome" />

                <InputCustomizado id="" type="text" name="email" value={this.state.email} onChange={this.state.setEmail} label="Email" />

                <InputCustomizado id="" type="text" name="senha" value={this.state.senha} onChange={this.state.setSenha} label="Senha" />

                <div className="pure-control-group">
                  <label></label>
                  <button type="submit" className="pure-button pure-button-primary">Gravar</button>
                </div>
              </form>
            </div>
        )
    }
}

class TabelaAutores extends Component {
    
 

    render() {
        return (
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
                            this.props.lista.map(function (autor) {
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
        );
    }
}

export default class AutorBox extends Component{
    
    constructor() {
        super();
        this.state = {lista: []};
        this.atualizaListagem = this.atualizaListagem.bind(this);
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

      atualizaListagem(novaListagem){
          this.setState = ({lista:novaListagem});
      }

    render(){        
        return(
        <div>
            <FormularioAutor callbackAtualizaListagem={this.atualizaListagem}/>
            <TabelaAutores lista={this.state.lista}/>
        </div>
        );
    }
}