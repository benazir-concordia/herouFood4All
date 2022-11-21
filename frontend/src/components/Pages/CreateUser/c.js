import React from "react";
import ReactDOM from "react-dom";

import Map from "./Map";
import "./styles.css";

//import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ClearIcon from "@material-ui/icons/Clear";
import TextField from "@material-ui/core/TextField";

const API_KEY = "AIzaSyBRs7NRGpboLvwqN9zqFZiuhCXqe9URYBQ";

/*const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));*/

const useStyles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
});

const center = {
  lat: 38.9065495,
  lng: -77.0518192
};

//const classes = useStyles();
//className={classes.heading}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paths: [
        { lat: 38.97330905858943, lng: -77.10469090410157 },
        { lat: 38.9209748864926, lng: -76.9083102888672 },
        { lat: 38.82689001319151, lng: -76.92204319902345 },
        { lat: 38.82261046915962, lng: -77.0181735701172 },
        { lat: 38.90174038629909, lng: -77.14314305253907 }
      ]
    };
  }

  render() {
    const { paths } = this.state;

    return (
      <div className="App2">
        <Map
          apiKey={API_KEY}
          center={center}
          paths={paths}
          point={paths => this.setState({ paths })}
        />
        {paths.map((pos, key) => {
          return (
            <ExpansionPanel key={key}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <ClearIcon
                  style={{ color: "#dc004e" }}
                  onClick={() => {
                    paths.splice(key, 1);
                    console.log(paths);
                    this.setState({ paths: paths });
                  }}
                />
                <Typography>Point #{key}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <TextField
                  fullWidth
                  key={"lat" + key}
                  label="Latitude"
                  type="text"
                  value={pos.lat}
                  disabled={true}
                />
                <TextField
                  fullWidth
                  key={"lng" + key}
                  label="Longitude"
                  type="text"
                  value={pos.lng}
                  disabled={true}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          );
        })}
      </div>
    );
  }
}

//export default withStyles(useStyles)(App);
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
