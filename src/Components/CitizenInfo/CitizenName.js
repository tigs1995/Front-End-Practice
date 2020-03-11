import React, { Component } from 'react';

export default class CitizenName extends Component{
  render() {
      return (
      <p value={this.props.value}>{this.props.value}</p>
      )
  }

}