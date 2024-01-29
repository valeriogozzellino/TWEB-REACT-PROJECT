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
            width: '100px',
            height: '100px',
            position: 'fixed',
            bottom: '60px',
            right: '655px',
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
