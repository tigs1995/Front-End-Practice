import React, { Component } from 'react';

export default class TableHead extends Component{

    constructor(props){
        super(props);
        this.state = {
            arr: [...props.headerList]
        }
    }
    
  render() {
      return (
      <thead>
          <tr>
          {this.state.arr.map(listComponent => (
                  <th id='tableHead'>{listComponent}</th>
          ))}
          </tr>
      </thead>
      )
  }

}