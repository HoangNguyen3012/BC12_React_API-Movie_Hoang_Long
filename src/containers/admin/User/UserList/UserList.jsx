import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actFetchAllUser } from '../module/action';
import { Table, Button, Modal, Form, Input, Row, Col } from 'antd';
import { EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import Loader from 'components/Loader/Loader';
import userApi from 'apis/userApi';

export default function UserList() {
    //////// Call API ////////
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actFetchAllUser())
    }, []); // componentDidMount
    const { listUser, loading } = useSelector(state => state.userReducer);
    const currentUser = useSelector(state => state.authReducer.currentUser);
    const { maNhom, accessToken } = currentUser;
    //////// Call API ends ////////
    // Edit and Delete user buttons
    const deleteUser = user => {
        userApi.deleteUserApi(user.taiKhoan, accessToken)
            .then(response => {
                console.log(response.data);
                Modal.success({
                    title: 'Deleted successfully!',
                    content: (
                        <div>
                            <p>User {user.taiKhoan} has been removed</p>
                            <p>Refresh to take effect</p>
                        </div>
                    ),
                });
            }).catch(error => {
                console.log(error);
            })
    }

    const editUser = (rowKey) => {
        form.setFieldsValue({
            taiKhoan: rowKey.taiKhoan,
            maLoaiNguoiDung: rowKey.maLoaiNguoiDung,
            hoTen: rowKey.hoTen,
            email: rowKey.email,
            soDt: rowKey.soDt,
            matKhau: rowKey.matKhau,
            ...rowKey,
        });
        setActionState({
            ...actionState,
            editingKey: rowKey.taiKhoan,
        });

    };
    const cancelEdit = () => {
        setActionState({
            ...actionState,
            editingKey: false,
        });
    };
    const confirmEdit = () => {
        let editedUser = {
            maNhom: maNhom,
            ...form.getFieldsValue(),
        };
        userApi.editUserApi(editedUser, accessToken)
            .then(response => {
                console.log(response.data);
                Modal.success({
                    title: 'Edited successfully!',
                    content: 'Refresh to take effect',
                });
            })
            .catch(error => {
                console.log(error);
            });
        setActionState({
            ...actionState,
            editingKey: false,
        });
    }
    // Edit and Delete user buttons end
    
    //////// Antd table variables ////////

    // Set up table data
    const columns = [
        {
            title: 'Account',
            width: 100,
            dataIndex: 'taiKhoan',
            key: 'taiKhoan',
            fixed: 'left',
            editable: true,
        },
        {
            title: 'User Type',
            width: 70,
            dataIndex: 'maLoaiNguoiDung',
            key: 'maLoaiNguoiDung',
            editable: true,
        },
        {
            title: 'Name',
            dataIndex: 'hoTen',
            key: 'hoTen',
            width: 100,
            editable: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 100,
            editable: true,
        },
        {
            title: 'Phone Number',
            dataIndex: 'soDt',
            key: 'soDt',
            width: 80,
            editable: true,
        },
        {
            title: 'Password',
            dataIndex: 'matKhau',
            key: 'matKhau',
            width: 80,
            editable: true,
        },
        {
            title: 'Action',
            key: 'Action',
            fixed: 'right',
            width: 80,
            render: (rowKey) => {
                return (actionState.editingKey !== rowKey.taiKhoan) ? (
                    <div>
                        <Button icon={<EditOutlined />} onClick={() => editUser(rowKey)}></Button>
                        {' '}
                        <Button icon={<DeleteOutlined />} onClick={() => deleteUser(rowKey)}></Button>
                    </div>
                ) : (
                    <div>
                        <Button icon={<CheckOutlined />} htmlType="submit" onClick={confirmEdit}></Button>
                        {' '}
                        <Button icon={<CloseOutlined />} onClick={cancelEdit}></Button>
                    </div>
                )
            },
        },
    ];

    // Making editable cells
    const isEditing = (rowKey) => rowKey.taiKhoan === actionState.editingKey;
    const [form] = Form.useForm();

    const EditableCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        rowKey,
        index,
        children,
        ...restProps
    }) => {
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{
                            margin: 0,
                        }}
                        rules={[
                            {
                                required: true,
                                message: `Please Input ${title}!`,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (rowKey) => ({
                rowKey,
                inputType: 'string',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(rowKey),
            }),
        };
    });

    //////// Antd table variables end ////////

    //////// Antd search bar variables ////////
    const { Search } = Input;
    const [ actionState, setActionState ] = useState({
        editingKey: false,
        searching: false,
        searchUser: [],
    })
    const onSearch = keyword => {
        if(!keyword) {
            setActionState({
                ...actionState,
                searching: false,
            })
            return
        };
        userApi.findUserApi(maNhom, keyword)
        .then(response => {
            setActionState({
                ...actionState,
                searching: true,
                searchUser: [...response.data],
            })
        })
        .catch(error => {
            console.log(error);
        })
    }
    //////// Antd search bar variables end ////////

    return !loading ? (
        <div>
            <Row>
                <Col span={4}></Col>
                <Col span={14}>
                    <h3>User List</h3>
                </Col>
                <Col span={6}>
                    <Search
                        placeholder="search user"
                        allowClear
                        onSearch={onSearch}
                        style={{ width: "100%" }} />
                </Col>
            </Row>

            <Form form={form} component={false}>
                <Table
                    dataSource={actionState.searching ? actionState.searchUser : listUser}
                    rowKey="taiKhoan"
                    scroll={{ x: 1200, y: 500 }}
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    columns={mergedColumns} />
            </Form>
        </div>
    ) : (
        <Loader />
    )
}
