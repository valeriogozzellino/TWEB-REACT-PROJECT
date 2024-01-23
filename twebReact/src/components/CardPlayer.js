// import React from "react";
// import { Card, CardBody, Image } from "@nextui-org/react";
// import '../style/global.css';
// import { useNavigate } from 'react-router-dom';

// export default function CardPlayers({ Id, firstName, lastName, image }) {
//     const navigate = useNavigate();
//     console.log("Id", Id);
//     console.log("imageUrl", image);
//     const handleClickCard = () => {
//         navigate(`/player/${Id}`);
//     }
  
//     return (
//         <div className="gap-2 grid grid-cols-2 sm:grid-cols-4" style={{overflow: 'hidden'}}>
//             <Card
//                 key={Id}
//                 shadow="sm"
//                 className="w-full circle-card"
//                 style={{
//                     height: '280px', // Adjust the height as needed
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     background: 'linear-gradient(to bottom, #000, rgb(209 234 251 / 27%))', // Slightly blue gradient background
//                     borderRadius: '50%', // This makes the card circular
//                     cursor: 'pointer',
//                     maxWidth: '280px',
//                     overflow: 'hidden',
//                 }}
//                 isPressable onPress={() => handleClickCard()}
//             >
//                 <CardBody className="flex flex-col justify-between" style={{height: '100%', width: '100%'}}>
//                     <img
//                         className="w-full h-full object-cover rounded-full"
//                         src={image}
//                         alt={firstName}
//                         style={{ borderTopLeftRadius: '50%', borderTopRightRadius: '50%', backgroundColor:'inherit' }}

//                     />
//                     <div className="flex items-center justify-center h-1/4">
//                         <b className="text-lg">{firstName}{lastName}</b>
//                     </div>
//                 </CardBody>
//             </Card>
//         </div>
//     );
// }
import React from "react";
import { Card, Image } from "@nextui-org/react";
import '../style/global.css';
import { useNavigate } from 'react-router-dom';

export default function CardPlayers({ Id, firstName, lastName, image}) {
    const navigate = useNavigate();
    
    const handleClickCard = () => {
        navigate(`/player/${Id}`);
    }

    return (
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4" style={{overflow: 'hidden'}}>
            <Card
                key={Id}
                hoverable
                clickable
                shadow="sm"
                className="w-full circle-card"
                style={{
                    width: '250px',
                    height: '100px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'start',
                    background: '#04233f',
                    borderRadius: '10px',
                    borderColor: 'white',
                    cursor: 'pointer',
                    overflow: 'hidden',
                }}
                onPress={() => handleClickCard()}
            >
                <img
                    src={image}
                    alt={`${firstName} ${lastName}`}
                    width="40px"
                    height="40px"
                    style={{ borderRadius: '50%', margin: '5px' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', color: 'white', paddingLeft: '10px' }}>
                    <b>{`${firstName} ${lastName}`}</b>
                    {/* <span>{position}</span> */}
                </div>
            </Card>
        </div>
    );
}
