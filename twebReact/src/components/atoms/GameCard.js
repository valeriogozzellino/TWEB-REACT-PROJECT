import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import '../../style/Card.css'





export default function GameCard({ game, imageurl1, imageurl2 }) {
    
  const [clubWinView, setClubWinView] = React.useState(false);

  React.useEffect(() => {
    if (game.home_club_goals > game.away_club_goals) {
      setClubWinView(false);
    } else {
      setClubWinView(true);
    }
  }, [game]);
  
  return (
    <Card sx={{ maxWidth: 300, marginBottom:'10px', height:'180px', width:'350px', backgroundColor:'rgba(255, 255, 255, 0.591)', border: clubWinView ? '3px solid rgb(111, 40, 40)' :'3px solid green'}} >
        <CardActionArea sx={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginTop:'2px', height:'100%'}}>
        <div id='box-team-1'>
            <CardMedia
              component="img"
              sx={{ width: 50, height: 50 }} 
              image={imageurl1}
              alt="club"
            />
            <CardContent sx={{ padding: '5px' }}>
              <Typography gutterBottom variant="body1" component="div" sx={{fontSize:'10px'}}>
                {game.home_club_name}
              </Typography>
            </CardContent>
        </div> 
        <Box sx={{ display:'flex', flexDirection:'column' }}>
            <Typography variant="body2" color="text.secondary">
                {game.home_club_goals} : {game.away_club_goals}
            </Typography>
        </Box>
        <div id='box-team-2'>
            <CardMedia
              component="img"
              sx={{ width: 50, height: 50 }} 
              image={imageurl2}
              alt="opponent"
            />
            <CardContent sx={{ padding: '5px' }}> 
              <Typography gutterBottom variant="body1" component="div" sx={{fontSize:'10px'}}> 
                {game.away_club_name}
              </Typography>
            </CardContent>
        </div>      
      </CardActionArea>
    </Card>
  );
}
