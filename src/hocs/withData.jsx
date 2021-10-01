import React, { useState, useEffect } from 'react';
import Loader from 'components/Loader/Loader';
import axios from 'axios';

const withData = (WrappedComponent) => {
    return props => {
        const [data, setData] = useState([]);

        useEffect(() => {
            axios({
                url: props.dataSource,
                method: 'GET',
            })
                .then(response => {
                    setData(response.data.content.slice(0, 10));
                })
                .catch(error => {
                    console.log(error)
                })
        }, []);
        // dataSource = 'http://movieapi.cyberlearn.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01'

        if (data.length < 1) return <Loader />;

        return <WrappedComponent data={data} {...props} />;
    }
}

export default withData;