Reflection question 1: The render function must be a pure function of props and the
component state, the values returned by useState(). What happens if the output of the
render function is depending on other data that changes over time?

React expects the same output given the same input, having it depend on other data that changes over time casues issues susch as inconsistencies thus making it a inpure function.
It might also cause the render to miss updates if the data changes but the state remains the same.


Reflection question 2: In the code above, the foundations array is computed every time
the component is rendered. The inventory changes very infrequent so you might think this
is inefficient. Can you cache foundations so it is only computed when props.inventory
changes?:

You could use useEffect() to update the the array only when a change in one dependency (inventory) is noticed but its inefficient, using useMemo is much better.


Reflection question 3: Should you move the foundation state to the Select component
above? To answer this you need to consider what happens when the user submits the
form:
No it is better that the state is in the the higher hierarchy since you need access to the current state when the user submits the form.


Reflection question 4: What triggers react to call the render function and update the DOM?

State changes & Props changes (State in our case when user inputs something that changes states ie checks a box,selects option, clicks submit)


Reflection question 5: When the user change the html form state (DOM), does this change
the state of your component?
In our components yes since they are controlled, however this is not always the case since you can have uncontrolled componenets aswell.

Reflection question 6: What is the value of this in the event handling call-back functions?

In class components, this in event handlers refers to the component instance if properly bound; in function components, this is not used—React hooks and functional closures are used instead.

Reflection question 7: How is the prototype chain affected when copying an object with
copy = {...sourceObject}?
It becomes a shallow copy and it only copies owned properties of the object but not the inherited ones. The copy object will not have the same prototype as the original.
Therefore the prototype chain will be diffrent.