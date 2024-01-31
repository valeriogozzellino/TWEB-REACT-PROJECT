import React from 'react';
import ReactLoading from 'react-loading';
/**
 * LoadingComponent Component:
 *
 * Provides a visual indicator for loading processes.
 *
 * Behavior:
 * - Displays a loading animation.
 *
 * @param {string} type The type of loading animation.
 * @param {string} color The color of the loading animation.
 * @returns {JSX.Element} The JSX for the LoadingComponent.
 */

const LoadingComponent = ({ type, color }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      paddingRight: '20px',
    }}
  >
    <ReactLoading type={type} color={color} height={667} width={100} />
  </div>
);

export default LoadingComponent;
