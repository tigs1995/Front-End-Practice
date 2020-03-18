import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import "../../CSS/Accordian.css";

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);



export default function CustomizedExpansionPanels(props) {


  const [expanded, setExpanded] = React.useState('panel1');
  let { lat, long, radius, beforeTime, afterTime } = props;

  

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  


  return (
    <div id="accordian">
      <ExpansionPanel square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Change Search</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            <form onSubmit={props.handleSearchChange}>
            Latitude: <input type="text" placeholder={"Current: " + lat} onChange={({target}) => {props.newSearchLatitude(target.value)}}></input><br />
            Longitude: <input type="text"  placeholder={"Current: " + long} onChange={({target}) => {props.newSearchLongitude(target.value)}}></input><br />
            Radius: <input type="text"  placeholder={"Current: " + radius} onChange={({target}) => {props.newSearchRadius(target.value)}}></input><br />
            <button type="submit">Search</button>
            </form>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <ExpansionPanelSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Filter</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography><div>
            <form>
              <input type="checkbox" name="vehicle" value="true" defaultChecked="true" onChange={({target}) => {props.onFinanceChange(target.checked)}}></input>
              <label for="vehicle1">Vehicle</label><br />
              <input type="checkbox" name="finance" value="true" defaultChecked="true" onChange={({target}) => {props.onFinanceChange(target.checked)}}></input>
              <label for="vehicle2">Finance</label><br />
              <input type="checkbox" name="calls" value="true" defaultChecked="true" onChange={({target}) => {props.onCallsChange(target.checked)}}></input>
              <label for="vehicle3">Calls</label><br />
    
            </form>
          </div>


          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <ExpansionPanelSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Key</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography style={{display:"flex", width: "30%"}}>
            <p style={{padding: "10px",margin:"5px", backgroundColor:"rgba(225, 0, 0, 0.5)", transform: "translate(-70%, -10px)"}}>Vehicle </p>
            <p style={{padding: "10px",margin:"5px",backgroundColor:"rgba(255,165,0, 0.5)", transform: "translate(-70%, -10px)"}}>Finance </p>
            <p style={{padding: "10px",margin:"5px",backgroundColor:"rgba(0, 0, 225, 0.5)", transform: "translate(calc(-70% - 20px), -10px)"}}>Calls </p>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}