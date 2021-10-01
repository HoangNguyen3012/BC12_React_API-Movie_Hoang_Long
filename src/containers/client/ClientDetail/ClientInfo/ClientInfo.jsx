import React, { useState } from 'react';
import { groupID } from 'components/Forms/formVariables';
import userApi from 'apis/userApi';

export default function ClientInfo(props) {
    const getEle = id => document.getElementById(id);
    const { userDetail: userDetailInit, currentUser } = props; // Received info from parent

    const { maLoaiNguoiDung, accessToken } = currentUser;
    const [ state, setState ] = useState({
        userDetail: {...userDetailInit, maLoaiNguoiDung},
        editing: false,
    });

    const confirmEdit = () => {
        // callAPI
        userApi.editUserApi(state.userDetail, accessToken)
            .then(response => {
                console.log(response);
                alert('Edit successful');
            })
            .catch(error => {
                console.log(error);
            });
        setState({...state, editing: false});
    }

    return (
        <div>
            <form onReset={() => setState({...state, editing: false})}>
                <div className="custom-control custom-switch mb-md-4">
                    <input type="checkbox" className="custom-control-input" id="switchEditing" onChange={() => setState({...state, editing: !state.editing})} checked={state.editing} disabled={state.editing}/>
                    <label className="custom-control-label" htmlFor="switchEditing" style={{fontSize: "1rem"}}>Edit your info by toggling this switch</label>
                </div>
                <fieldset className="row mx-1" disabled={!state.editing}>
                    <div className="col-md-6 mx-md-0 mx-1">
                        <div className="form-group row">
                            <label className="col-lg-3 text-lg-left col-form-label" htmlFor="disabledAccount">Account</label>
                            <input className="col-lg-8 form-control" type="text" id="disabledAccount" defaultValue={userDetailInit.taiKhoan} onChange={() => setState({...state, userDetail: {...state.userDetail, taiKhoan: getEle('disabledAccount').value}})}/>
                        </div>
                        <div className="form-group row">
                            <label className="col-lg-3 text-lg-left col-form-label" htmlFor="disabledName">Name</label>
                            <input className="col-lg-8 form-control" type="text" id="disabledName" defaultValue={userDetailInit.hoTen} onChange={() => setState({...state, userDetail: {...state.userDetail, hoTen: getEle('disabledName').value}})}/>
                        </div>
                        <div className="form-group row">
                            <label className="col-lg-3 text-lg-left col-form-label" htmlFor="disabledPassword">Password</label>
                            <input className="col-lg-8 form-control" type="text" id="disabledPassword" defaultValue={userDetailInit.matKhau} onChange={() => setState({...state, userDetail: {...state.userDetail, matKhau: getEle('disabledPassword').value}})}/>
                        </div>
                    </div>
                    <div className="col-md-6 mx-md-0">
                        <div className="form-group row">
                            <label className="col-lg-3 text-lg-left col-form-label" htmlFor="disabledEmail">Email</label>
                            <input className="col-lg-8 form-control" type="email" id="disabledEmail" defaultValue={userDetailInit.email} onChange={() => setState({...state, userDetail: {...state.userDetail, email: getEle('disabledEmail').value}})}/>
                        </div>
                        <div className="form-group row">
                            <label className="col-lg-3 text-lg-left col-form-label" htmlFor="disabledPhone">Phone No.</label>
                            <input className="col-lg-8 form-control" type="number" id="disabledPhone" defaultValue={userDetailInit.soDT} onChange={() => setState({...state, userDetail: {...state.userDetail, soDT: getEle('disabledPhone').value}})}/>
                        </div>
                        <div className="form-group row">
                            <label className="col-lg-3 text-lg-left col-form-label" htmlFor="disabledGroup">Group ID</label>
                            <select className="col-lg-8 form-control w-100" id="disabledGroup" defaultValue={userDetailInit.maNhom} onChange={() => setState({...state, userDetail: {...state.userDetail, maNhom: getEle('disabledGroup').value}})}>
                                {groupID.map(id => <option key={id} value={id}>{id}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="col-12 mt-md-2">
                    <button type="button" className="btn btn-success" style={{width: 82}} onClick={confirmEdit}>Confirm</button>
                    {' '}
                    <button type="reset" className="btn btn-danger" style={{width: 82}} >Cancel</button>
                </div>
                </fieldset>
            </form>

        </div>
    )
}
