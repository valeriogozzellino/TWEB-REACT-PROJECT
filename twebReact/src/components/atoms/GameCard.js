import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function GameCard({ game }) {
    console.log("GAME: ", game)
    console.log("GAME: ", game.club_id);
    console.log("GAME: ", game.opponent_id);
  return (
    <Card sx={{ maxWidth: 345, marginBottom:'10px', height:'200px' }}>
        <CardActionArea sx={{display:'flex', flexDirection:'row'}}>
        <div>
                  
        <CardMedia
          component="img"
          height="100"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
              
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {game.club_id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
           {game.opponent_goals}
          </Typography>
        </CardContent>
        </div>      
        <div>
                  
        <CardMedia
          component="img"
          height="100"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
              
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {game.opponent_id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {game.own_goals}
          </Typography>
        </CardContent>
        </div>      
        </CardActionArea>
    </Card>
  );
}