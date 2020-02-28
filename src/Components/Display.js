import React from "react";

export default class Display extends React.Component{

    render(){
        return(
            <div>
                Thank you for logging in!
                Username: {this.props.username}
            </div>
        );
    }

}
