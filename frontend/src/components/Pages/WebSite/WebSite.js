import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import { Avatar } from "antd";
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
            <p>API Link for all currently requested foods: <Link to="api/food/all_currently_requested_food">food4allappflix.herokuapp.com/api/food/all_currently_requested_food</Link></p>
            <p>API Link for all currently available foods: <Link to="api/food/all_currently_available_food">food4allappflix.herokuapp.com/api/food/all_currently_available_food</Link></p>
            <p>API Link for all expired/wasted foods: <Link to="api/food/all_expired_food">food4allappflix.herokuapp.com/api/food/all_expired_food</Link></p>
        </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, {})(WebSite);