import React from 'react';
import Button from '@mui/material/Button';
import ArrowCircleUpTwoToneIcon from '@mui/icons-material/ArrowCircleUpTwoTone';
/**
 * ButtonGoTop Component:
 *
 * Provides a button for scrolling to the top of the page.
 *
 * Behavior:
 * - When the page is scrolled beyond a certain point, the button becomes visible.
 * - On button click, scrolls the page smoothly to the top.
 *
 * @param {number} scrollPosition The current scroll position of the page.
 * @returns {JSX.Element} The JSX for the ButtonGoTop button.
 */
export default function ButtonGoTop({ scrollPosition }) {
  return (
    <>
      {scrollPosition > 100 && (
        <div
          className="go-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            position: 'fixed',
            bottom: '60px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: '100',
          }}
        >
          <Button
            style={{
              color: 'white',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
            }}
            color="primary"
            variant="contained"
          >
            <ArrowCircleUpTwoToneIcon style={{ fontSize: '60px' }} />
          </Button>
        </div>
      )}
    </>
  );
}
