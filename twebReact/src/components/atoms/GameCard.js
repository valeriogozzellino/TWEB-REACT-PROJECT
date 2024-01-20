import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function GameCard({ game, imageurl1, imageurl2 }) {
    
  const [clubWinView, setClubWinView] = React.useState(false);

  React.useEffect(() => {
        setClubWinView(game.is_win);
  }, [game.is_win]);
  
  return (
    <Card sx={{ maxWidth: 345, marginBottom:'10px', height:'200px', width:'400px', backgroundColor:'rgba(255, 255, 255, 0.591)', border: clubWinView ? '3px solid rgb(111, 40, 40)' :'3px solid green'}} >
        <CardActionArea sx={{display:'flex', flexDirection:'row', justifyContent:'space-around', marginTop:'2px'}}>
        <div>
                  
        <CardMedia
          component="img"
          height="100"
          image={imageurl1}
          alt="green iguana"
        />
              
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {game.club_id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
           goals:{game.opponent_goals}
          </Typography>
        </CardContent>
        </div>      
        <div>
                  
        <CardMedia
          component="img"
          height="100"
          image={imageurl2}
          alt="green iguana"
        />
              
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {game.opponent_id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            goals: {game.own_goals}
          </Typography>
        </CardContent>
        </div>      
      </CardActionArea>
    
    </Card>
  );
}