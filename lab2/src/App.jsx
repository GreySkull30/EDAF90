import 'bootstrap/dist/css/bootstrap.css'
import inventory from './inventory.mjs';
import ComposeSalad from './ComposeSalad';
import Salad from './lab1.mjs'
import { useState, useCallback } from 'react';
import ViewOrder from './ViewOrder';

function App() {
  let extras = Object.keys(inventory).filter(name => inventory[name].extra);
  const [salads, setSalads] = useState([])
  const handleSaladSubmit = useCallback((salad) =>{
    //const newSalads = { ...salads, [event.target.name]: event.target.checked}
    setSalads(prevSalads => [...prevSalads, salad]);
    console.log(salads);
    
  },[]);
  return (
    <div className="container py-4">
      <header className="pb-3 mb-4 border-bottom">
        <span className="fs-4">Min egen salladsbar</span>
      </header>

        <ViewOrder salads={salads}></ViewOrder>


      <ComposeSalad inventory={inventory} handleSaladSubmit={handleSaladSubmit}></ComposeSalad>

      <footer className="pt-3 mt-4 text-muted border-top">
        EDAF90 - webprogrammering
      </footer>
    </div>
  );
}

export default App;