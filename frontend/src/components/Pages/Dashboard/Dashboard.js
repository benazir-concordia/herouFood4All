import React, { Component, Fragment } from "react";
import MainLayout from "../../Layout/MainLayout";
import { Link } from "react-router-dom";
import { get_posted_food,edit_food, delete_food } from "../../../actions/food";
import {Button, Avatar,Spin  } from "antd";
import { connect } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import UpdateModal from "./UpdateModal";
import DeleteModal from "../../Common/DeleteModal/DeleteModal";
import moment from "moment-timezone";
import './dashboard.css'
import DefFoodPic from "./food.png";
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
  // accept_food=(itm)=>{
  //   let body={
  //     "status":"accepted"
  //   }
  //   this.props.edit_food(
  //       body,
  //       itm.id,
  //   );
  // }
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
    let body={
      "food_name":values.food_name,
      "description":values.description,
      "quantity":values.quantity,
      "posted_date":moment(values.posted_date).format("YYYY-MM-DD"),
      "status":values.status,
    }
    
    this.props.edit_food(
        body,
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
          <br />
          
          {this.props.all_posted_food?
          this.props.all_posted_food.map((itm, i)=>(            
              <div key={i} 
              className="containeri"
                              >
              <div style={{textAlign:'center',height: 149}}>
                <Avatar  style={{width: '68%',
                    height: '100%',
                    lineHeight: 500,
                    fontSize: 18}} shape="square" src={DefFoodPic} />
              </div>
              <div className="content-box">
                <h4 className="name" style={{color:"white"}}>{itm.food_name}</h4>
                <p>Description: {itm.description}</p>
                {itm.quantity?<p>Food Quantity: {itm.quantity}</p>:null}
                {user=="donor"? 
                  <p >Status:{itm.status} 
                  {itm.status != "available" ?
                  <div style={{background: "forestgreen",
                    padding: "0px 10px"}}>
                    <p>Requested By: {itm.requested_by_obj.name}<br/>
                    Phone: {itm.requested_by_obj.phone}
                    </p>
                  </div>
                  
                  : null
                }</p>:
                  <p >Status: {itm.status==null?"Available":itm.status}</p>}
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
              <div>                
                <Button
                shape="round"
                      onClick={() => {
                          this.showUpdatetable(itm);
                      }}
                  >
                    Update
                </Button>
                <Button
                shape="round"
                    style={{ color: "red", marginLeft:20 }}
                    onClick={() => {
                        this.showDeletedata(itm);
                    }}
                >
                  Delete
                    <DeleteOutlined style={{ color: "red" }} />
                </Button>  
              </div>:
              <div>
              <Button
              shape="round"
                    onClick={() => {
                        this.request_food(itm);
                    }}
                >
                  Request Food
              </Button>
              <Link style={{paddingLeft: '16px',
    fontWeight: 'bold'}} to={`/app/map/${itm.posted_by_obj.lat}/${itm.posted_by_obj.lon}`}>
                  check map
              </Link>
              </div>
              
              }
              </div>
              </div>
          )): <Spin />}
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
