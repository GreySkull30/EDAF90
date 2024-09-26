'use strict';
/**
 * Reflection question 1
 * It is unnecessary because the ingredients that are not explicitly defined are undefined which in JavaScript falls into the falsey category.
 * Therefore, a property that is either undefined or explicitly defined as false would both be evaluated to false.
 * You reduce the amount of redundant code and memory usage,

 */

import inventory from '../../inventory.mjs';
import { v4 as uuidv4 } from 'uuid';

class Salad { 
  static instanceCounter = 0
  constructor(other) { 
    //this.ingredients = [];
    if(other instanceof Salad){
      this.ingredients = other.ingredients;
    }else{
      this.ingredients = {};
    }
    this.id = 'salad_' + Salad.instanceCounter++;
    const uuid = uuidv4(); // use this in the constructor
    this.uuid = uuid;
  }
  static parse(jsonFile){

    const parsedString = JSON.parse(jsonFile)
    //let parsedStringSO = [...jsonFile]
    console.log("DEBUG")
    //console.log(...parsedString.ingredients)
    if(Array.isArray(parsedString)){
      var saladArray = [];
      saladArray = parsedString.map(chunk => {
        const salad = new Salad();
        salad.ingredients = {...chunk.ingredients};
        salad.uuid = parsedString.uuid;
        return salad
      });
      return saladArray;

    }else if(typeof parsedString === 'object'){
      const salad = new Salad();
      salad.ingredients = {...parsedString.ingredients};
      salad.uuid = parsedString.uuid;
      return salad

    }


  }

  add(name, properties) { 
    this.ingredients[name] = properties;
    //this.ingredients.push(name, properties)
    return this;
  }

  remove(name) {
    delete this.ingredients[name];
    return this;
  }

  getPrice(){
    console.log(Object.values(this.ingredients));
    const totalPrice = Object.values(this.ingredients).reduce(
      (acc, curr)=> acc + curr.price, 0);
    return totalPrice;
  }
  count(property){
    const amountOfProperty = Object.values(this.ingredients).reduce((acc, curr) => acc + (curr[property] === true ? 1 : 0), 0);
    return amountOfProperty;
  }

  
}
export default Salad;
