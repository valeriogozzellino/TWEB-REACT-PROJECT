import React from 'react';
import ReactLoading from 'react-loading';

const LoadingComponent = ({ type, color }) => (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        paddingRight: '20px'
    }}>
    <ReactLoading type={type} color={color} height={667} width={100}/>
    </div>

);

export default LoadingComponent;