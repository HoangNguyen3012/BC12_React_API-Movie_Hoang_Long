import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const withLayout = (WrappedComponent) => {
    return ({ component: Component, isPrivate, ...rest }) => {
        const currentUser = useSelector(state => state.authReducer.currentUser)
        const content = (
            <Route
            {...rest}
            render={(routeProps) => (
                <WrappedComponent>
                    <Component {...routeProps} />
                </WrappedComponent>
            )} />
        )
        if(isPrivate){
            if(currentUser) {
                return content;
            }
            alert('Please Login')
            return <Redirect to="/" />;
        }
        return content;
    }
};

export default withLayout;