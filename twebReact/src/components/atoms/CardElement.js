import React from "react";
import { Card, CardBody, Image } from "@nextui-org/react";
import '../../style/global.css';
import { useNavigate } from 'react-router-dom';
export default function CardElement({ clubId, title, subtitle, image, type, position }) {

    const navigate = useNavigate();
    console.log("clubId", clubId);
  console.log("imageUrl", image);
    const handleClickCard = () => {
        navigate(`/${type}/${clubId}`);
    }
  

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4" style={{ overflow: 'hidden' }}>

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
              isPressable onPress={() => handleClickCard()}
      >
        <CardBody className="flex flex-col justify-between" style={{overflow: 'hidden'}}>
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
