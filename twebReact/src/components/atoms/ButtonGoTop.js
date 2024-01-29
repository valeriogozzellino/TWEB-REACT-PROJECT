import React from 'react';
import Button from '@mui/material/Button';
import ArrowCircleUpTwoToneIcon from '@mui/icons-material/ArrowCircleUpTwoTone';

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
            right: '685px',
            zIndex: '100',
          }}
        >
          <Button
            style={{
              width: '4px',
              height: '10px',
            }}
            variant="contained"
          >
            <ArrowCircleUpTwoToneIcon style={{ fontSize: '200px' }} />
          </Button>
        </div>
      )}
    </>
  );
}
