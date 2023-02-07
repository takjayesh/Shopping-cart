import { CartState } from "./context/context";
import { useState } from 'react';
import './Dashboard.css';
import { fetchProductCatalog } from "./services";
import {ACTIONS} from './constants';

function ProductCatalog({addToCart, displaySingleProduct, setDialog}){
    const {state, dispatch}  = CartState();
    const [quantity, setquantity] = useState(1);

    const limit = 3;
    
    function getNewPageDetails(event){
      if(state.currentProductPage < state.maxLimit){
        state.currentProductPage = state.currentProductPage + 1;
        fetchProductCatalog(state.currentProductPage, limit)
        .then( fetchedTodos => {
            dispatch({ type: ACTIONS.DISPLAY_PRODUCT_CATALOG, productCatalog : fetchedTodos.products, maxLimit : fetchedTodos.maxLimit });
          })
          .catch( err => {
            dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
        });
      }else{
        setDialog({show : true, content : 'Reached End of the catalog'});
      }
    }

    function getPreviousPageDetails(event){
      if(state.currentProductPage > state.minLimit){
        state.currentProductPage = state.currentProductPage - 1;
        fetchProductCatalog(state.currentProductPage, limit)
        .then( fetchedTodos => {
            dispatch({ type: ACTIONS.DISPLAY_PRODUCT_CATALOG, productCatalog : fetchedTodos.products, maxLimit : fetchedTodos.maxLimit });
          })
          .catch( err => {
            dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
        });
      }else{
        setDialog({show : true, content : 'Reached Start of the catalog'});
      }
    }
    

    const handleChange = (e) => {
      setquantity(e.target.value);
    };

    return (
      <div>
        <div className="catalog-content">
            <p className="product-catalog-heading">RESULTS</p>
            <p className="product-catalog-text">Price and other details may vary based on seller input</p>

        </div>
        
        <div className="product-container">
            {state.productCatalog.map((prod) =>{
            // Product Card
            return <div className="card" key={prod.id}> 
                        <img className="prod-image-showcase" src={prod.imageURL} onClick={() => displaySingleProduct(prod.id)}></img>
                        <h3>{prod.brand} {prod.model}</h3>
                        <p className="price">Price : ${prod.price}</p>
                            {(() => {
                                if (state.cart.length === 0) {
                                  return (
                                    <div> 0 in Cart</div>
                                  )
                                } else {
                                  const filteredItem = state.cart.filter(item => item.id === prod.id);                              
                                  if(filteredItem.length === 0){
                                    return (
                                      <div> 0 in Cart</div>
                                    )
                                  }else{
                                    return (
                                      <div> {filteredItem[0].qty} in Cart </div>
                                    )
                                  }
                                }
                              })()}
                        <p>Quantity Selected {"\u00a0"} 
                            <select className="dropdown-qty" onChange={handleChange}>
                            {
                              [...Array(10)].map((x, i) =>
                                <option key={i+1} value={i+1}>{i+1}</option>
                              )
                            }
                            </select>
                        </p>
                        <p><button onClick={() =>addToCart(prod, quantity)}>Add To Cart</button></p>
                    </div> 
                })}
        </div>
        
        <div className="pagination">
              <span> 
                <button className="pagination-button" onClick={getPreviousPageDetails}>Back</button> 
                  Page <span className="page-number">{state.currentProductPage}</span>
                <button className="pagination-button" onClick={getNewPageDetails}>Next</button>
              </span>
        </div> 
        
    </div>
  );

}

export default ProductCatalog;