"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import '../../src/css/header_footer.css'

import { useContext } from 'react'
import { GlobalContext } from '@/context/GlobalContext'

export const Mens = () => {
    const router = useRouter();


    const { globalValue, setGlobalValue } = useContext(GlobalContext);

    async function searchProduct(gender, name) {
    const res = await fetch('/product.json');
    const data = await res.json();

    const filter = data.filter(item => 
        item.category === gender &&
        item.subWearCategory?.some(sub => sub.name === name)
    );

    setGlobalValue(filter);
    router.push("/product_category");
}

    // useEffect(() => {
    //     console.log("GlobalValue", globalValue);

    // },[globalValue])

    return (
        <div className='container-fluid w-100 bg-light position-absolute sublist_center zindex'>
            <div className='container row row-cols-5 flex-nowrap px-5'>
                <div className='col-3 m-2 p-2  border border-1 border-end-0 border-start-0 border-top-0 border-solid border_grey'>
                    <ol className='list-unstyled font_mini '>
                        <li className='fw-bold mb-2 text-warning'>Topwear</li>
                        <li onClick={() => { searchProduct("Men","Tshirt") }}>T-Shirt</li>
                        <li onClick={() => { searchProduct("Men","Casualshirt") }}>Casual Shirts</li>
                        <li onClick={() => { searchProduct("Men","Formalshirt") }}>Formal Shirts</li>
                        <li onClick={() => { searchProduct("Men","Sweaters") }}>Sweatshirts</li>
                        <li onClick={() => { searchProduct("Men","Sweaters") }}>Sweaters</li>
                        <li >Jackets</li>
                        <li>Blazer&Coats</li>
                        <li>Suits</li>
                        <li>Rain jackets</li>
                    </ol>
                </div>

                <div className='col-3 m-2 p-2  border border-1 border-end-0 border-start-0 border-top-0 border-solid border_grey'>
                    <ol className='list-unstyled font_mini '>
                        <li className='fw-bold mb-2 text-warning'>Bottomwear</li>
                        <li onClick={() => { searchProduct("Men","Jeans") }}>jeans</li>
                        <li onClick={() => { searchProduct("Men","CasualTrousers") }}>Casual Trousers</li>
                        <li>Formal Trousers</li>
                        <li>Shorts</li>
                        <li>Track Pants & Joggers</li>
                    </ol>
                </div>

                <div className='col-3 m-2 p-2  border border-1 border-end-0 border-start-0 border-top-0 border-solid border_grey'>
                    <ol className='list-unstyled font_mini '>
                        <li className='fw-bold mb-2 text-warning'>Footwear</li>
                        <li onClick={() => { searchProduct("casual shoes") }}>Casual Shoes</li>
                        <li>Sports Shoes</li>
                        <li>Formal Shoes</li>
                        <li>Sneakers</li>
                        <li>Sandals and Floaters</li>
                        <li>Flip and Flops</li>
                        <li>Socks</li>
                    </ol>
                </div>

                <div className='col-3 m-2 p-2  border border-1 border-end-0 border-start-0 border-top-0 border-solid border_grey'>
                    <ol className='list-unstyled font_mini '>
                        <li className='fw-bold mb-2 text-warning'>InnerWear and SleepWear</li>
                        <li onClick={() => { searchProduct("briefs and trunks") }}>Briefs and Trunks</li>
                        <li>Boxers</li>
                        <li>Vests</li>
                        <li>Sleepwear & Loungewear</li>
                        <li>Thermals</li>
                    </ol>
                </div>

            </div>
        </div>
    )
}


export const Womens = () => {
    return (
        <div className='container-fluid w-100 bg-light position-absolute sublist_center zindex'>
            <div className='container row row-cols-5 flex-nowrap px-5'>
                <div className='col-3 m-2 p-2  border border-1 border-end-0 border-start-0 border-top-0 border-solid border_grey'>
                    <ol className='list-unstyled font_mini '>
                        <li className='fw-bold mb-2 text-success'>Indian & Fusion Wear</li>
                        <li>Kurtas and Suits</li>
                        <li>Sarees</li>
                        <li>Skirts and Palazzos</li>
                        <li>Lehenga Cholis</li>
                        <li>Sweaters</li>
                        <li>Jackets</li>
                        <li>Blazer&Coats</li>
                        <li>Suits</li>
                        <li>Rain jackets</li>
                    </ol>
                </div>

                <div className='col-3 m-2 p-2  border border-1 border-end-0 border-start-0 border-top-0 border-solid border_grey'>
                    <ol className='list-unstyled font_mini '>
                        <li className='fw-bold mb-2 text-success'>Western Wear</li>
                        <li>Dresses</li>
                        <li>Tops</li>
                        <li>Tshirts</li>
                        <li>Jeans</li>
                        <li>Track Pants & Joggers</li>
                    </ol>
                </div>

                <div className='col-3 m-2 p-2  border border-1 border-end-0 border-start-0 border-top-0 border-solid border_grey'>
                    <ol className='list-unstyled font_mini '>
                        <li className='fw-bold mb-2 text-success'>Footwear</li>
                        <li>Heels</li>
                        <li>Sports Shoes</li>
                        <li>Boots</li>
                        <li>Chhapals</li>
                        <li>Sandals and Floaters</li>
                        <li>Flip and Flops</li>
                        <li>Socks</li>
                    </ol>
                </div>

                <div className='col-3 m-2 p-2  border border-1 border-end-0 border-start-0 border-top-0 border-solid border_grey'>
                    <ol className='list-unstyled font_mini '>
                        <li className='fw-bold mb-2 text-success'>InnerWear and SleepWear</li>
                        <li>Bra</li>
                        <li>Briefs</li>
                        <li>Swimwear</li>
                        <li>Sleepwear & Loungewear</li>
                        <li>Thermals</li>
                    </ol>
                </div>

            </div>
        </div>
    )
}


export const Kids = () => {
    return (
        <div className='container-fluid w-100 bg-light position-absolute sublist_center zindex'>
            <div className='container row row-cols-5 flex-nowrap px-5'>
                <div className='col-3 m-2 p-2  border border-1 border-end-0 border-start-0 border-top-0 border-solid border_grey'>
                    <ol className='list-unstyled font_mini '>
                        <li className='fw-bold mb-2 text-secondary'>Boys Clothings</li>
                        <li>T-Shirt</li>
                        <li>Shirts</li>
                        <li>Shorts</li>
                        <li>Jeans</li>
                        <li>Trousers</li>
                        <li>TrackPaint</li>
                        <li>Jacket and Sweater</li>
                        <li>Suits</li>
                        <li>Rain jackets</li>
                    </ol>
                </div>

                <div className='col-3 m-2 p-2  border border-1 border-end-0 border-start-0 border-top-0 border-solid border_grey'>
                    <ol className='list-unstyled font_mini '>
                        <li className='fw-bold mb-2 text-secondary'>Girls Clothings</li>
                        <li>Dresses</li>
                        <li>Tops</li>
                        <li>Tshirts</li>
                        <li>Lehenga Cholis</li>
                        <li>Jeans and Trousers</li>
                    </ol>
                </div>

                <div className='col-3 m-2 p-2  border border-1 border-end-0 border-start-0 border-top-0 border-solid border_grey'>
                    <ol className='list-unstyled font_mini '>
                        <li className='fw-bold mb-2 text-secondary'>Footwear</li>
                        <li>Casual Shoes</li>
                        <li>Flipflops</li>
                        <li>Sports Shoes</li>
                        <li>Sandals</li>
                        <li>Heels</li>
                        <li>School Shoes</li>
                        <li>Socks</li>
                    </ol>
                </div>

                <div className='col-3 m-2 p-2  border border-1 border-end-0 border-start-0 border-top-0 border-solid border_grey'>
                    <ol className='list-unstyled font_mini '>
                        <li className='fw-bold mb-2 text-secondary'>Toys and Games</li>
                        <li>Learning and Development</li>
                        <li>Activity Toys</li>
                        <li>Soft Toys</li>
                        <li>Actions figure / Play sets</li>
                        <li>Thermals</li>
                    </ol>
                </div>

            </div>
        </div>
    )
}


export const HomeLiving = () => {
    return (
        <div className='container-fluid w-100 bg-light position-absolute sublist_center zindex'>
            <div className='container row row-cols-5 flex-nowrap px-5'>
                <div className='col-3 m-2 p-2  border border-1 border-end-0 border-start-0 border-top-0 border-solid border_grey'>
                    <ol className='list-unstyled font_mini '>
                        <li className='fw-bold mb-2 text-info'>Bed Linen & Furnishing</li>
                        <li>Bed Runners</li>
                        <li>Matress Protectors</li>
                        <li>BedSheets</li>
                        <li>Bedding Sets</li>
                        <li>Blankets,Quits and Dohar</li>
                        <li>Bed Covers</li>
                        <li>Diwan Cover</li>
                        <li>Sofa Cover</li>
                        <li>Chari paids & Covers</li>
                    </ol>
                </div>

                <div className='col-3 m-2 p-2  border border-1 border-end-0 border-start-0 border-top-0 border-solid border_grey'>
                    <ol className='list-unstyled font_mini '>
                        <li className='fw-bold mb-2 text-info'>Bath</li>
                        <li>Bath Towels</li>
                        <li>Hands and Face Towels</li>
                        <li>Beach Towels</li>
                        <li>Towels Sets</li>
                        <li>Baths Rugs</li>
                    </ol>
                </div>

            </div>
        </div>
    )
}