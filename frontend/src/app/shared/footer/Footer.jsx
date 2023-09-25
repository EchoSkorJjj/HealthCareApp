//how do I get the footer to stay at the bottom of the page?
//https://stackoverflow.com/questions/643879/css-to-make-html-page-footer-stay-at-bottom-of-the-page-with-a-minimum-height-b

export default function Footer() {
    return (
        <footer className='container d-flex flex-column bg-body-tertiary text-center text-lg-start mt-auto '>
            <div className='container p-4'>
                <div className='row'>
                    <div className='col-lg-6 col-md-12 mb-4 mb-md-0'>
                        <h5 className='text-uppercase'>Footer Content</h5>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque ea quis
                            molestias. Fugiat pariatur maxime quis culpa corporis vitae repudiandae aliquam
                            voluptatem veniam, est atque cumque eum delectus sint!
                        </p>
                    </div>
                    <div className='col-lg-3 col-md-6 mb-4 mb-md-0'>
                        <h5 className='text-uppercase'>Links</h5>
                        <ul className='list-unstyled mb-0'>
                            <li>
                                <a href='#!' className='text-dark'>Link 1</a>
                            </li>
                            <li>
                                <a href='#!' className='text-dark'>Link 2</a>
                            </li>
                            <li>
                                <a href='#!' className='text-dark'>Link 3</a>
                            </li>
                            <li>
                                <a href='#!' className='text-dark'>Link 4</a>
                            </li>
                        </ul>
                    </div>
                    <div className='col-lg-3 col-md-6 mb-4 mb-md-0'>
                        <h5 className='text-uppercase mb-0'>Links</h5>
                        <ul className='list-unstyled'>
                            <li>
                                <a href='#!' className='text-dark'>Link 1</a>
                            </li>
                            <li>
                                <a href='#!' className='text-dark'>Link 2</a>
                            </li>
                            <li>
                                <a href='#!' className='text-dark'>Link 3</a>
                            </li>
                            <li>
                                <a href='#!' className='text-dark'>Link 4</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='text-center p-3 row' style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
                <a className='text-dark' href='https://mdbootstrap.com/'>MDBootstrap.com</a>
            </div>
        </footer>
    )
}
