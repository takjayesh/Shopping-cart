const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const cart = require('./cart');
const sessions = require('./sessions');
const users = require('./users');
const productInfo = require('./products');


app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json());

app.get('/api/v1/hello', (req, res) => {
  res.send('Hello World!');
});

// Sessions
app.get('/api/v1/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json({ username,  
    cart : users.getUserData(username).getCartData(username)
  });
});

app.post('/api/v1/session', (req, res) => {
  const { username } = req.body;
  
  if(!users.isValid(username)) {
    res.status(400).json({ error: 'required-username' });
    return;
  }

  if(username === 'dog') {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }

  const sid = sessions.addSession(username);
  
  const existingUserData = users.getUserData(username);
  if(!existingUserData) {
    users.addUserData(username, cart.makeCartList());
  }

  res.clearCookie('sid');
  res.cookie('sid', sid);
  
  users.getUserData(username).getCartData(username);
  res.json({ cart : users.getUserData(username).getCartData(username),
              priceDropProducts : productInfo['heavyPriceDropProducts'],
              curatedProducts : productInfo['curatedColletion'],
              popularProducts : productInfo['popularCollection']
            });
});

app.delete('/api/v1/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(sid) {
    res.clearCookie('sid');
  }

  if(username) {
    sessions.deleteSession(sid);
  }

  res.json({ username });
});


// Product related API's
// GET is Paginated
app.get('/api/v1/product', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const {page, limit} = req.query;
  const startIndex = (Number(page) - 1) * Number(limit);
  const endIndex = Number(startIndex) + Number(limit);
  
  const maxLimit = productInfo['productCatalog']["products"].length / Number(limit) ;
  
  const paginatedResult = productInfo['productCatalog']["products"].slice(startIndex, endIndex);
  res.json({"products" : paginatedResult, maxLimit});
});


//Filtering for specific product-id
app.get('/api/v1/product/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { id } = req.params;
  const filteredProduct = productInfo['productCatalog']["products"].filter(x => x.id === id);
  res.json({"products" :filteredProduct});
});

// Heavy price drop product API
app.get('/api/v1/price-drop-products', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json(productInfo['heavyPriceDropProducts']);
});

//Curated products API
app.get('/api/v1/curated-products', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  res.json(productInfo['curatedColletion']);
});

//Popular Collection products API
app.get('/api/v1/popular-products', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json(productInfo['popularCollection']);
});


// Cart Related API's

app.get('/api/v1/cart', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  
  res.json({cart : users.getUserData(username).getCartData(username)});
});

app.post('/api/v1/cart', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { productId, qty } = req.body;
 
  const selectedProduct = productInfo["productCatalog"]["products"].filter(x => x.id === productId)[0]; 
  users.getUserData(username).addProductToCart({username, selectedProduct, qty})
  
  res.json({cart : users.getUserData(username).getCartData(username)});
});

app.patch('/api/v1/cart/:productId', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { productId } = req.params;
  const { qty } = req.body;
  users.getUserData(username).updateProductInCart({username, productId, qty});
  
  res.json({cart : users.getUserData(username).getCartData(username)});
});

app.delete('/api/v1/cart/:productId', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { productId } = req.params;
  users.getUserData(username).deleteProductInCart({username, productId});
 
  res.json({cart : users.getUserData(username).getCartData(username)});
});

app.delete('/api/v1/checkout', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  
  users.getUserData(username).checkOut(username);
  
  res.json({cart : users.getUserData(username).getCartData(username)});
});


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
