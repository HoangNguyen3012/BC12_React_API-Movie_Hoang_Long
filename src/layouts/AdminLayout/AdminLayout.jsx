import React from 'react';
import withLayout from 'hocs/withLayout';
import { Layout, Menu } from 'antd';
import {
    AppstoreOutlined,
    TeamOutlined,
    VideoCameraOutlined,
    UserOutlined,
    ProfileOutlined,
} from '@ant-design/icons';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './AdminLayout.scss';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminLayout(props) {
    const currentUser = useSelector(state => state.authReducer.currentUser);

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
                        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                            <Link to="/admin/movie">Movie List</Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<UserOutlined />}>
                            <Link to="/admin/addUser">Add User</Link>
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
                <Header className="site-layout-sub-header-background" style={{ padding: 0,  }} >
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