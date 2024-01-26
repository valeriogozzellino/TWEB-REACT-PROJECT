import * as React from 'react';
import Card from '@mui/joy/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


//modificare il codice in modo che possa ricevere un titolo una immagine un link e una description
//modificare poi a propio piacimento la card
export default function CardNews({ newsApi}) {
    
  return (
    <Card color="primary" variant="soft" sx={{ maxWidth: 245, margin: 2, maxHeight: 450 }}>
      <CardActionArea>

      <CardMedia
        component="img"
        sx={{ height: 100, marginBottom:0 }}
        image={newsApi.image}
        title={newsApi.title}
        wrap="wrap"  
      />
        <CardContent sx={{ height: 100, marginTop: 1, padding:0 }}>
          <Typography gutterBottom variant="h6"  component="div"  sx={{ fontSize:13 }}>
            {newsApi.title}
          </Typography>
          <Typography variant="body2" color="text.secondary"  sx={{ fontSize:10 }}>
            {newsApi.description}
          </Typography>
        </CardContent>
      
        <CardActions>
          <Button size="small" href={newsApi.url} target="_blank" rel="noopener noreferrer">
            Learn More
          </Button>
        </CardActions>
      </CardActionArea>
      
    </Card>
  );
}