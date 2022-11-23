import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import { create_user} from "../../../actions/users";
import {
 
  SkeletonText,
} from '@chakra-ui/react'
import { Form, Input, Button, Select, InputNumber } from "antd";
import { connect } from "react-redux";
import {
  Autocomplete,
  useJsApiLoader
} from '@react-google-maps/api'

const CreateUser = (props) => {
  const [value, setValue] = useState({formattedAddress:"",admin: true,saving: false,lat:"",lon:""});
  const [searchResult, setSearchResult] = useState("Result: none");
  const [form] = Form.useForm();
  const formattedAddress_var="";
  const { isLoaded } = useJsApiLoader({
    // googleMapsApiKey: 'AIzaSyDCUiR6W8hmQI3vEn_LkQebO2iIhKQJOfo',
    googleMapsApiKey: 'AIzaSyDFhHolRp7YU58k2pLeTHcEw2oLhpAT--w',
    libraries: ['places'],
  })
  function onLoad(autocomplete) {
    setSearchResult(autocomplete);
  }

  const onPlaceChanged=()=> {
    if (searchResult != null) {
      const place = searchResult.getPlace();
      const formattedAddress = place.formatted_address;
      setValue({
        lat:place.geometry.location.lat(),
        lon:place.geometry.location.lng(),
        formattedAddress:formattedAddress
      })
      
    } else {
      alert("Please enter text");
    }
  }
  const onFinish = (values) => {
    console.log(values,'values')
    values.groups = [values.groups]
    values.lat=value.lat
    values.lon=value.lon
    values.address=value.formattedAddress
    props.create_user(values);
    setValue({admin: null});
    form.resetFields();
    };
    const Isadmin = (name) => {
      if(name==1){
        setValue({
          admin: true,
          lat:value.lat,
          lon:value.lon,
          formattedAddress:value.formattedAddress 
        });
      }
      else{
        setValue({admin: false,
          lat:value.lat,
          lon:value.lon,
          formattedAddress:value.formattedAddress 
        });
      }
     
    };
  if (!isLoaded) {
    return <SkeletonText />
  }
  
  return (
    <div className="container-login100">
        <div style={{padding: '30px 55px',
                    background: '#fff',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    width: 'inherit'
                    // height: '500px'
                    }}>
          <span className="login100-form-title p-b-41">Food 4 All</span>
        <Form
          form={form}
          id="create-user-form"
          onFinish={onFinish}
          // labelAlign="left"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 12,
          }}
          layout="horizontal"
        >
          <Form.Item
            label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  // pattern:
                  //   "^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$",
                },
              ]}
            >
              <Input placeholder="Username"/>
            </Form.Item>
            <Form.Item
              label="Password"
              className="Inp"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                size="large"
                // prefix={<LockOutlined style={{ fontSize: 13 }} />}
                // type="password"
                placeholder="Password"
              />
              
            </Form.Item>
          
         <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input Store Name/Full Name!" }]}
              // style={{ display: "inline-block", width: "calc(50% - 8px)" }}
            >
              <Input placeholder="Store Name/Full Name" />
        </Form.Item>
        <Form.Item
             label="Phone"
              name="phone"
              rules={[{ required: true, message: "Please input Phone number!" }]}
            >
              <Input placeholder="Phone Number" />
            </Form.Item>
            <Form.Item
             label="Address"
              name="address"
              rules={[{ required: false, message: "Please input address!" }]}
            >
             <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
             <input
                required
                style={{width:'100%'}}
                type="text"
                placeholder="Address"
            
          />
              </Autocomplete>
              
            </Form.Item>
            <Form.Item
            label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input a valid email address!",
                  type: "email",
                },
              ]}
            >
              <Input placeholder="Email Adrress" />
            </Form.Item>
           <Form.Item
              name="groups"
              label="User Type"
              rules={[
                {
                  required: true,
                  message: "Please input user type!",
                },
              ]}
            >
              <Select
                  style={{ width: "100%" }}
                  placeholder="Please select User type"
                  onChange={Isadmin}
                >                  
                        <Select.Option value={1}>
                          Donor
                        </Select.Option>
                        <Select.Option value={2}>
                          Receiver
                        </Select.Option>
                 </Select> 
            </Form.Item>
           
      
          {value.admin==null? null:value.admin?
          // <p>Enter donar details</p> 
          <Form.Item
              name="type"
              label="Category"
              rules={[
                {
                  required: true,
                  message: "Please input Category!",
                },
              ]}
            >
              <Select
                  style={{ width: "100%" }}
                  placeholder="Please select Category"
                 >                  
                        <Select.Option value={'Restaurant'}>
                          Restaurant
                        </Select.Option>
                        <Select.Option value={'Voluntary_Donor'}>
                          Voluntary Donor
                        </Select.Option>
                        <Select.Option value={'Grocery'}>
                         Grocery 
                        </Select.Option>
                 </Select> 
            </Form.Item>
          : 
          // <p>Enter Receiver details</p>
      <div>
          <Form.Item
          label="Age"
          name="age"
          rules={[{ required: false, message: "Please input age!" }]}
          
        >
          <InputNumber placeholder="Age" />
        </Form.Item>
         <Form.Item
          label="Occupation"
          name="occupation"
          rules={[{ required: false, message: "Please input Occupation!" }]}
       
        >
          <Input placeholder="Occupation" />
        </Form.Item>
      </div>
        }
         
          <div style={{ textAlign: "center" }}>
            <Button
              type="primary"
              style={{background:'#ff7c18', borderColor:'white', marginTop:'10px',width: '200px'}}
              htmlType="submit"
              className="login-form-button"
              // loading={this.props.isSaving}
            >
              Register
            </Button>
            <br/>
            <br/>
            <Button
          type="primary"
          style={{borderColor:'white', marginTop:'10px',width: '200px'}}
          className="login-form-button"
        >
          <Link to={`/login`}>Login</Link>
          
        </Button>
          </div>
          
        </Form>
       
        </div>
      </div>
  );
};
function mapStateToProps(state) {
  return {
    msg: state.alerts.msg,
    isSuccess: state.users.isSuccess,
    isSaving: state.users.isSaving,
  };
} 

export default connect(mapStateToProps,{create_user})(CreateUser);
