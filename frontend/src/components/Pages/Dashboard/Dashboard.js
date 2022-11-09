import React, { Component, Fragment } from "react";
import MainLayout from "../../Layout/MainLayout";
import { Link } from "react-router-dom";
import { get_posted_food,edit_food, delete_food } from "../../../actions/food";
import { Row, Col, Select, Button, Transfer } from "antd";
import { connect } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import UpdateModal from "./UpdateModal";
import DeleteModal from "../../Common/DeleteModal/DeleteModal";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      row_id: null
    }
  }
  componentDidMount() { 
    this.props.get_posted_food()
  }
  showUpdatetable(record) {
    this.setState({
        row_id: record.id,
    });
    this.refs.childupdate.showModal(record);
  }
  showDeletedata(record) {
      this.setState({
          row_id: record.id,
      });
      this.refs.childdelete.showModal(record);
  }
  accept_food=(itm)=>{
    let body={
      "status":"accepted"
    }
    this.props.edit_food(
        body,
        itm.id,
    );
  }
  request_food=(itm)=>{
    let body={
      "status":"requested",
      "requested_by": this.props.user.id
    }
    this.props.edit_food(
        body,
        itm.id,
    );
  }
  updateValues = (values) => {
    this.props.edit_food(
        values,
        this.state.row_id,
    );
    this.refs.childupdate.onCancel();
  };
  deleteValues = () => {
      this.props.delete_food(
          this.state.row_id
      );
      this.refs.childdelete.onCancel();
  };
  render() {
    let user;
    if (this.props.user.groups[0]==1){
      user="donor"
    }else{
      user="receiver"
    }
    return (
      <MainLayout>
        <Fragment>
          {user=="donor"?
          <Fragment>
          <Button
              type="primary"
              style={{borderColor:'white', marginTop:'10px',width: '200px'}}
              className="login-form-button"
            >
              <Link to={`/app/food-post`}>Post Food</Link>
            </Button>
            <br />
            <br />
            </Fragment>
            :null}
           
          <h1>List of Posted Food</h1>
          {/* <LoadScript
        googleMapsApiKey="AIzaSyAOk7NT2sEQoJAGGWIobaoJM1kmnE4zgho"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
        </GoogleMap>
      </LoadScript> */}
          {/* <input type="text" placeholder="*Begin typing address" id="id-google-address" name="google_address"/> */}
          <br />
          {this.props.all_posted_food?
          this.props.all_posted_food.map((itm, i)=>(
            // <Link key={i} to={`/app/food-details/${itm.id}`}>
              <div key={i} style={{   background: '#615c5f29',
                              padding: '20px',
                              borderRadius: '20px',
                              marginBottom: '20px'}}>
                <p>Food: {itm.food_name}</p>
                <p>Description: {itm.description}</p>
                {itm.quantity?<p>Food Quantity: {itm.quantity}</p>:null}
                {user=="donor"? 
                  <p>Status: {itm.status} 
                  {itm.status != "available" ?
                  <div>
                    <p>Requested By: {itm.requested_by_obj.name}<br/>
                    Phone: {itm.requested_by_obj.phone}
                    </p>
                    {/* <Button
                          onClick={() => {
                              this.accept_food(itm);
                          }}
                      >
                        Accept
                    </Button> */}
                  </div>
                  
                  : null
                }</p>:
                  <p>Status: {itm.status==null?"Available":itm.status}</p>}
                {user=="receiver"? 
                <div>
                  <p><b>Donor Details :</b></p>
                  <p>Donor : {itm.posted_by_obj.name}</p>
                  <p>Phone : {itm.posted_by_obj.phone}</p>
                  <p>Address : {itm.posted_by_obj.address}</p>
                </div>:
                null
                }
              {user=="donor"? 
              <Fragment>
                <Button
                      onClick={() => {
                          this.showUpdatetable(itm);
                      }}
                  >
                    Update
                </Button>
                <Button
                    style={{ color: "red" }}
                    onClick={() => {
                        this.showDeletedata(itm);
                    }}
                >
                    <DeleteOutlined style={{ color: "red" }} />
                </Button>  
              </Fragment>:
              <Button
                    onClick={() => {
                        this.request_food(itm);
                    }}
                >
                  Request Food
              </Button>
              }
                
              </div>
            // </Link> 

          )):null}
         <UpdateModal
                    ref={"childupdate"}
                    // searchData={this.searchData}
                    updateValues={this.updateValues}
                />

                <DeleteModal ref={"childdelete"} deleteValues={this.deleteValues} />

          {/* <p style={{textAlign:"center",fontSize:'66px'}}>WELCOME...</p> */}
        </Fragment>
        
        
      </MainLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  all_posted_food: state.food.all_posted_food
});

export default connect(mapStateToProps, {
  get_posted_food,edit_food, delete_food
})(Dashboard);
