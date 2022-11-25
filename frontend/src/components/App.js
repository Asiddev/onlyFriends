import * as React from 'react';
import { Button } from '@mui/material';

function App() {
  return (
    <div>
      <h1>Different button variants</h1>
      <Button variant="contained">contained</Button>
      <Button variant="outlined">outlined</Button>
      <Button variant="text">text</Button>
      <Button variant="string">string</Button>
    </div>
  );
}

export default App;
