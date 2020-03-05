import React from 'react';
import DateTimeRangeContainer from 'react-advanced-datetimerange-picker'
import moment from "moment"
import DataInput from '../DataInput';

export default class LocationSearch extends React.Component {
    constructor(props){
        super(props);
        let now = new Date();
        let start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0,0));
        let end = moment(start).add(1, "days").subtract(1, "seconds");
        this.state = {
            start : start,
            end : end
        }

        this.applyCallback = this.applyCallback.bind(this);
    }

    applyCallback(startDate, endDate){
        this.setState({
                start: startDate,
                end : endDate
            }
        )
    }
    
    render(){
            
            let startDisplay = new Date(this.state.start);
            let endDisplay = new Date(this.state.end);
            let now = new Date();
            let start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0,0));
            let end = moment(start).add(1, "days").subtract(1, "seconds");
            let local = {
                "format":"DD-MM-YYYY HH:mm",
                "sundayFirst" : false
            }
            let maxDate = moment(start).add(24, "hour")

            this.handleLatChange = ({target: {value, style}}) => {

                if (value<-11 || value>3){
                    style.backgroundColor = "red";
                } else {
                    style.backgroundColor = "white";
                }
            }
            this.handleLongChange = ({target: {value, style}}) => {

                if(value<49 ||value>60){
                    style.backgroundColor = "red";
                }
                else {
                    style.backgroundColor = "white";
                }
            }

            return(
                <div>
                    <input type="number" min="-11" max="3" name="latitude" placeholder="Latitude: -11° to 3°" onChange={this.handleLatChange}></input>
                    <input type="number" min="49" max="60" name="longitude" placeholder="Longitude: 49° to 60°" onChange={this.handleLongChange}></input>
                    <input type="number" min="0" max="10" name="radius" placeholder="Radius (km)" ></input>
                    <DateTimeRangeContainer 
                        start={this.state.start}
                        end={this.state.end}
                        local={local}
                        maxDate={maxDate}
                        applyCallback={this.applyCallback}
                    >    
                    <button type="submit">Select a timerange</button>
                    <br/>
                    Start: <input type="text" value= {startDisplay}></input> 
                    <br/>
                    End: <input type="text" value= {endDisplay}></input>
                    <br/> 
                    </DateTimeRangeContainer>
                </div>
            );
        }
}