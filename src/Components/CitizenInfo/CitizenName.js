import React, { Component } from 'react';

export default class CitizenName extends Component{
  render() {
      return (
      <p>{this.props.fornames} {this.props.surname}</p>
      )
  }

}