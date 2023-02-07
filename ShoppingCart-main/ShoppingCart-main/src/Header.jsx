import logo from './logo.jpg';
import './icons.css';
import './App.css';
import { CartState } from "./context/context";

function Header({onLogout , onShowCartPage, onShowDashboard, onShowProductCatalog}){
    const { state } = CartState();
    const itemsInCart = state.cart.length;

    return (
        <div className="top-nav">
            <div className='logo'>
                <img className='home-icon' src={logo} alt='e-shop'></img>

            </div>
                <button className='header-buttons' onClick={onShowDashboard}>Home</button>
                <button className='header-buttons' onClick={onShowProductCatalog}>Shop Products</button>
            <ul className='navbar-item-list'>
                
                <li className='option'><button className='header-buttons' onClick={onShowCartPage}>Cart({itemsInCart})</button></li>
                <button onClick={onLogout} className="btn-ctrl-logout">Logout</button>
            </ul>
        </div>
    );
}

export default Header;