import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../Actions/authActions";
import SearchButton from "./SearchButton";

export default class HomePage extends React.Component {

    // onLogoutClick = e => {
    //     e.preventDefault();
    //     this.props.logoutUser();
    // };
    

    render() {
        return (<div>
            <button onClick={()=> window.location.href="./CitizenSearch"} name="Citizen">Citizen</button>
            <button onClick={()=> window.location.href="./VehicleSearch"} name="Vehicle">Vehicle</button>
            <button onClick={()=> window.location.href="./LocationSearch"} name="Location">Location</button>
</div>
        );
    }
}





// render() {
    // const { user } = this.props.auth;
    // return (
        // <div>
        //     Thank you for logging in!
        //     Username  : {this.props.match.params.username}
        // </div>
//             <div style={{ height: "75vh" }} className="container valign-wrapper">
//                 <div className="row">
//                     <div className="col s12 center-align">
//                         <h4>
//                             <b>Hey there,</b> {user.name.split(" ")[0]}
//                             <p className="flow-text grey-text text-darken-1">
//                                 You are logged into a full-stack{" "}
//                                 <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
//               </p>
//                         </h4>
//                         <button
//                             style={{
//                                 width: "150px",
//                                 borderRadius: "3px",
//                                 letterSpacing: "1.5px",
//                                 marginTop: "1rem"
//                             }}
//                             onClick={this.onLogoutClick}
//                             className="btn btn-large waves-effect waves-light hoverable blue accent-3"
//                         >
//                             Logout
//             </button>
//                     </div>
//                 </div>
//             </div>
//     );
// }
// }

// HomePage.propTypes = {
//     logoutUser: PropTypes.func.isRequired,
//     auth: PropTypes.object.isRequired
// };
// const mapStateToProps = state => ({
//     auth: state.auth
// });

// export default connect(
//     mapStateToProps,
//     { logoutUser }
// )(HomePage);
