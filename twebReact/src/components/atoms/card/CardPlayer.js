import React from 'react';
import { Card, Image } from '@nextui-org/react';
import '../../../style/global.css';
import { useNavigate } from 'react-router-dom';

export default function CardPlayers({
  Id,
  firstName,
  lastName,
  position,
  image,
}) {
  const navigate = useNavigate();

  const handleClickCard = () => {
    navigate(`/player/${Id}`);
  };

  return (
    <div
      className="gap-2 grid grid-cols-2 sm:grid-cols-4"
      style={{ overflow: 'hidden' }}
    >
      <Card
        key={Id}
        hoverable
        clickable
        shadow="sm"
        className="w-full circle-card card-hover-effect" // Add the CSS class here
        style={{
          borderColor: 'rgb(254, 254, 254)',
          border: '1px solid',
          width: '350px',
          height: '100px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'start',
          background: '#1a1a2e',
          borderRadius: '10px',
          cursor: 'pointer',
          overflow: 'hidden',
        }}
        onPress={() => handleClickCard()}
      >
        <img
          src={image}
          alt={`${firstName} ${lastName} ${position}`}
          width="40px"
          height="40px"
          style={{ borderRadius: '50%', margin: '5px' }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            color: 'white',
            paddingLeft: '10px',
          }}
        >
          <b>
            {firstName} {lastName}
            <br />
            {position}
          </b>
        </div>
      </Card>
    </div>
  );
}
