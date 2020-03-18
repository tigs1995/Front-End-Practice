import React, { Component } from 'react';

export default class BackButton extends Component{

  render() {
      return (
      <button class="button" onClick={this.props.backClick}>Back</button>
      )
  }

}