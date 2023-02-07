import {
  LOGIN_STATUS,
  CLIENT,
  ACTIONS,
} from '../constants';

export const initialState = {
  cart: [],
  wishlist: [],
  loginStatus: LOGIN_STATUS.PENDING,
  isTodoPending: false,
  username: '',
  error : '',
  lastAddedTodoId: '',
  curatedProducts : [],
  popularProducts : [],
  priceDropProducts : [],
  productCatalog : [],
  productToDisplay : {},
  component : "",
  currentProductPage : 1,
  maxLimit : 1,
  minLimit : 1
};


export function reducer(state, action) {
  switch(action.type) {

    case ACTIONS.LOG_IN: 
      return {
        ...state,
        error: '', 
        loginStatus: LOGIN_STATUS.IS_LOGGED_IN,
        username: action.username,
        component : "dashboard",
        cart : action.cart,
        priceDropProducts : action.priceDropProducts,
        popularProducts : action.popularProducts,
        popularProducts : action.popularProducts
      };

    case ACTIONS.PENDING:
      return {
        ...state,
        error: '', 
        loginStatus: LOGIN_STATUS.PENDING,
      };

    case ACTIONS.DISPLAY_DASHBOARD:
      return {
        ...state,
        error: '',
        component : "dashboard"
      };

    case ACTIONS.DISPLAY_PRODUCT_CATALOG:
      return {
        ...state,
        error : '',
        productCatalog : action.productCatalog,
        maxLimit : action.maxLimit,
        component : "productCatalog"
      };

    case ACTIONS.REPLACE_CART:
      return {
        ...state,
        error: '',
        cart : [...action.cart],
        component : "cart"
      };

    case ACTIONS.DISPLAY_PRODUCT:
      return {
        ...state,
        error : '',
        component : 'productPage',
        productToDisplay : action.productData
      };
    
    case ACTIONS.REPLCE_WISHLIST:
      return {
        ...state,
        error: '',
        wishlist : action.wishlist,
        component : "wishList"
      };

    case ACTIONS.ADD_PRICE_DROP_PRODUCTS:
      return {
        ...state,
        error : '',
        priceDropProducts : action.priceDropProducts
      };
    
    case ACTIONS.ADD_POPULAR_PRODUCTS:
      return {
        ...state,
        error : '',
        popularProducts : action.popularProducts
      };
    
    case ACTIONS.ADD_CURATED_PRODUCTS:
      return {
        ...state,
        error : '',
        curatedProducts : action.curatedProducts
      };
    
    case ACTIONS.ADD_TO_CART:
      console.log("Action inside add to cart : ", action);
        return {
          ...state,
          cart : [
            ...action['fetchCartItem']['cart']
          ]
        };

    case ACTIONS.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((c) => c.id !== action.payload.id)
      };
    
    case ACTIONS.CHANGE_CART_QTY:
      return {
        ...state,
        cart: state.cart.filter((c) =>
          c.id === action.payload.id ? (c.qty = action.payload.qty) : c.qty
        ),
      };

    case ACTIONS.REPLACE_TODOS:
      return {
        ...state,
        error: '',
        isTodoPending: false,
        lastAddedTodoId: '',
      };

    case ACTIONS.LOG_OUT:
      return {
        ...state,
        error: '',
        loginStatus: LOGIN_STATUS.NOT_LOGGED_IN,
        username: '',
        cart : [],
        wishlist : [],
        productCatalog : [],
        curatedProducts : [],
        popularProducts : [],
        priceDropProducts : [],
        component : "LogInScreen"
      };

    case ACTIONS.REPORT_ERROR:
      
      return {
        ...state,
        error: action.error || 'ERROR', 
      };

    case ACTIONS.TOGGLE_TODO:
      return {
        ...state,
        todos: {  
          ...state.todos, 
          [action.todo.id]: action.todo 
        },
      };

    case ACTIONS.DELETE_TODO:
      const todosCopy = { ...state.todos }; 
      delete todosCopy[action.id];
      return {
        ...state,
        todos: todosCopy,
      };

    case ACTIONS.ADD_TODO:
      return {
        ...state,
        userChat : action.todo
      };

    default:
      throw new Error({ error: CLIENT.UNKNOWN_ACTION, detail: action }); 
  }
}

export default reducer;
