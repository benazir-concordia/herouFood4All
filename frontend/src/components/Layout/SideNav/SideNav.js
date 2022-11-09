import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  TeamOutlined,
  UserOutlined,
  MacCommandOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Avatar } from "antd";
import "./SideNav.css";
import profileDefault from "./default.png";

const { Sider } = Layout;

class SideNav extends Component {
  state = {
    collapsed: false,
    collapsedWidth: 80,
    selectedKey: true,
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };


  render() {
    return (
      <Fragment>
        <div
          className={
            this.state.collapsedWidth === 80
              ? this.state.collapsed
                ? "small"
                : "big"
              : null
          }
        />
        <Sider
          collapsible
          breakpoint="xs"
          collapsedWidth={this.state.collapsedWidth}
          onBreakpoint={(broken) => {
            if (broken) {
              this.setState({
                collapsedWidth: 0,
              });
            } else {
              this.setState({
                collapsedWidth: 80,
              });
            }
          }}
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          style={{
            zIndex: 4,
            position: "fixed",
            height: "100%",
          }}
          width={210}
          className={"sidescroll"}
        >
          <div className="ant-pro-sider-logo" id="sidenavpic">
           <br/>
           <p style={{color:"white", fontWeight:"bold",fontSize:"20px"}}>Food 4 All</p>
           
          </div>
          <div id="sidescrollbar" style={{ overflow: "hidden auto" }}>
            <Menu
              theme="dark"
              selectedKeys={[window.location.pathname]}
              mode="inline"
            >
              <Menu.Item key="/" icon={<UserOutlined />}>
                <Link to={`/`}>Dashboard</Link>
              </Menu.Item>
              {this.props.user.groups[0]==2?
              <Menu.Item key="/app/requested_food" icon={<UserOutlined />}>
                <Link to={`/app/requested_food`}>Requested Food</Link>
              </Menu.Item>:null}

            </Menu>
          </div>
        </Sider>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps, null)(SideNav);
