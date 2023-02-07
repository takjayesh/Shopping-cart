import { useEffect, useState, useReducer } from 'react';

import './App.css';
import './icons.css';

import reducer, { initialState } from './context/reducer';
import {
  LOGIN_STATUS,
  CLIENT,
  SERVER,
  ACTIONS,
  COMPONENT
} from './constants';
import {
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchCart,
  fetchWishList,
  fetchProductCatalog,
  fetchAddProductToCart,
  fetchUpdateCart,
  fetchDeleteProductFromCart,
  fetchProductInfo,
  fetchCheckOut
} from './services';

import LoginForm from './LoginForm';
import Loading from './Loading';
import Status from './Status';
import Dashboard from './Dashboard';
import Footer from './Footer';
import Header from './Header';
import { CartState } from "./context/context";
import ProductPage from './ProductPage';
import ProductCatalog from './ProductCatalog';
import CartPage from './CartPage';
import WishListPage from './WishListPage';
import Dialog from './Dialog';

function App() {

  const {state, dispatch}  = CartState();

  const [dialog, setDialog] = useState({show : false, content : "CheckOut Successful"});

  function onLogin( username ) {
    fetchLogin(username)
    .then( fetchData => {
      dispatch({ type: ACTIONS.PENDING});
      setTimeout(() => {
        console.log("Got Data from fetch LOGIN : ", fetchData)
        dispatch({ type: ACTIONS.LOG_IN, username , cart : fetchData.cart });
        dispatch({ type : ACTIONS.ADD_PRICE_DROP_PRODUCTS, priceDropProducts : fetchData.priceDropProducts.products });
        dispatch({ type : ACTIONS.ADD_CURATED_PRODUCTS, curatedProducts : fetchData.curatedProducts.products });
        dispatch({ type : ACTIONS.ADD_POPULAR_PRODUCTS , popularProducts : fetchData.popularProducts.products });
      }, 1500);
    })
    .catch( err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }

  function onLogout() {
    dispatch({ type: ACTIONS.PENDING});
    setTimeout(() => {
      dispatch({ type: ACTIONS.LOG_OUT });
      fetchLogout()
      .catch( err => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
      });
    }, 1500);
  }

  function onShowDashboard(){
    dispatch({ type: ACTIONS.DISPLAY_DASHBOARD });
  }

  function onShowProductCatalog(){
    fetchProductCatalog(state.currentProductPage,3)
    .then( fetchedTodos => {
      dispatch({ type: ACTIONS.DISPLAY_PRODUCT_CATALOG, productCatalog : fetchedTodos.products, maxLimit : fetchedTodos.maxLimit });
    })
    .catch( err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }

  function onShowCartPage(){
    fetchCart()
    .then( fetchedCartItems => {
      if( !fetchedCartItems['cart']['productsInCart']){
        dispatch({ type : ACTIONS.REPLACE_CART, cart : fetchedCartItems['cart'] });
      }
      else{
        dispatch({ type : ACTIONS.REPLACE_CART, cart : fetchedCartItems['cart']['productsInCart'] });
      }
    })
    .catch( err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }

  function addToCart(selectedProduct, quantity){
    const foundIndex = state.cart.findIndex(el => el.id === selectedProduct.id);
    if(foundIndex !== -1){
      fetchUpdateCart(selectedProduct.id, Number(quantity))
      .then( fetchCartItem => {
        dispatch({type : ACTIONS.ADD_TO_CART, fetchCartItem })
      })
    }
    else{
      fetchAddProductToCart(selectedProduct.id, Number(quantity))
      .then( fetchCartItem => {
        dispatch({type : ACTIONS.ADD_TO_CART, fetchCartItem })
      })
    }   
  }

  function deleteItemFromCart(selectedProduct){
    fetchDeleteProductFromCart(selectedProduct.id)
    .then( fetchedCartItems => {
      if( !fetchedCartItems['cart']['productsInCart']){
        dispatch({ type : ACTIONS.REPLACE_CART, cart : fetchedCartItems['cart'] });
      }
      else{
        dispatch({ type : ACTIONS.REPLACE_CART, cart : fetchedCartItems['cart']['productsInCart'] });
      }
    })
    .catch( err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });

  }

  function displaySingleProduct(productId){
    fetchProductInfo(productId)
    .then(fetchedData => {
      dispatch({ type : ACTIONS.DISPLAY_PRODUCT , productData : fetchedData["products"][0]})
    })
    .catch( err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });

  }

  function cartCheckOut(){

    fetchCheckOut()
    .then( fetchedCartItems => {
      if( !fetchedCartItems['cart']['productsInCart']){
        dispatch({ type : ACTIONS.REPLACE_CART, cart : fetchedCartItems['cart'] });
      }
      else{
        dispatch({ type : ACTIONS.REPLACE_CART, cart : fetchedCartItems['cart']['productsInCart'] });
      }
    });

    setDialog({content : "CheckOut Successful", show: true});
    
  }


  function checkForSession() {
    console.log("Inside check  for session");
    fetchSession()
    .then( session => {
      dispatch({ type: ACTIONS.LOG_IN, username : session.username });
      dispatch({ type : ACTIONS.REPLACE_CART, session })
    })
    .catch( err => {
      if( err?.error === SERVER.AUTH_MISSING ) {
        return Promise.reject({ error: CLIENT.NO_SESSION }) 
      }
      return Promise.reject(err); 
    })
    .catch( err => {
      if( err?.error === CLIENT.NO_SESSION ) { 
        dispatch({ type: ACTIONS.LOG_OUT });
        
        return;
      }
      
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }

 
  useEffect(
    () => {
      checkForSession();
    },
    [] 
  );


  return (
     <div>
        <Dialog
          show={dialog.show}
          onClose={() => setDialog({ ...dialog, show: false })}
          content={dialog.content}
        />
      <div className="app">
        { state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN && <Header onLogout={onLogout} 
                            onShowCartPage={onShowCartPage} onShowDashboard={onShowDashboard}
                            onShowProductCatalog={onShowProductCatalog} /> }
          <div className="app-content">
            { state.loginStatus === LOGIN_STATUS.PENDING && <Loading className="gg-spinner" ></Loading> }
            { state.loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <LoginForm onLogin={onLogin}/>  }
            { state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN && state.component === COMPONENT.DASHBOARD && 
            (
              <Dashboard onShowProductCatalog={onShowProductCatalog} />            
            )}
            { state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN && state.component === COMPONENT.CART && 
            (
              <CartPage deleteItemFromCart={deleteItemFromCart} addToCart={addToCart} cartCheckOut={cartCheckOut}></CartPage>          
            )}
            
            { state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN && state.component === COMPONENT.PRODUCT_PAGE && 
            (
              <ProductPage addToCart={addToCart}></ProductPage>         
            )}
            { state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN && state.component === COMPONENT.PRODUCT_CATALOG && 
            (
              <ProductCatalog addToCart={addToCart} displaySingleProduct={displaySingleProduct} setDialog={setDialog}></ProductCatalog>      
            )}
            { state.error && <Status error={state.error}/> }
          </div>
        { state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN && <Footer loginStatus={state.loginStatus} />  }
      </div>
    </div>
  );
}

export default App;
