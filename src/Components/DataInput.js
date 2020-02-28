import React, { Component } from 'react';

export default class DataInput extends React.Component{
  render() {
      return (
      <input type={this.props.type} placeholder={this.props.name} onChange={this.props.onChange}/>
      )
  }

}
