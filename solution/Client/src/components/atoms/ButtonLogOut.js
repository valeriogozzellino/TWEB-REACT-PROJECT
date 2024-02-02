import React from 'react';
import Button from '@mui/material/Button';
/**
 * ButtonLogOut Component:
 *
 * Provides a button for logging out the current user.
 *
 * Behavior:
 * - On button click, removes the user data from local storage and redirects to the home page.
 *
 * @returns {JSX.Element} The JSX for the ButtonLogOut button.
 */

export default function ButtonLogOut() {
  return (
    <>
      <div
        style={{
          width: '90px',
          height: '80px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: '5px',
        }}
      >
        <Button
          style={{
            color: 'white',
            width: '80px',
            height: '40px',
          }}
          onClick={() => {
            localStorage.removeItem('user');
            window.location.href = '/';
          }}
          color="primary"
          variant="contained"
        >
          <em>LogOut</em>
        </Button>
      </div>
    </>
  );
}
