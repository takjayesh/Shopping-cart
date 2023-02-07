import { CartState } from "./context/context";
import { useState } from 'react';
import './ProductPage.css';

function ProductPage({addToCart}){
    const {state, dispatch}  = CartState();
    const [quantity, setquantity] = useState(1);

    const handleChange = (e) => {
      setquantity(e.target.value);
    
    };

    return (
        <div>
            <div className="single-product">
                <div className="image-content">
                    <img className="img-showcase" src={state.productToDisplay.imageURL}></img>
                </div>
                <div className="prod-content">
                    <h1><span>{state.productToDisplay.brand} {state.productToDisplay.model}</span></h1>
                    <h3>Price : <span>${state.productToDisplay.price}</span></h3>
                    <h5>Category : <span>{state.productToDisplay.category}</span></h5>
                    <h5>Sub-Category : <span>{state.productToDisplay.subCategory}</span></h5>
                    <p><h4>Product Description</h4>
                        <ul>
                        {state.productToDisplay.description.map( (descItem) => {
                                return <li>{descItem}</li>
                        })}
                        </ul>
                    </p>
                    <p>Quantity Selected {"\u00a0"}   
                            <select className="dropdown-qty" onChange={handleChange}>
                            {
                            [...Array(10)].map((x, i) =>
                                <option key={i+1} value={i+1}>{i+1}</option>
                            )
                            }
                            </select>
                        </p>
                        <p><button className="cart-button" onClick={() =>addToCart(state.productToDisplay, quantity)}>Add To Cart</button></p>
                </div>
            </div>
        </div>
    )
}; 

export default ProductPage;