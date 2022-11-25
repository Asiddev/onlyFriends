import * as React from 'react';
import { Button, Chip } from '@mui/material';

function App() {
  return (
    <div>
      <h1>Material UI - demos</h1>

      <h2>buttons</h2>
      <Button variant="contained">contained</Button>
      <Button variant="outlined">outlined</Button>
      <Button variant="text">text</Button>
      <Button variant="string">string</Button>

      <h2>chips</h2>
      <Chip label="Chip variant Outlined - color primary" variant="outlined" color="primary"/>
      <Chip label="Chip variant Filled - color primary" variant="filled" color="primary" />
      <Chip label="Chip variant Outlined - color primary" variant="outlined" color="primary"/>
      <Chip label="Chip variant Outlined - color primary" variant="outlined" color="primary"/>
      <Chip label="Chip variant Outlined - color primary" variant="outlined" color="primary"/>
      <Chip label="Chip variant Filled - color primary" variant="filled" color="primary" />
      {/* <Chip label="Clickable" onClick={handleClick} />
      <Chip label="Clickable" variant="outlined" onClick={handleClick} /> */}
    </div>
  );
}

export default App;
