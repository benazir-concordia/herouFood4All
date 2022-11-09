import React, { Component, Fragment } from "react";
import MainLayout from "../../Layout/MainLayout";
import { Link } from "react-router-dom";
import { get_posted_food,edit_food, delete_food } from "../../../actions/food";
import { Row, Col, Select, Button, Transfer } from "antd";
import { connect } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
// import UpdateModal from "./UpdateModal";
import DeleteModal from "../../Common/DeleteModal/DeleteModal";

class RequestedFood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      row_id: null
    }
  }
  componentDidMount() { 
    this.props.get_posted_food("requested_food")
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
          <br />
          {this.props.all_posted_food?
          this.props.all_posted_food.map((itm, i)=>(
            // <Link key={i} to={`/app/food-details/${itm.id}`}>
              <div style={{   background: '#615c5f29',
                              padding: '20px',
                              borderRadius: '20px',
                              marginBottom: '20px'}}>
                <p>Food: {itm.food_name}</p>
                <p>Description: {itm.description}</p>
                <p>Status: {itm.status}</p>
                {user=="receiver"? 
                <div>
                  <p><b>Donor Details :</b></p>
                  <p>Donor : {itm.posted_by_obj.name}</p>
                  <p>Phone : {itm.posted_by_obj.phone}</p>
                  <p>Address : {itm.posted_by_obj.address}</p>
                </div>:
                null
                }
              
                
              </div>
            // </Link> 

          )):null}
         {/* <UpdateModal
                    ref={"childupdate"}
                    // searchData={this.searchData}
                    updateValues={this.updateValues}
                />

                <DeleteModal ref={"childdelete"} deleteValues={this.deleteValues} /> */}

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
})(RequestedFood);
