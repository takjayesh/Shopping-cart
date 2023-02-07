import { useEffect, useReducer } from "react";
import reducer, { initialState } from "./context/reducer";
import { fetchChat } from "./services";
import { ACTIONS } from "./constants";
import './Dashboard.css';
import priceDropImage from './s22.jpeg';
import { CartState } from "./context/context";
import ProductPage from "./ProductPage";


function Dashboard({onShowProductCatalog}) {


  const { state, dispatch } = CartState();

  return (
    <div>
      <section className="price-drop">
        <div className="product-container">
          {state.priceDropProducts.map((prod) =>{
            // Product Card
            return <div className="drop-product"> 
                <p className="dummy-text">Just Dropped In</p>
                <h1 className="price-drop-heading">{prod.brand} {prod.model}</h1>
                
                <p className="display-price"><span >${prod.price}</span></p>
                <p><button className="rate-drop-button" onClick={onShowProductCatalog}>Shop Now</button></p>
              </div> 
          })}
        </div>
      </section>

      <section className="intro">
        <div>
          <h1 className="intro-heading">What We Do</h1>
          <p className="padded-multiline"><span>e-shop is a leading shopping specialist providing a platform for people who are style, gadget enthusiastic. Our products go with every ocassion of your life. It can be Birthday, Marraiage, Baby Shower and Funeral </span></p>
        </div>
      </section> 
      <section className="curated-collection">
        <div>
          <h1 className="section-heading">Curated Collection</h1>
        </div>
        <div className="product-container">
          {state.curatedProducts.map((prod) =>{
            return <div className="card"> 
                <img className="prod-image-showcase" src={prod.imageURL}></img>
                <h3>{prod.brand} {prod.model}</h3>
                <p className="price">${prod.price}</p>
                <p><button onClick={onShowProductCatalog}>Shop Now</button></p>
              </div> 
          })}
        </div>
      </section>
      <section className="popular-collection">
        <div>
          <h1 className="section-heading">Popular Collection</h1>
        </div>
        <div className="product-container">
            {state.popularProducts.map((prod) =>{
              return <div className="card"> 
                  <img className="prod-image-showcase" src={prod.imageURL}></img>
                  <h3>{prod.brand} {prod.model}</h3>
                  <p className="price">${prod.price}</p>
                  <p><button onClick={onShowProductCatalog}>Shop Now</button></p>
                </div> 
            })}
          </div>
      </section>
      
    </div>
  );
}

export default Dashboard;
