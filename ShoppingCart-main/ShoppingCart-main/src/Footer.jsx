import './icons.css';

function Footer({loginStatus}){
    return (
        <div className="footer">
            <div className="footer-links">
                <div className="footer-about">
                    <a target="_blank" className='info-link' href='https://www.google.com'>About</a>
                    <a target="_blank" className='info-link' href='https://www.amazon.com/gp/help/customer/display.html/ref=ap_desktop_footer_privacy_notice?ie=UTF8&nodeId=468496'>Privacy Policy</a>
                    <a target="_blank" className='info-link' href='https://www.amazon.com/gp/help/customer/display.html?nodeId=GLSBYFE9MGKKQXXM'>Terms and Conditions</a>
                </div>
                <div className="footer-subscribe">
                    <form>
                        <p>Subscribe to Latest Offers</p>
                        <input className="subscribe-input" type='text' placeholder="Enter E-mail" />
                        <button className='subscribe-button'>&#8594;</button>
                    </form>
                </div>
                <div className="footer-social-media">
                    <p>Social Media</p>
                    <div className='footer-social-media-icons'>
                        <span className='gg-facebook'></span>
                        <span className='gg-instagram'></span>
                        <span className='gg-twitter'></span>
                    </div>
                    
                </div>
            </div>
            <div className="footer-designer">
                &copy; Created by Nithin Bharadwaj 2023
            </div>
        </div>
    );
}

export default Footer;