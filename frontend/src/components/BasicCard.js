import * as React from 'react';
//import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

/*const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);
*/
export default function BasicCard() {
  return (
    <Card sx={{ minWidth: 275 }}>
       <CardContent>
       <Typography variant="h5" component="div">
       SriLankan Airlines
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Launched in 1979, Sri Lanka’s National Carrier is an award winning air…
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          134$ per Person
        </Typography>
        <Link className='warning' to={'/add-reservation'}>Book Now </Link>
      </CardContent>
    </Card>
  );
}