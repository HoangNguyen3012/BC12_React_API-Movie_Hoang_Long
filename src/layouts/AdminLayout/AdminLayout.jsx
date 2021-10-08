import React, { useState } from 'react';
import withLayout from 'hocs/withLayout';
import { Layout, Menu, Row, Col, Button } from 'antd';
import {
    AppstoreOutlined,
    TeamOutlined,
    VideoCameraOutlined,
    UserOutlined,
    ProfileOutlined,
} from '@ant-design/icons';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './AdminLayout.scss';
import { actLogout } from 'containers/shared/Authentication/module/action';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminLayout(props) {
    const currentUser = useSelector(state => state.authReducer.currentUser);

    const [ state, setState ] = useState({
        dropdownMenu: false,
    });
    document.addEventListener('click', event => {
        const dropdownTrigger = event.target.matches("[data-dropdown-trigger]");
        if(!dropdownTrigger && event.target.closest("[data-dropdown]") != null) return;

        let dropdownMenu
        if (dropdownTrigger) {
            dropdownMenu = event.target.closest("[data-dropdown]");
            setState({...state, dropdownMenu: !state.dropdownMenu})
        }

        document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
            if(dropdown === dropdownMenu) return
            dropdown.classList.remove("active");
        })
    });

    const dispatch = useDispatch(); // mapDispatchToProps

    const handleLogout = currentUser => {
        dispatch(actLogout(currentUser))
        props.history?.push('/');
    };

    return currentUser.maLoaiNguoiDung === 'QuanTri' ? ( // let only QuanTri access
        <Layout>
            <Sider
                theme="dark"
                breakpoint="lg"
                collapsedWidth="0"
            // onBreakpoint={broken => {
            //   console.log(broken);
            // }}
            // onCollapse={(collapsed, type) => {
            //   console.log(collapsed, type);
            // }}
            >
                <div className="logo" style={{ width: "110px" }}>
                    <img src=".././logo_Horrizontal_Movie_Project.png" alt="Logo" width="100%" />
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<AppstoreOutlined />}>
                        <Link to="/admin">Dashboard</Link>
                    </Menu.Item>
                    <SubMenu key="subMovie" icon={<VideoCameraOutlined />} title="Movie">
                        <Menu.Item key="2" icon={<ProfileOutlined />}>
                            <Link to="/admin/movie">Movie List</Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<VideoCameraOutlined />}>
                            <Link to="/admin/addMovie">Add Movie</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="subUser" icon={<TeamOutlined />} title="User">
                        <Menu.Item key="4" icon={<ProfileOutlined />}>
                            <Link to="/admin/user">User List</Link>
                        </Menu.Item>
                        <Menu.Item key="5" icon={<UserOutlined />}>
                            <Link to="/admin/addUser">Add User</Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-sub-header-background">
                    <Row>
                        <Col flex="auto"></Col>
                        <Col flex="250px">
                            <div className={`dropdown ${state.dropdownMenu ? "active" : ""}`} data-dropdown>
                                <Button type="link" className="trigger__dropdown" data-dropdown-trigger>
                                    <img src=".././default_user_icon.png" alt="user icon" height="50px" data-dropdown-trigger/>
                                    <span data-dropdown-trigger>Hello {currentUser.hoTen}</span>
                                </Button>
                                <div className="dropdown__menu">
                                    <div className="dropdown__item">
                                        <Link to="/">To Client Page</Link>
                                    </div>
                                    <div className="dropdown__item">
                                        <Button className="" type="link" onClick={handleLogout}>Logout</Button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col span={1}></Col>
                    </Row>
                </Header>
                <Content style={{ margin: '24px 16px', minHeight: '600px' }}>
                    <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
                        {props.children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    ) : (
        <Redirect to='/' />
    );
};


export default withLayout(AdminLayout);