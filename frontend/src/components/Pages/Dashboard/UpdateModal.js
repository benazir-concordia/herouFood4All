import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Modal, Form, Input, InputNumber, Select, Spin } from "antd";


class UpdateModal extends Component {
  updateFormRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      modalvisible: false,
      row_id: null,
      serial: null,
      record: null,
    };
  }

  showModal(record) {
    this.setState({
      modalvisible: true,
      serial: record.serial,
      record,
      componentSize: "default",
      setComponentSize: "default",
    });
  }
  onCancel() {
    this.setState({
      modalvisible: false,
    });
  }

  onSubmit = (values) => {
    this.props.updateValues(values);
  };

  render() {
    if (!this.state.record) {
      return null;
    }
    return (
      <Modal
        destroyOnClose={true}
        title={`Update Food Details`}
        visible={this.state.modalvisible}
        onCancel={() => this.onCancel()}
        width={700}
        style={{ top: 20 }}
        okText="Update"
        maskClosable={false}
        // closable={!this.props.saving}
        // cancelButtonProps={{
        //   disabled: this.props.saving,
        // }}
        okButtonProps={{
          form: "updateform",
          key: "submit",
          htmlType: "submit",
        }}
      >
        <Spin spinning={false}>
          <Form
            // preserve={false}
            ref={this.updateFormRef}
            id="updateform"
            onFinish={this.onSubmit}
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            labelAlign="left"
            layout="horizontal"
            size={this.state.componentSize}
            initialValues={{
              food_name: this.state.record.food_name,
              description: this.state.record.description,
              quantity: this.state.record.quantity,
              status: this.state.record.status,
            }}
          >
            <Form.Item
              label="Food Name"
              name="food_name"
              rules={[{ required: true, message: "Please input food name!" }]}
            >
              <Input placeholder="Food Name" />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: false, message: "Please input description!" }]}
            >
              <Input placeholder="Description" />
            </Form.Item>
            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[{ required: true, message: "Please input quantity!" }]}
            >
              <Input placeholder="Quantity" />
            </Form.Item>
            <Form.Item
              name="status"
              label="Status"
              rules={[
                {
                  required: true,
                  message: "Please input status!",
                },
              ]}
            >
              <Select
                  style={{ width: "100%" }}
                  placeholder="Please select status"
                  
                >                  
                        <Select.Option value={"available"}>
                          Available
                        </Select.Option>
                        {/* <Select.Option value={"requested"}>
                          Requested
                        </Select.Option>
                        <Select.Option value={"accepted"}>
                          Accepted
                        </Select.Option> */}
                 </Select> 
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, null, null, {
  forwardRef: true,
})(UpdateModal);
