
export const LOGIN_STATUS = {
  PENDING: 'pending',
  NOT_LOGGED_IN: 'notLoggedIn',
  IS_LOGGED_IN: 'loggedIn',
};


export const SERVER = {
  AUTH_MISSING: 'auth-missing',
  AUTH_INSUFFICIENT: 'auth-insufficient',
  REQUIRED_USERNAME: 'required-username',
  REQUIRED_TASK: 'required-task',
  TASK_MISSING: 'noSuchId', 
};

export const CLIENT = {
  NETWORK_ERROR: 'networkError',
  NO_SESSION: 'noSession',
  UNKNOWN_ACTION: 'unknownAction',
};

export const MESSAGES = {
  [CLIENT.NETWORK_ERROR]: 'Trouble connecting to the network.  Please try again',
  [SERVER.AUTH_INSUFFICIENT]: 'Your username/password combination does not match any records, please try again.',
  [SERVER.REQUIRED_USERNAME]: 'Please enter a valid (letters and/or numbers) username',
  [SERVER.REQUIRED_TASK]: 'Please enter the task to do',
  default: 'Something went wrong.  Please try again',
};


export const ACTIONS = {
  LOG_IN: 'logIn',
  LOG_OUT: 'logOut',
  PENDING : 'pending',
  REPLACE_TODOS: 'replaceTodos',
  DISPLAY_PRODUCT_CATALOG : 'displayProductCatalog',
  DISPLAY_DASHBOARD : 'displayDashboard',
  REPLACE_CART : 'replaceCart',
  REPLCE_WISHLIST : 'replaceWishlist',
  ADD_PRICE_DROP_PRODUCTS : 'priceDropProducts',
  ADD_POPULAR_PRODUCTS : 'addPopularProducts',
  ADD_CURATED_PRODUCTS : 'addCuratedProducts',
  ADD_TO_CART : 'addToCart',
  REMOVE_FROM_CART : 'removeFromCart',
  CHANGE_CART_QTY : 'changeCartQty',
  DISPLAY_PRODUCT : 'displayProduct',
  REPORT_ERROR: 'reportError',
  ADD_TODO: 'addTodo',
};

export const COMPONENT = {
  DASHBOARD : 'dashboard',
  PRODUCT_CATALOG : 'productCatalog',
  CART : 'cart',
  WISH_LIST : 'wishList',
  PRODUCT_PAGE : 'productPage'
}
