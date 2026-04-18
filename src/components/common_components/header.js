"use client"
import React, { useEffect, useState, useContext } from 'react'
import { toast } from 'react-toastify'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import profile from '../../assets/icons/profile.png'
import checkout from '../../assets/icons/checkout.png'
import watchlist from '../../assets/icons/watchlist.png'
import search from '../../assets/icons/search.png'
import Weaver_logo from '../../assets/logo/weaver-logo-transparent.png'
import saleoffer from '../../assets/images/saleoffer/saleoffer.jpg'
import clothoffer from '../../assets/images/saleoffer/clothoffer.jpg'

import arrowhead from '../../assets/icons/icons8-double-right-10.png'
import setting from '../../assets/icons/icons8-setting-25.png'
import verifieduser from '../../assets/icons/icons8-verified-18.png'

import { Mens, Womens, Kids, HomeLiving } from '../navsublist'
import { GlobalContext } from '@/context/GlobalContext'

export default function Header() {

    const router = useRouter();
    const { globalValue, setGlobalValue, allProducts } = useContext(GlobalContext);

    // HOVER STATES
    const [hover, setHover] = useState('');
    const [current_hover, setCurrenthover] = useState('');

    // MOBILE MENU
    const [active_hem, setActive_hem] = useState(false);
    const [slide_flag, setSlide_flag] = useState(false);
    const [list_visible, setList_visible] = useState('');

    // SEARCH
    const [search_product, setSearch_product] = useState('');

    // TYPING ANIMATION PLACEHOLDER
    const [text, setText] = useState('');
    const [index, setIndex] = useState(0);
    const name = 'Search for products, brands and many more';

    // SEARCH FUNCTION
    const searchProduct = (keyword) => {
        setSearch_product(keyword);

        if (!keyword.trim()) {
            setGlobalValue(allProducts);
            return;
        }

        const filtered = allProducts.filter((item) => {
            const product = item.subWearCategory?.[0]?.product?.[0];
            return product?.name?.toLowerCase().includes(keyword.toLowerCase()) ||
                   product?.description?.toLowerCase().includes(keyword.toLowerCase());
        });

        setGlobalValue(filtered);
    };

    // DESKTOP HOVER FUNCTIONS
    const mouseHover = (block) => setHover(block);
    const leave = () => setHover('');
    const currenthover = (block) => setCurrenthover(block);
    const currentleave = () => setCurrenthover('');

    // MOBILE MENU TOGGLE
    const handleHamburg = () => {
        setActive_hem(!active_hem);
        slidein_out();
    };

    const slidein_out = () => {
        const sidein_out = document.getElementById('sidein_out');
        if (slide_flag) {
            sidein_out.style.transform = 'translateX(0)';
        } else {
            sidein_out.style.transform = 'translateX(-100%)';
        }
        setSlide_flag(!slide_flag);
    };

    // MOBILE MENU VISIBILITY
    const setvisible = (ele) => {
        const test = document.getElementById(ele);
        const style = window.getComputedStyle(test);
        const displayValue = style.display;

        if (list_visible === ele) {
            if (displayValue === 'none' || displayValue === '') {
                test.classList.remove('d-none');
                test.classList.add('d-block');
            } else {
                test.classList.remove('d-block');
                test.classList.add('d-none');
            }
        } else {
            setList_visible(ele);
            test.classList.remove('d-none');
            test.classList.add('d-block');
        }
    };

    // ROUTES
    const watchlist_card = () => router.push("/watchlist");
    const checkoutbtn = () => router.push("/checkout");
    const orderStatus = () => router.push("/OrderStatus");
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("weaver_email");
        localStorage.removeItem("weaver_name");
        localStorage.removeItem("weaver_profile");

        toast.success("Logged out successfully!");
        router.push("/login");
    };

    // TYPING ANIMATION
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (index < name.length) {
                setText(name.substring(0, index + 1));
                setIndex(index + 1);
            } else {
                clearInterval(intervalId);
            }
        }, 100);

        return () => clearInterval(intervalId);
    }, [index, name]);

    useEffect(() => {
        slidein_out(); // initial mobile menu hidden
    }, []);

    return (
        <>
            {/* DESKTOP HEADER */}
            <div className='container-fluid p-0 m-0 shadow d-lg-flex justify-content-between d-none fixed-top bg-light'>
                <div className='d-flex'>
                    <div className='m-2' onClick={handleLogout}>
                        <Image className='logo' src={Weaver_logo} alt='logo'></Image>
                    </div>

                    <ul className='list-unstyled d-flex m-2 p-2 fs-6'>
                        <li className='ps-lg-4 ps-3 cpointer' onMouseOver={() => mouseHover('Men')} onMouseLeave={leave}>Men</li>
                        <li className='ps-lg-4 ps-3 cpointer' onMouseOver={() => mouseHover('Women')} onMouseLeave={leave}>Women</li>
                        <li className='ps-lg-4 ps-3 cpointer' onMouseOver={() => mouseHover('Kids')} onMouseLeave={leave}>Kids</li>
                        <li className='ps-lg-4 ps-3 cpointer' onMouseOver={() => mouseHover('HomeLiving')} onMouseLeave={leave}>Home & Living</li>
                        <li className='ps-lg-4 ps-3 cpointer' onMouseOver={() => mouseHover('Accessories')} onMouseLeave={leave}>Accessories</li>
                    </ul>
                </div>

                {/* SEARCH BAR */}
                <div className='d-flex'>
                    <div className='my-2 mx-4 d-flex flex-row align-items-center light_grey px-2'>
                        <Image src={search} alt='search' className='logo_mini mx-2'></Image>
                        <input
                            type='text'
                            placeholder='Search for products, brands and more'
                            className='w-100 light_grey font_mini p-1 mx-auto input_hover'
                            value={search_product}
                            onChange={(e) => searchProduct(e.target.value)}
                        />
                    </div>

                    {/* ICONS */}
                    <div className='my-2 mx-4 d-flex font_mini'>
                        <div className='d-flex flex-column mx-2 cpointer' onClick={orderStatus}>
                            <Image src={localStorage.getItem("weaver_profile")||profile} width={20} height={20} style={{ borderRadius: "50%" }} alt='profile' className='logo_mini mx-auto' />
                            <p className='m-0 text-center text-primary'>
                                {localStorage.getItem("weaver_name") || "User"}
                            </p>
                        </div>
                        <div className='d-flex flex-column mx-2 cpointer' onClick={watchlist_card}>
                            <Image src={watchlist} alt='watchlist' className='logo_mini mx-auto' />
                            <p className='m-0 text-center'>Watchlist</p>
                        </div>
                        <div className='d-flex flex-column mx-2 cpointer' onClick={checkoutbtn}>
                            <Image src={checkout} alt='checkout' className='logo_mini mx-auto' />
                            <p className='m-0 text-center'>Checkout</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* HOVER MENUS DESKTOP */}
            {hover === "Men" || current_hover === "Men" ? 
                <div onMouseOver={() => currenthover("Men")} onMouseLeave={currentleave}><Mens /></div> 
            : null}
            {hover === "Women" || current_hover === "Women" ? 
                <div onMouseOver={() => currenthover("Women")} onMouseLeave={currentleave}><Womens /></div> 
            : null}
            {hover === "Kids" || current_hover === "Kids" ? 
                <div onMouseOver={() => currenthover("Kids")} onMouseLeave={currentleave}><Kids /></div> 
            : null}
            {hover === "HomeLiving" || current_hover === "HomeLiving" ? 
                <div onMouseOver={() => currenthover("HomeLiving")} onMouseLeave={currentleave}><HomeLiving /></div> 
            : null}
            {hover === "Accessories" || current_hover === "Accessories" ? 
                <div onMouseOver={() => currenthover("Accessories")} onMouseLeave={currentleave}><HomeLiving /></div> 
            : null}

            {/* MOBILE HEADER */}
            <div className='container-fluid px-3 py-2 m-0 shadow d-lg-none justify-content-between d-flex fixed-top bg-light'>
                <div className='d-flex'>
                    <div className={`hamburgmenu cpointer ${active_hem ? 'hem_active' : ''}`} onClick={handleHamburg}>
                        <div className='h_line h_line1'></div>
                        <div className='h_line h_line2'></div>
                        <div className='h_line h_line3'></div>
                    </div>
                    <div className='hamburg_logo hamburgmenu mx-2'>
                        <Image className='img-fluid' src={Weaver_logo} alt='logo'></Image>
                    </div>
                </div>

                <div className='d-flex mx-1 font_mini'>
                    <div className='d-flex flex-column mx-2 cpointer' onClick={watchlist_card}>
                        <Image src={watchlist} alt='watchlist' className='logo_mini mx-auto' />
                        <p className='m-0 text-center'>Watchlist</p>
                    </div>
                    <div className='d-flex flex-column mx-2 cpointer' onClick={checkoutbtn}>
                        <Image src={checkout} alt='checkout' className='logo_mini mx-auto' />
                        <p className='m-0 text-center'>Checkout</p>
                    </div>
                </div>
            </div>

            {/* MOBILE SEARCH BAR */}
            <div className='container-fluid px-3 py-1 my-2 shadow m-0 bg-light d-lg-none justify-content-start align-items-center d-flex rounded-5 '>
                <Image src={search} alt='search' className='logo_mini mx-2'></Image>
                <input
                    type='text'
                    placeholder={text}
                    className='w-100 font_mini p-1 mx-auto input_hover'
                    value={search_product}
                    onChange={(e) => searchProduct(e.target.value)}
                />
            </div>

            {/* SLIDE-IN MOBILE MENU */}
            <div className='z-3 container-fluid col-sm-4 col-12 bg-white position-absolute d-block d-lg-none p-0 slidein_out' id='sidein_out'>
                <div className='col-12'>
                    <Image src={saleoffer} alt='saleoffer' className='w-100' />
                </div>
                <div className='w-100 p-2'>
                    <Image src={localStorage.getItem("weaver_profile")||profile} width={20} height={20} alt='profile' style={{ borderRadius: "50%" }} className=' mx-auto'></Image>
                    <a href='/'>
                        <Image src={setting} alt='setting' className='float-end'></Image>
                    </a>
                    <div className='d-block'>
                        <p className='fw-bold d-inline-block'>{localStorage.getItem("weaver_name")}</p>
                        <Image src={verifieduser} alt='verify' className='m-1'></Image>
                    </div>
                </div>

                {/* MOBILE CATEGORY LIST */}
                <div className='m-0 p-2 light_pink' id='superlist'>
                    <ol className='list-unstyled cpointer'>
                        <li><a onClick={() => setvisible('men')}>Mens <span className='text-end'><Image src={arrowhead} alt='arrowhead'/></span></a>
                            <ol className='list-unstyled ps-4 d-none' id='men'>
                                <li><a onClick={() => setvisible('men_tw')}>TopWear <span className='text-end'><Image src={arrowhead} alt='arrowhead'/></span></a>
                                    <ol className='list-unstyled ps-4 fst-italic d-none' id='men_tw'>
                                        <li>T-Shirt</li>
                                        <li>Casual Shirts</li>
                                        <li>Formal Shirts</li>
                                        <li>Sweatshirts</li>
                                        <li>Sweaters</li>
                                        <li>Jackets</li>
                                        <li>Blazer & Coats</li>
                                        <li>Suits</li>
                                        <li>Rain jackets</li>
                                    </ol>
                                </li>
                                <li><a onClick={() => setvisible('men_bw')}>BottomWear <span className='text-end'><Image src={arrowhead} alt='arrowhead'/></span></a>
                                    <ol className='list-unstyled ps-4 fst-italic d-none' id='men_bw'>
                                        <li>Jeans</li>
                                        <li>Casual Trousers</li>
                                        <li>Formal Trousers</li>
                                        <li>Shorts</li>
                                        <li>Track Pants & Joggers</li>
                                    </ol>
                                </li>
                                <li><a onClick={() => setvisible('men_fw')}>FootWear <span className='text-end'><Image src={arrowhead} alt='arrowhead'/></span></a>
                                    <ol className='list-unstyled ps-4 fst-italic d-none' id='men_fw'>
                                        <li>Casual Shoes</li>
                                        <li>Sports Shoes</li>
                                        <li>Formal Shoes</li>
                                        <li>Sneakers</li>
                                        <li>Sandals and Floaters</li>
                                        <li>Flip and Flops</li>
                                        <li>Socks</li>
                                    </ol>
                                </li>
                                <li><a onClick={() => setvisible('men_iw')}>InnerWear & SleepWear <span className='text-end'><Image src={arrowhead} alt='arrowhead'/></span></a>
                                    <ol className='list-unstyled ps-4 fst-italic d-none' id='men_iw'>
                                        <li>Briefs and Trunks</li>
                                        <li>Boxers</li>
                                        <li>Vests</li>
                                        <li>Sleepwear & Loungewear</li>
                                        <li>Thermals</li>
                                    </ol>
                                </li>
                            </ol>
                        </li>
                        {/* Similar structure for Women, Kids, HomeLiving, Accessories */}
                    </ol>
                </div>

                <div className='col-12'>
                    <Image src={clothoffer} alt='saleoffer' className='w-100' />
                </div>
            </div>
        </>
    )
}
