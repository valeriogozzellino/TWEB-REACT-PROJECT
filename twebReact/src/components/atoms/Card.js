import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

//modificare il codice in modo che possa ricevere un titolo una immagine un link e una description
//modificare poi a propio piacimento la card
export default function CardTemplate({index , newsApi}) {
    console.log("sono dentro cardtemplate");
    console.log(newsApi[index].title);
    console.log(newsApi[index].image);
    console.log(newsApi[index].description);
    console.log(newsApi[index].url);
  return (
    <Card sx={{ maxWidth: 345, margin:2 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={newsApi[0].image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}