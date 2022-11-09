import React, { Component } from "react";
import MainLayout from "../../Layout/MainLayout";
import "antd/dist/antd.css";
import { add_food } from "../../../actions/food";
import { Form, Input, Button, InputNumber,Select,DatePicker,Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import moment from "moment-timezone";

class FoodDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            componentSize: "default",
            product_name:null
        };
    }
    formRef = React.createRef();
   
      normFile = (e) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
      };
    onFinish = (values) => {
        let validate = true
        let form_data = new FormData();
        if (values.image) {
            values.image.map((anObjectMapped, index) => {
                form_data.append("photo", anObjectMapped.originFileObj);
                if(anObjectMapped.type!='image/png'){
                    validate = false 
                }
            })
          }
          form_data.append("food_name", values.food_name);
          form_data.append("description", values.description);
          form_data.append("type", values.type);
          form_data.append("quantity", values.quantity);
          form_data.append("posted_date", moment(values.posted_date).format("YYYY-MM-DD"));
          form_data.append("posted_by", this.props.user.id);
          

          if (validate==true){
            this.props.add_food(form_data); 
            this.formRef.current.resetFields();
        }
        
        
    };
    render() {
        return (
            <MainLayout>
                <h1>Post Food Details</h1>
                <br />
                <Form
                    ref={this.formRef}
                    id="create-group-form"
                    onFinish={this.onFinish}
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 12,
                    }}
                    layout="horizontal"
                >
                    <Form.Item
                        label="Food Name"
                        name="food_name"
                        rules={[{ required: true, message: "Please input Food name!" }]}
                    >
                        <Input placeholder="Food Name" />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: false, message: "Please input Description!" }]}
                    >
                        <Input placeholder="Description" />
                    </Form.Item>
                    
                    <Form.Item
                        label="Quantity"
                        name="quantity"
                        
                        rules={[{ required: false, message: "Please input quantity!" }]}
                    >
                        <Input style={{ width: "100%" }} placeholder="Food Quantity" />
                    </Form.Item>
                    
                     <Form.Item
                        label="Food Category"
                        name="type"
                        rules={[{ required: true, message: "Please input food category!" }]}
                    >
                     <Select
                            placeholder={"Select Food Category"}
                           >      
                           <Select.Option value="Vegetarian ">
                                    Vegetarian 
                            </Select.Option>  
                            <Select.Option value="Vegan">
                                    Vegan
                            </Select.Option>    
                            <Select.Option value="Halal">
                                    Halal
                            </Select.Option>  
                            <Select.Option value="Allergy-friendly">
                                    Allergy-friendly
                            </Select.Option>                    
                        </Select>
                    </Form.Item>   
              <Form.Item
                    name="photo"
                    label="Upload Image"
                    valuePropName="fileList"
                    getValueFromEvent={this.normFile}
                    extra=""
                >
            <Upload
            //   onChange={this.ChangePicture}
              beforeUpload={() => false}
              name="pic"
            
              listType="picture"
            >
              <Button>
                <UploadOutlined /> Click to upload (png only)
              </Button>
            </Upload>
          </Form.Item>
                    <div style={{ textAlign: "center" }}>
                        {" "}
                        <Button type="primary" htmlType="submit">
                            Post Food
                        </Button>
                    </div>
                </Form>
            </MainLayout>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, {
    add_food
})(FoodDetails);
