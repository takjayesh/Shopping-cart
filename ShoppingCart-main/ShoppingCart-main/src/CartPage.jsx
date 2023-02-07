import { CartState } from "./context/context";
import { useEffect, useState } from 'react';
import './CartPage.css';

function CartPage({deleteItemFromCart, addToCart, cartCheckOut}){
    const { state } = CartState();
    const [total, setTotal] = useState(0);
    const [quantity, setquantity] = useState(1);
  
    const handleChange = (e) => {
      setquantity(e.target.value);
    };

    useEffect(() => {
        setTotal(
        state.cart.reduce(function(previousValue, currentValue){
            return (previousValue  + (Number(currentValue.price) * Number(currentValue.qty)));
        } , 0)
        );
    }, [state.cart]);

    return (
        <div className="cart-container">
            <h1>Your Cart</h1>
           
            {(() => {
                    if (state.cart.length === 0) {
                    return (
                        <div> 
                             <h3>No items in Cart</h3>         
                        </div>
                        )
                    } else {
                    return (
                            <div className="cart-top-div">
                                <div className="cart-product-container">
                                    {state.cart.map( (prod) => {
                                        return <div className="prod-card" key={prod.id}> 
                                                <img className="prod-image-showcase" src={prod.imageURL}></img>
                                                <div className="cart-details"> 
                                                    <h3>{prod.brand} {prod.model}</h3>
                                                    <p className="price">${prod.price}</p>
                                                    <p> <span>{prod.qty}</span> in Cart </p>
                                                    <p>
                                                    Quantity Selected {"\u00a0"}  
                                                        <select className="dropdown-qty" onChange={handleChange}>
                                                            {
                                                                [...Array(10)].map((x, i) =>
                                                                    <option key={i+1} value={i+1}>{i+1}</option>
                                                                )
                                                            }
                                                        </select>
                                                        <div className="controls-cart">
                                                                <button className="cart-button" onClick={() =>addToCart(prod, quantity)}>Update</button>
                                                                <button className="cart-button" onClick={() => deleteItemFromCart(prod)}>Delete From Cart</button>
                                                        </div>
                                                    </p>
                                                    
                                                </div>
                                            </div>
                                    } )}
                                    
                                </div>
                                
                                <div className="total-display">
                                    <h2><p>Total Value of the Cart : ${total} </p></h2>
                                    <button className="checkout-button" onClick={cartCheckOut}>CheckOut</button>
                                </div>

                            </div>
                        )
                    }
            })()}
  
        </div>
    )
};

export default CartPage;