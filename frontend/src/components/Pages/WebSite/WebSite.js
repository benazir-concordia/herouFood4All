import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import { Avatar, Button } from "antd";
import { connect } from "react-redux";
import SitePic from "./cost-of-waste-in-canada.png";
class WebSite extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  

  render() {
   
    return (
      <Fragment>
        <div style={{padding: '30px 55px',
                    background: '#fff',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    width: 'inherit'
                    // height: '500px'
                    }}>
        <div style={{    textAlign: 'center'}}>
        <Avatar size={500} style={{    width: '53%',
                    height: '100%',
                    lineHeight: 500,
                    fontSize: 18}} shape="square" src={SitePic} />
        </div>
        <div>
            <h1>API Links to retrive exposed data</h1>
            <p>API Link for all currently requested foods: <Button type="link" onClick={()=>window.location.assign('https://food4allappflix.herokuapp.com/api/food/all_currently_requested_food')}>food4allappflix.herokuapp.com/api/food/all_currently_requested_food</Button></p>
            <p>API Link for all currently available foods: <Button type="link" onClick={()=>window.location.assign('https://food4allappflix.herokuapp.com/api/food/all_currently_available_food')}>food4allappflix.herokuapp.com/api/food/all_currently_available_food</Button></p>
            <p>API Link for all expired/wasted foods: <Button type="link" onClick={()=>window.location.assign('https://food4allappflix.herokuapp.com/api/food/all_expired_food')}>food4allappflix.herokuapp.com/api/food/all_expired_food</Button></p>
            <p>API Link to get the details of all registered donors: <Button type="link" onClick={()=>window.location.assign('https://food4allappflix.herokuapp.com/api/food/all_listed_donors')}>food4allappflix.herokuapp.com/api/food/all_listed_donors</Button></p>
        </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, {})(WebSite);
