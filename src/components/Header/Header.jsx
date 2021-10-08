import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { actLogout } from 'containers/shared/Authentication/module/action';
import './Header.scss';

function Header(props) {
    const { currentUser } = useSelector(state => state.authReducer); // mapStatetoProps get user login info

    const dispatch = useDispatch(); // mapDispatchToProps

    const handleLogout = currentUser => {
        dispatch(actLogout(currentUser))
        props.history.push('/');
    };


    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-light">
                <Link className="navbar-brand" to="/">
                    <img src="../../../logo_Horrizontal_Movie_Project.png" alt="Logo" width="100px" />
                </Link>
                <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/theater">Theater</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/review">Review</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        {currentUser ? (
                            <li className="nav-item dropdown">
                                <a href="/" className="nav-link dropdown-toggle text-truncate" data-toggle="dropdown" role="button">{currentUser.taiKhoan}</a>
                                <div className="dropdown-menu dropdown-menu-sm-right text-center">
                                    <Link className="dropdown-item" to="/client">Client Info</Link>
                                    {currentUser.maLoaiNguoiDung === 'QuanTri' ? <Link className="dropdown-item" to="/admin">To Admin Page</Link> : null}
                                    <a className="dropdown-item" href="/" onClick={handleLogout}
                                    >Logout</a>
                                </div>

                            </li>
                        ) : (
                            <li className="nav-item" style={{minWidth: 80}}>
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        </div>
    )
}


export default withRouter(Header);