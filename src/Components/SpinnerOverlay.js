import React from 'react';
import { Spinner } from 'react-bootstrap';
const spinnerStyles = {
    wrapper: {
        position: 'fixed',
        height: '100vh',
        width: '100vw',
        top: 0,
        display: 'flex'
    },
    spinner: {
        margin: 'auto'
    }
};
const SpinnerOverlay = () => (
    <div style={spinnerStyles.wrapper}>
        <Spinner animation="border" role="status" variant="primary" style={spinnerStyles.spinner}>
            <span className="sr-only">Loading...</span>
        </Spinner>
    </div>
);
export default SpinnerOverlay;