import { useId, useState } from 'react';
import inventory from './inventory.mjs';
import { useCallback } from 'react';
import Salad from './lab1.mjs'

function ComposeSalad(props) {
  const foundationList = Object.keys(props.inventory).filter(name => props.inventory[name].foundation);
  const proteinList = Object.keys(props.inventory).filter(name => props.inventory[name].protein);
  const dressingList = Object.keys(props.inventory).filter(name => props.inventory[name].dressing);
  const extraList = Object.keys(props.inventory).filter(name => props.inventory[name].extra);

  const [foundation, setFoundation] = useState('Pasta');
  const [protein, setProtein] = useState('Kycklingfilé');
  const [dressing, setDressing] = useState('Ceasardressing');
  const [extras, setExtra] = useState({ Bacon: true, Fetaost: true });
 

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
   const salad  = new Salad();
   salad.add(foundation, props.inventory[foundation]);
   salad.add(protein, props.inventory[protein]);
   

   
   Object.keys(extras).forEach(extra => {
    if(extras[extra]){
      salad.add(extra, props.inventory[extra])
    }})
    salad.add(dressing, props.inventory[dressing]);

    

    // Reset form fields to their default states
    setFoundation('Pasta');
    setProtein('Kycklingfilé');
    setExtra({ Bacon: true, Fetaost: true });
    setDressing('Ceasardressing');
    //collect current states
    // const saladInventory = foundation + protein + extras + dressing;   
    //send data to app
    //reset the from to default states

    props.handleSaladSubmit(salad);
   
  }






   const handleExtraChange = (event) => {
    //const newExtra = { ...extras, [event.target.name]: event.target.checked}
    //setExtra(newExtra);
    




    const {value, checked} = event.target;
    const newExtra = { ...extras, [event.target.name]: event.target.checked}

    //onsole.log(value);
    //console.log(checked);

    const selectedCount = Object.values(extras).filter(v => v).length;
    if(checked && selectedCount >= 2){
      alert('You can only select two options');
      return;
    }
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
        <select onChange={onChange} value={value} className='form-select' id={id}>
          {options.map((option, index) => (
            <option
            key = {index}
            value = {option}>
              {option}{" ("}{props.inventory[option].price}{" Kr)"}
            </option>
          ))}

        
        </select>
      </div>
    );
  }

  return (
    <div className="continer col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Välj innehållet i din sallad</h2>
        
        <form onSubmit={handleSubmit}>
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
                {option}{" ("}{props.inventory[option].price}{" Kr)"}
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





