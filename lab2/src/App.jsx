import 'bootstrap/dist/css/bootstrap.css'
import inventory from './inventory.mjs';
import ComposeSalad from './ComposeSalad';
import Salad from './lab1.mjs'
import { useState, useCallback } from 'react';
import ViewOrder from './ViewOrder';
import { Outlet } from 'react-router-dom';
import Navbar from './NavBar';


function Header(){
  return(
    <header className="pb-3 mb-4 border-bottom">
    <span className="fs-4">Min egen salladsbar</span>
  </header>
  )
}
function Footer(){
  return(
    <footer className="pt-3 mt-4 text-muted border-top">
    EDAF90 - webprogrammering
  </footer>
  )

}

function App() {
  let extras = Object.keys(inventory).filter(name => inventory[name].extra);
  const [salads, setSalads] = useState([])
  const handleSaladSubmit = useCallback((salad) =>{
    //const newSalads = { ...salads, [event.target.name]: event.target.checked}
    setSalads(prevSalads => [...prevSalads, salad]);
    console.log(salads);



    //<ViewOrder salads={salads}></ViewOrder>
    //<ComposeSalad inventory={inventory} handleSaladSubmit={handleSaladSubmit}></ComposeSalad>
    
  },[]);
  return (
    <div className="container py-4">
      <Header />
      <Navbar />
      <Outlet context={{inventory, handleSaladSubmit, salads}}/>
      <Footer />

    </div>
  );
}

export default App;