import React from 'react';
import Salad from './lab1.mjs';

function ViewOrder(props){
    //creates a shooping list
    const order = Object.keys(props.salads);





    return (

        <div className="container col-12">
            <div className="row h-200 p-5 bg-light border rounded-3">
                <h2>
                    Varukorg
                </h2>


                {props.salads.map((salad, index) => {
                    const { foundation, protein, extras, dressing } = salad.ingredients;
                    
                    return(
                    <div 
                    key = {salad.uuid}
                    className="col-md-12 mb-3"
                    >
                    
                        <label>
                        <strong>Salad {index+1}:</strong> {Object.entries(salad.ingredients).map(([ingredient, details]) => 
                            ingredient
                            ).join(', ')}
                            {" ("}
                            {salad.getPrice()}
                            {" kr)"}
                        </label>
                    </div>

                        )}

                )}

            </div>
        </div>
    );
}

export default ViewOrder