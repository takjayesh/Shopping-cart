import { createContext, useContext, useReducer } from 'react';
import { productCatalog, curatedColletion, 
    heavyPriceDropProducts,popularCollection } from './products';
import { reducer, initialState } from './reducer';
    

const Cart = createContext();

const Context = ({ children }) => {

    const productCatalogData = productCatalog['products'];
    
    
    const [state, dispatch] = useReducer(reducer, initialState);
    // state['productCatalog'] = productCatalogData;
    // state['curatedProducts'] = curatedColletion['products'];
    // state['priceDropProducts'] = heavyPriceDropProducts['products'];
    // state['popularProducts'] = popularCollection['products'];
    return <Cart.Provider value={{ state, dispatch }}>{children}</Cart.Provider>
};

export default Context;

export const CartState = () => {
    return useContext(Cart);
};