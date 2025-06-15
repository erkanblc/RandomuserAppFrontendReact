import { Button } from '@mui/material';
import React, { useRef, useState , useEffect} from 'react';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

function Deneme() {
  const [deger,setDeger] = useState(0);
useEffect(() => {
    document.title = `Sayı: ${deger}`;
  }, [deger]);

  const handleArt = () => {
      setDeger(deger + 1);
  };

  const handleAzalt = () => {
    setDeger(deger - 1);
  };
  const handleResetle = () => {
    setDeger(0);
  };
  return (
    <div className="App">
        {deger}
        <Button onClick={handleArt} variant="contained" color="success">Arttir</Button>
        <Button onClick={handleAzalt}>Azalt</Button>
        <Button onClick={handleResetle} variant="contained" color='error' startIcon={<RotateLeftIcon />}>Resetle</Button>
    </div>
  );
}

export default Deneme;