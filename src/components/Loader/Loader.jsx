import React from 'react';
import {
    LoadingOutlined,
  } from '@ant-design/icons';

export default function Loader() {
    return (
        <div style={{paddingTop: '10vh'}}>
            <h1>Please Wait</h1> <br />
            <LoadingOutlined style={{ fontSize: '36px', color: '#17A2B8', padding: '0 10px' }}/>
            <LoadingOutlined style={{ fontSize: '36px', color: '#17A2B8', padding: '0 10px' }}/>
            <LoadingOutlined style={{ fontSize: '36px', color: '#17A2B8', padding: '0 10px' }}/>
        </div>
    )
}
