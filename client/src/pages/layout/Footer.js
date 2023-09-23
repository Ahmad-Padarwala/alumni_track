import React from 'react'
import '../../assets/css/Footer.css';
import {NavLink} from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <footer className='footer_main'>
              

                <footer class=" text-white py-5">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-2 col-6">
                            <img className="footer_logo" src={require('../../assets/image/Logo.png')} width='100px' />
                            </div>
                            <div class="col-lg-3 col-6 ps-5">
                                <h4><b>Features</b></h4>
                                <ul class="list-unstyled footer_text ">
                                    <li>
                                        <NavLink to='/' className="text-muted" ><i class="fa-solid fa-caret-right"></i><span className='ms-2 footer_links'> Cool stuff </span></NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/' className="text-muted" ><i class="fa-solid fa-caret-right"></i> <span className='ms-2  footer_links'> Cool stuff </span></NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/' className="text-muted" ><i class="fa-solid fa-caret-right"></i> <span className='ms-2 footer_links'> Cool stuff </span></NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/' className="text-muted" ><i class="fa-solid fa-caret-right"></i> <span className='ms-2 footer_links'> Cool stuff </span></NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/' className="text-muted" ><i class="fa-solid fa-caret-right"></i> <span className='ms-2 footer_links'> Cool stuff </span></NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/' className="text-muted" ><i class="fa-solid fa-caret-right"></i> <span className='ms-2 footer_links'> Cool stuff </span></NavLink>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-lg-3 col-6 ps-5">
                                <h4><b>Resources</b></h4>
                                <ul class="list-unstyled footer_text">
                                    <li>
                                        <NavLink to='/' className="text-muted" ><i class="fa-solid fa-caret-right"></i><span className='ms-2 footer_links'> Cool stuff </span></NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/' className="text-muted" ><i class="fa-solid fa-caret-right"></i><span className='ms-2 footer_links'> Cool stuff </span></NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/' className="text-muted" ><i class="fa-solid fa-caret-right"></i><span className='ms-2 footer_links'> Cool stuff </span> </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/' className="text-muted" ><i class="fa-solid fa-caret-right"></i><span className='ms-2 footer_links'> Cool stuff </span></NavLink>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-lg-3 col-6 ps-5">
                                <h4><b>Contact</b></h4>
                                <ul class="list-unstyled footer_text">
                                    <li>
                                        <NavLink to='/' className="text-muted" ><i class="fa-solid fa-caret-right"></i><span className='ms-2 footer_links'> Cool stuff </span> </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/' className="text-muted" ><i class="fa-solid fa-caret-right"></i><span className='ms-2 footer_links'> Cool stuff </span> </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/' className="text-muted" ><i class="fa-solid fa-caret-right"></i><span className='ms-2 footer_links'> Cool stuff </span> </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/' className="text-muted" ><i class="fa-solid fa-caret-right"></i><span className='ms-2 footer_links'> Cool stuff </span> </NavLink>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </footer>

            </footer>
        </>
    )
}

export default Footer
