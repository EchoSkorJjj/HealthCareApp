//how do I get the footer to stay at the bottom of the page?
//https://stackoverflow.com/questions/643879/css-to-make-html-page-footer-stay-at-bottom-of-the-page-with-a-minimum-height-b
import '../../../assets/styles/shared_styles/Footer.css';
import logo from '../../../assets/images/dumble.png';


export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-section">
                    <h5>Footer Content</h5>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste atque ea quis molestias.</p>
                </div>
                <div className="footer-section">
                    <h5>Organization</h5>
                    <ul>
                        <li><a href="#">Our Program</a></li>
                        <li><a href="#">Our Plan</a></li>
                        <li><a href="#">Become a Member</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h5>Quick Links</h5>
                    <ul>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Support</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>Copyright - {year}. All rights reserved.</p>
            </div>
        </footer>
    );
}
