import React, { Component } from 'react';

export  default class InputCustomizado extends Component {
    //props é um atributo da class Component que guarda os parametros que vem de um componente.
    render() {
        return (
            <div className="pure-control-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input id={this.props.id} type={this.props.type}  name={this.props.name}  value={this.props.value} onChange={this.props.onChange} />
            </div>
        )
        
    }    
    
}


