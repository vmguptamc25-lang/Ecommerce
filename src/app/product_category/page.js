"use client"
import React, { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import '../../css/product.css'
import Product_category_cards from '@/components/product/product_category_cards'
import Breadcum from '../../components/breadcum.js'
// import products from '../../assets/json/product.json';
import ProductCard from '../../components/product/productcard';
import '../../css/product.css'
import '../../css/header_footer.css'
import { GlobalContext } from '@/context/GlobalContext'

export default function Product_category() {

    const { globalValue, setGlobalValue } = useContext(GlobalContext);
    const [products, setProducts] = useState([]);

    const [show_d, setShow_d] = useState(true);
    const [p_details, setP_detail] = useState(null);
    const [slide_flag, setSlide_flag] = useState(false)

    const [category, setCategory] = useState([]);
    const [brand, setBrand] = useState([]);
    const [color, setColor] = useState([]);
    const [discount, setDiscount] = useState(0);
    const [price, setPrice] = useState(99999);

    // ---------------- FLATTENER ------------------
    const flattenProducts = (productsData) => {
        let list = [];

        productsData.forEach(cat => {
            cat.subWearCategory.forEach(sub => {
                sub.product.forEach(item => {
                    list.push({
                        flat: {
                            category: cat.category,
                            brand: item.name,
                            colors: Object.values(item.color_variant[0]),
                            discount: Number(item.off_percentage),
                            price: Number(item.price),
                        },
                        original: cat,
                    });
                });
            });
        });

        return list;
    };

    // -------------------------------------------------
    //fetch products
    useEffect(() => {
        fetch("/api/products")
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error(err));
    }, []);
    //inital load 
    useEffect(() => {
        if (!products.length) return;
        const flat = flattenProducts(products);
        setGlobalValue(flat.map(i => i.original));
    }, [products]);



    // // INITIAL LOAD
    // useEffect(() => {
    //     const flat = flattenProducts();
    //     setGlobalValue(flat.map(i => i.original));
    // }, []);

    // FILTERING
    useEffect(() => {
        if (!products.length) return;

        let flat = flattenProducts(products);
        let filtered = flat;

        if (category.length)
            filtered = filtered.filter(p =>
                category.includes(p.flat.category)
            );

        if (brand.length)
            filtered = filtered.filter(p =>
                brand.includes(p.flat.brand)
            );

        if (color.length)
            filtered = filtered.filter(p =>
                p.flat.colors.some(c => color.includes(c))
            );

        if (discount)
            filtered = filtered.filter(p =>
                p.flat.discount >= discount
            );

        filtered = filtered.filter(p =>
            p.flat.price <= price
        );

        setGlobalValue(filtered.map(i => i.original));
    }, [category, brand, color, discount, price, products]);

    // UI Controls (unchanged)
    const detail_window = (v) => { setShow_d(v); }
    const p_detail = (prod) => { detail_window(!show_d); setP_detail(prod); }
    const wins = () => { setShow_d(!show_d); }

    // hamburger
    const [active_hem, setActive_hem] = useState(false)
    const handleHamburg = () => {
        setActive_hem(!active_hem)
        slidein_out_filter()
    }
    const slidein_out_filter = () => {
        const sidein_out = document.getElementById('sidein_out_filter')
        if (slide_flag) {
            sidein_out.style.transform = 'translateX(0)';
            sidein_out.style.display = 'block';
            setSlide_flag(!slide_flag)
        } else {
            sidein_out.style.transform = 'translateX(-100%)';
            sidein_out.style.display = 'none';
            setSlide_flag(!slide_flag)
        }
    }

    return (
        <div className='container-fluid my-md-5 p-md-3 p-1'>

            <div className='d-flex hamb_h'>
                <div className={`hamburgmenu ${active_hem ? 'hem_active' : ''}`} onClick={handleHamburg}>
                    <div className='h_line h_line1'></div>
                    <div className='h_line h_line2'></div>
                    <div className='h_line h_line3'></div>
                </div>
            </div>

            <div className=''>
                <Breadcum />
                <p className='fw-bold'>Weaver Product :- {globalValue.length} items</p>
            </div>

            <div className='d-flex justify-content-center align-item-center w-100 flex-md-row flex-column border-top'>

                {/* LEFT FILTER PANEL */}
                <div className='slidein_out_filter col-md-2 col-12 d-md-flex flex-column border-end' id='sidein_out_filter'>

                    {/* CATEGORY FILTER */}
                    <div className='p-2 m-1 border-bottom'>
                        <label>Category</label>

                        <div class="form-check">
                            <input type="checkbox" class="form-check-input"
                                onChange={(e) => {
                                    if (e.target.checked)
                                        setCategory(prev => [...prev, "Men"])
                                    else
                                        setCategory(prev => prev.filter(i => i !== "Men"))
                                }}
                            />
                            <label class="form-check-label">Men</label>
                        </div>

                        <div class="form-check">
                            <input type="checkbox" class="form-check-input"
                                onChange={(e) => {
                                    if (e.target.checked)
                                        setCategory(prev => [...prev, "Women"])
                                    else
                                        setCategory(prev => prev.filter(i => i !== "Women"))
                                }}
                            />
                            <label class="form-check-label">Women</label>
                        </div>
                    </div>

                    {/* BRAND FILTER */}
                    <div className='p-2 m-1 border-bottom'>
                        <label>Brand</label>

                        {["Polo", "Roadstar", "Tommy Hilfiger", "Frisker"].map(b => (
                            <div class="form-check" key={b}>
                                <input type="checkbox" class="form-check-input"
                                    onChange={(e) => {
                                        if (e.target.checked)
                                            setBrand(prev => [...prev, b])
                                        else
                                            setBrand(prev => prev.filter(i => i !== b))
                                    }}
                                />
                                <label class="form-check-label">{b}</label>
                            </div>
                        ))}
                    </div>

                    {/* COLOR */}
                    <div className='p-2 m-1 border-bottom'>
                        <label>Color</label>
                        {["Red", "Green", "Black", "White"].map(c => (
                            <div class="form-check" key={c}>
                                <input type="checkbox" class="form-check-input"
                                    onChange={(e) => {
                                        if (e.target.checked)
                                            setColor(prev => [...prev, c])
                                        else
                                            setColor(prev => prev.filter(i => i !== c))
                                    }}
                                />
                                <label class="form-check-label">{c}</label>
                            </div>
                        ))}
                    </div>

                    {/* DISCOUNT */}
                    <div className='p-2 m-1 border-bottom'>
                        <label>Discount Range</label>
                        {[10, 20, 30, 40, 50, 60].map(d => (
                            <div class="form-check" key={d}>
                                <input type="radio" name="discount" class="form-check-input"
                                    onChange={() => setDiscount(d)}
                                />
                                <label class="form-check-label">{d}% and above</label>
                            </div>
                        ))}
                    </div>

                </div>

                {/* RIGHT SIDE CARDS */}
                {
                    show_d
                        ? <div style={{ maxHeight: '150vh' }} className='cards_container overflow-auto bg-light p-1 col-md-10 col-12 d-flex flex-wrap justify-content-center'>
                            {globalValue.map((product, index) => (
                                <Product_category_cards
                                    key={index}
                                    productData={product}
                                    productDetail={p_detail}
                                />
                            ))}
                        </div>
                        : <div style={{ maxHeight: '150vh' }} className='cards_container overflow-auto bg-light p-1 col-md-10 col-12 d-flex justify-content-center flex-wrap'>
                            <ProductCard productData={p_details} detail_w={wins} />
                        </div>
                }

            </div>
        </div>
    )
}
