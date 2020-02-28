import React from "react";

export default class Display extends React.Component{

    render(){
        return(
            <div>
                Thank you for logging in!
                Username  : {this.props.match.params.username}
            </div>
        );
    }

}
