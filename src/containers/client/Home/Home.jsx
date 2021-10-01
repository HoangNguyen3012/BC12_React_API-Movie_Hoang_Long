import React, { Component } from 'react';
// import { Link } from 'react-router-dom'
import Banner from './Banner/Banner';
import Filter from './Filter/Filter';

export default class Home extends Component {
    render() {
        return (
            <div style={{ backgroundColor: '' }}>
                <div className="container">
                    <Banner />
                    <Filter />
                </div>
            </div>

        )
    }
}
