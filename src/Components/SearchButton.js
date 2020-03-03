import React, { Component } from 'react';

export default class SearchButton extends React.Component{
  render() {
      return (
      <button type={this.props.type} onClick={this.props.sendInfo}/>
      );
  }

}
