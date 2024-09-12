'use strict';
/**
 * Reflection question 1
 * It is unnecessary because the ingredients that are not explicitly defined are undefined which in JavaScript falls into the falsey category.
 * Therefore, a property that is either undefined or explicitly defined as false would both be evaluated to false.
 * You reduce the amount of redundant code and memory usage,

 */

import inventory from './inventory.mjs';
import { v4 as uuidv4 } from 'uuid';
console.log('\n=== beginning of printout ================================')
console.log('inventory:', inventory);

console.log('\n--- Object.keys() ---------------------------------------')
const names = Object.keys(inventory);
names
  .sort((a, b) => a.localeCompare(b, "sv", { sensitivity: 'case' }))
  .forEach(name => console.log(name));

console.log('\n--- for ... in ---------------------------------------')
for (const name in inventory) {
  console.log(name);
}
/**
 * Reflection question 2
 * It comes down to if a thing is enumerable or not, and where the property comes from.Using a method like Object.keys() returns the objects own enumerable properties,
 * it does not return inherited properties, nor does it return non-enumerable properties such as forEach().
 * Using a method like “for….in” returns all enumerable properties, including inherited ones.
 * A difference in output would occur if there is a numerable inherited property in the object.

 */

console.log('\n--- Assignment 1 ---------------------------------------')

//Gets the properties from inventory, filters them by input property and maps them out on a string.
function makeOptions(inv, prop) { 
  const options = Object.keys(inventory)
    .filter(key => inventory[key][prop] == true)
    .map(key => `<option value="${key}" key="${key}"> ${key}, ${inventory[key].price} kr</option>`);
    return options;

}

console.log(makeOptions(inventory, 'foundation'));

console.log('\n--- Assignment 2 ---------------------------------------')
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






let myCaesarSalad = new Salad()
  .add('Sallad', inventory['Sallad'])
  .add('Kycklingfilé', inventory['Kycklingfilé'])
  .add('Bacon', inventory['Bacon'])
  .add('Krutonger', inventory['Krutonger'])
  .add('Parmesan', inventory['Parmesan'])
  .add('Ceasardressing', inventory['Ceasardressing'])
  .add('Gurka', inventory['Gurka']);
console.log(JSON.stringify(myCaesarSalad) + '\n');
myCaesarSalad.remove('Gurka');
console.log(JSON.stringify(myCaesarSalad) + '\n');

console.log('\n--- Assignment 3 ---------------------------------------')
console.log('En ceasarsallad kostar ' + myCaesarSalad.getPrice() + 'kr');
// En ceasarsallad kostar 45kr
console.log('En ceasarsallad har ' + myCaesarSalad.count('lactose') + ' ingredienser med laktos');
// En ceasarsallad har 2 ingredienser med laktos
console.log('En ceasarsallad har ' + myCaesarSalad.count('extra') + ' tillbehör');
// En ceasarsallad har 3 tillbehör

/*
Reflection 3
The difference is that when a object has the prototype property it acts as a "template" to another object, that is to say the other object is,
linked to the prototype and will infer properties from it.
property chain is the series of links between objects to other objects. It creates a hierarchy of prototypes

Every object has a prototype property.

you access [[Prototype]] by Object.getPrototypeOf()
*/

console.log('\n--- reflection question 3 ---------------------------------------')
console.log('typeof Salad: ' + typeof Salad);
console.log('typeof Salad.prototype: ' + typeof Salad.prototype);
console.log('typeof Salad.prototype.prototype: ' + typeof Salad.prototype.prototype);
console.log('typeof myCaesarSalad: ' + typeof myCaesarSalad);
console.log('typeof myCaesarSalad.prototype: ' + typeof myCaesarSalad.prototype);
console.log('check 1: ' + (Salad.prototype === Object.getPrototypeOf(Salad)));
console.log('check 2: ' + (Salad.prototype === Object.getPrototypeOf(myCaesarSalad)));
console.log('check 3: ' + (Object.prototype === Object.getPrototypeOf(Salad.prototype)));

console.log('\n--- Assignment 4 ---------------------------------------')

const singleText = JSON.stringify(myCaesarSalad);
const arrayText = JSON.stringify([myCaesarSalad, myCaesarSalad]);

/*console.log('single text:')
console.log(singleText);
console.log('array text:\n')
console.log(arrayText);
*/
const objectCopy = new Salad(myCaesarSalad);
const singleCopy = Salad.parse(singleText);
const arrayCopy = Salad.parse(arrayText);

console.log('original myCaesarSalad\n' + JSON.stringify(myCaesarSalad));
console.log('new(myCaesarSalad)\n' + JSON.stringify(objectCopy));
console.log('Salad.parse(singleText)\n' + JSON.stringify(singleCopy));
console.log('Salad.parse(arrayText)\n' + JSON.stringify(arrayCopy));

singleCopy.add('Gurka', inventory['Gurka']);
console.log('originalet kostar ' + myCaesarSalad.getPrice() + ' kr');
console.log('kopian med gurka kostar ' + singleCopy.getPrice() + ' kr');

console.log('\n--- Assignment 5 ---------------------------------------')

class GourmetSalad extends Salad{
/*
specify size of ingredients, defaults 1, add should increase the amount
price is unit price
*/ 
  constructor(other){
    super(other);
  }
  add(name, properties, size = 1) {

    let currentIngredient = this.ingredients[name] || {};
    let updatedSize = (currentIngredient.size || 0) + size;
    let gourmetProperties = { ...properties, size: updatedSize };

    //const updatedSize = (currentIngredient.size || 0) + size;
    //const gourmetProperties = {...properties, size: size}
    return super.add(name, gourmetProperties)
  }

  getPrice(){
    console.log(Object.values(this.ingredients));
    const totalPrice = Object.values(this.ingredients).reduce(
      (acc, curr)=> acc + curr.price * curr.size, 0);
    return totalPrice;
  }

}

let myGourmetSalad = new GourmetSalad()
  .add('Sallad', inventory['Sallad'], 0.5)
  .add('Kycklingfilé', inventory['Kycklingfilé'], 2)
  .add('Bacon', inventory['Bacon'], 0.5)
  .add('Krutonger', inventory['Krutonger'])
  .add('Parmesan', inventory['Parmesan'], 2)
  .add('Ceasardressing', inventory['Ceasardressing']);
console.log('Min gourmetsallad med lite bacon kostar ' + myGourmetSalad.getPrice() + ' kr');
myGourmetSalad.add('Bacon', inventory['Bacon'], 1)
console.log('Med extra bacon kostar den ' + myGourmetSalad.getPrice() + ' kr');

console.log('\n--- Assignment 6 ---------------------------------------')

console.log('Min gourmetsallad har id: ' + myGourmetSalad.id);
console.log('Min gourmetsallad har uuid: ' + myGourmetSalad.uuid);


/**
 * 
 * 
 * 
 * 
 * 
 * 
 * Reflection question 4: In which object are static properties stored?
 * They are stored on the class itself instead of the instance of the class
 * 
 * Reflection question 5:Can you make the id property read only?
 * Yes, by using Object.defineProperty(), you can set writable to false.
 * 
 * Reflection question 6:Can properties be private?
 * Not in older versions, but yes, properties can set to be private using '#'



 */ 


console.log('\n--- Assignment 7 ---------------------------------------')

/*let testSalad = new Salad()
  .add('Sallad', inventory['Sallad'])
  .add('Kycklingfilé', inventory['Kycklingfilé'])
  .add('Bacon', inventory['Bacon'])
  .add('Krutonger', inventory['Krutonger'])
  .add('Parmesan', inventory['Parmesan'])
  .add('Ceasardressing', inventory['Ceasardressing'])
  .add('Gurka', inventory['Gurka']);

const singleTextTest = JSON.stringify(testSalad);
const arrayTextTest = JSON.stringify([testSalad, testSalad]);
const objectCopyTest = new Salad(testSalad);
const singleCopyTest = Salad.parse(singleText);
const arrayCopyTest = Salad.parse(arrayText);
*/

const salad1 = new Salad();
// add ingredients to salad 1
const salad2 = new Salad(salad1)
// salad1.uuid !== salad2.uuid, they are different salads
salad2.add('Bacon', inventory['Bacon']);
order(salad1, salad2);


/*const salad1 = new Salad(); // add ingredients to salad 1
storeInDatabase(salad1);
// app is reloaded, all JavaScript objects are lost
const text = fetchFromDatabase();
const salad2 = Salad.parse(text);
// salad1.uuid === salad2.uuid, they are the same salad
salad2.add(Bacon, inventory['Bacon']);
storeSaladInDatabase(salad2); // update the existing salad*/