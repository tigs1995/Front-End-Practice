import React, { Component } from 'react';

export default class DataInput extends Component{
  render() {
      return (
      <input type={this.props.type} placeholder={this.props.placeholder} name={this.props.name} onChange={this.props.onChange}/>
      )
  }

}