import { useId, useState } from 'react';
import inventory from './inventory.mjs';
import { useCallback } from 'react';
import Salad from './lab1.mjs'
import { useOutletContext } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


function ComposeSalad() {
  const navigate = useNavigate()
  const { inventory, handleSaladSubmit } = useOutletContext();
  const foundationList = Object.keys(inventory).filter(name => inventory[name].foundation);
  const proteinList = Object.keys(inventory).filter(name => inventory[name].protein);
  const dressingList = Object.keys(inventory).filter(name => inventory[name].dressing);
  const extraList = Object.keys(inventory).filter(name => inventory[name].extra);

  const [foundation, setFoundation] = useState(" ");
  const [protein, setProtein] = useState(" ");
  const [dressing, setDressing] = useState(" ");
  const [extras, setExtra] = useState({});
  const [touched, setTouched] = useState(false);

 

  const handleFoundationChange = (event) => {
    setFoundation(event.target.value);
  }
  const handleProteinChange = (event) => {
    setProtein(event.target.value);
  }
  const handleDressingChange = (event) => {
    setDressing(event.target.value);
  }

  const handleSubmit = (event) => {
   event.preventDefault();
   setTouched(true);
   const extraCount = Object.values(extras).filter(v => v).length;
   
   if((extraCount >= 2) && (event.target.checkValidity())){

   
   const salad  = new Salad();
   salad.add(foundation, inventory[foundation]);
   salad.add(protein, inventory[protein]);

   
   Object.keys(extras).forEach(extra => {
    if(extras[extra]){
      salad.add(extra, inventory[extra])
    }})
    salad.add(dressing, inventory[dressing]);

    

    // Reset form fields to their default states
    setFoundation("");
    setProtein("");
    setExtra({});
    setDressing("");
    //collect current s
    setTouched(false)
    // const saladInventory = foundation + protein + extras + dressing;   
    //send data to app
    //reset the from to default states

    handleSaladSubmit(salad);
    navigate(`/view-order/confirm/${salad.uuid}`);

  }else{
    if(!(extraCount >= 2)){
      alert('You must select two or more extras');

    }
    if(!event.target.checkValidity()){
      alert('Choose foundation, prots and dress')

    }
    
    
  }
   
  }
  






   const handleExtraChange = (event) => {
    //const newExtra = { ...extras, [event.target.name]: event.target.checked}
    //setExtra(newExtra);
    




    const {value, checked} = event.target;
    const newExtra = { ...extras, [event.target.name]: event.target.checked}

    //onsole.log(value);
    //console.log(checked);

   /* const selectedCount = Object.values(extras).filter(v => v).length;
    if(checked && selectedCount < 2){
      alert('You must select two or more options');
      return;
    }*/
    //console.log(newExtra);
    if (checked) {
      //setExtra([...extras, value]);
     setExtra(newExtra => ({ ...newExtra, [value]: true }));
    } else {
      //setExtra(extras.filter(item => item !== value));
      setExtra(newExtra => ({ ...newExtra, [value]: false }));
    }
    //console.log(extras);

  }
 

  function makeOptions(inventory, prop) { 
    return Object.keys(inventory)
    .filter(key => inventory[key][prop] == true)
    .map(key => (
      <option key={key} value={key}>{key} </option>
    ));
  }

  function Select({label, onChange, value, options}){
    const id = useId();

    return(
      <div>
        <label htmlFor={id} className='form-label'>{label}</label>
        <select required onChange={onChange} value={value} className='form-select' id={id}>
        <option value="">Select an option</option> 
          {options.map((option, index) => (
            <option
            key = {index}
            value = {option}>
              {option}{" ("}{inventory[option].price}{" Kr)"}
            </option>
          ))}

        
        </select>
        <div className="invalid-feedback">Fel input</div>  
      </div>
    );
  }

  return (
    <div className="continer col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Välj innehållet i din sallad</h2>
        
        <form noValidate className={touched ? "was-validated" : ""} onSubmit={handleSubmit}>
        <fieldset className="col-md-12">
          <Select label="Välj Bas"
          onChange={handleFoundationChange}
          value={foundation}
          options={foundationList}
          >
          </Select>
        </fieldset>

        <fieldset className="col-md-12">
        <Select label="Välj Protein"
          onChange={handleProteinChange}
          value={protein}
          options={proteinList}
          >
          </Select>
        </fieldset>


        <fieldset className="col-md-12">
          <label htmlFor="extras" className="form-label">Välj Extra</label>
          {extraList.map((option, index) => (
            <div key={index}>
              <input 
              type="checkbox"
              id={`checkbox-${option}`}
              value={option}
              onChange={handleExtraChange}
              className='form-check-input'
              checked= {extras[option] || false}
              //disabled={!extras.includes(option) && extras.length >= 2}
              />
              <label 
              htmlFor={`checkbox-${option}`}
              >
                {option}{" ("}{inventory[option].price}{" Kr)"}
                </label>
                </div>
              ))}
              </fieldset>

        

        <fieldset className="col-md-12">
        <Select label="Välj Dressing"
          onChange={handleDressingChange}
          value={dressing}
          options={dressingList}
          >
          </Select>
        </fieldset>


        <fieldset className="col-md-12">
        <button type="submit" onSubmit={handleSubmit}>Submit</button>

  
        </fieldset>
        </form>
         






      </div>
    </div>




  );
}
export default ComposeSalad;





