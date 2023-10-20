//how do I get the footer to stay at the bottom of the page?
//https://stackoverflow.com/questions/643879/css-to-make-html-page-footer-stay-at-bottom-of-the-page-with-a-minimum-height-b
import '../../../assets/styles/shared_styles/Footer.css';
import logo from '../../../assets/images/dumble.png';

export default function Footer() {
    const year = new Date().getFullYear()
    return (
        <footer className='row d-flex flex-column footer-container text-white text-center text-lg-start mt-auto z-1 fadein-style'>
            <div className='container p-4'>
                <div className='row mb-4'>
                    <div className='col-lg-6 col-md-12 mb-4 mb-md-0'>
                        <h5 className='text-uppercase'>Footer Content</h5>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque ea quis
                            molestias. Fugiat pariatur maxime quis culpa corporis vitae repudiandae aliquam
                            voluptatem veniam, est atque cumque eum delectus sint!
                        </p>
                    </div>
                    <div className='col-lg-3 col-md-6 mb-4 mb-md-0'>
                        <h5 className='text-uppercase'>Organization</h5>
                        <ul className='list-unstyled mb-0'>
                            <li>
                                <a href='#!' className='footer-link'>Our Program</a>
                            </li>
                            <li>
                                <a href='#!' className='footer-link'>Our Plan</a>
                            </li>
                            <li>
                                <a href='#!' className='footer-link'>Become a member</a>
                            </li>
                        </ul>
                    </div>
                    <div className='col-lg-3 col-md-6 mb-4 mb-md-0'>
                        <h5 className='text-uppercase'>Quick Links</h5>
                        <ul className='list-unstyled mb-0'>
                            <li>
                                <a href='#!' className='footer-link'>About Us</a>
                            </li>
                            <li>
                                <a href='#!' className='footer-link'>Contact Us</a>
                            </li>
                            <li>
                                <a href='#!' className='footer-link'>Support</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='row '>
                    <p className="copyright d-flex justify-content-center">Copyright - {year}. All rights reserved. </p>
                </div>
            </div>
        </footer>
    )
}
