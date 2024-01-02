import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

//modificare il codice in modo che possa ricevere un titolo una immagine un link e una description
//modificare poi a propio piacimento la card
export default function CardNews({ newsApi}) {
    
  return (
    <Card sx={{ maxWidth: 245, margin:2 ,maxHeight:450}}>
      <CardMedia
        sx={{ height: 140 }}
        image={newsApi.image}
        title={newsApi.title}
        wrap="wrap"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {newsApi.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
           {newsApi.description}
        </Typography>
      </CardContent>
      <CardActions>
       <Button size="small" href={newsApi.url} target="_blank" rel="noopener noreferrer">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}