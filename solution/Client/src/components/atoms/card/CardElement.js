import React from 'react';
import { Card, CardBody } from '@nextui-org/react';
import '../../../style/global.css';
import { useNavigate } from 'react-router-dom';

/**
 * CardElement Component:
 *
 * This component is used for displaying a card representing a club or entity. It's designed
 * to be visually appealing and interactive, allowing users to navigate to a specific route
 * based on the card's content.
 *
 * Props:
 *  @param {number} clubId - Unique identifier for the club or entity.
 *  @param {string} title - Main title or name to be displayed on the card.
 *  @param {string} subtitle - Subtitle or additional information (not used in current implementation).
 *  @param {string} image - URL of the image to be displayed on the card.
 *  @param {string} type - Type or category of the club/entity, used for dynamic routing.
 *  @param {number} position - Position or rank of the club/entity (not used in current implementation).
 *
 * Behavior:
 *  - The card is styled with a linear gradient background, and it's meant to be fully clickable.
 *  - Clicking the card navigates the user to a route dynamically generated based on the 'type' and 'clubId'.
 *  - The card displays an image and a title, with predefined styles for dimensions, alignment, and appearance.
 *
 * @returns {JSX.Element} A styled card component with an image, title, and click-to-navigate functionality.
 */
export default function CardElement({
  clubId,
  title,
  subtitle,
  image,
  type,
  position,
}) {
  const navigate = useNavigate();
  const handleClickCard = () => {
    navigate(`/${type}/${clubId}`);
  };

  return (
    <div
      className="gap-2 grid grid-cols-2 sm:grid-cols-4"
      style={{ overflow: 'hidden' }}
    >
      <Card
        key={clubId}
        shadow="sm"
        radius="lg"
        className="w-full"
        style={{
          height: '280px', // Adjust the height as needed
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: 'linear-gradient(rgb(255 255 255), rgb(140 172 219))', // Slightly blue gradient background
          borderRadius: '20px',
          cursor: 'pointer',
          width: '260px',
        }}
        isPressable
        onPress={() => handleClickCard()}
      >
        <CardBody
          className="flex flex-col justify-between"
          style={{ overflow: 'hidden' }}
        >
          <div className="h-32">
            <img
              className="w-full h-full object-cover rounded-lg"
              src={image}
              alt={title}
            />
          </div>
          <div className="mt-2">
            <b className="text-lg">{title}</b>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
