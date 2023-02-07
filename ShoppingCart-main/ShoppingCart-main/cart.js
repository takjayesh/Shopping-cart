const cartData = { 
   
  };

function makeCartList() {

  const cartList = {};

  cartList.getCartData = function getCartData(username){
    if(!cartData[username]){
      return cartData[username] = { 'productsInCart' : [] }
    }
    return cartData[username]['productsInCart'];
  }

  cartList.addProductToCart = function addProductToCart({username, selectedProduct, qty}) {
    
    if(!cartData[username]){
      cartData[username] = { 'productsInCart' : [] };
    }
      cartData[username]['productsInCart'].push(Object.assign(selectedProduct, { qty: qty}));
  };

  cartList.updateProductInCart = function updateProductInCart({username, productId, qty}){
    const itemIndex = cartData[username]['productsInCart'].findIndex(x => x.id == productId)

    
    cartData[username]['productsInCart'][itemIndex]["qty"] = qty;
    
  };

  cartList.deleteProductInCart = function deleteProductInCart({username, productId}){
    
    cartData[username]["productsInCart"] = cartData[username]["productsInCart"].filter(prod => prod.id !== productId);
  }

  cartList.checkOut = function checkOut(username){
    
    cartData[username] = { 'productsInCart' : [] }
  }

  
  cartList.showAllCartData = function showAllCartData(){
    return cartData;
  }
  
  return cartList;
};

module.exports = {
  makeCartList,
};