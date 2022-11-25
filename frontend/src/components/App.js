import * as React from 'react';
import { Button, Chip, Slider } from '@mui/material';

function App() {
  
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  return (
    <div>
      <h1>Material UI - demos</h1>

      <h2>buttons</h2>
      <Button variant="contained">contained</Button>
      <Button variant="outlined">outlined</Button>
      <Button variant="text">text</Button>
      <Button variant="string">string</Button>

      <h2>chips</h2>
      <Chip label="Archery" variant="outlined" color="primary" onClick={handleClick}/>
      <Chip label="Axe-throwing" variant="filled" color="primary" onClick={handleClick}/>
      <Chip label="Climbing" variant="outlined" color="primary" onClick={handleClick}/>
      <Chip label="Kayaking" variant="outlined" color="primary" onClick={handleClick}/>
      <Chip label="Gaming" variant="filled" color="primary" onClick={handleClick}/>
      <Chip label="Parkour" variant="filled" color="primary" onClick={handleClick}/>

      <h2>slider</h2>
      <Slider defaultValue={50} />
      
      <h2>text</h2>

    </div>
  );
}

export default App;
