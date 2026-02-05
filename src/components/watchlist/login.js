"use client"
import products from '../../assets/json/product.json';
import Product_category_cards from '@/components/product/product_category_cards'
import ProductCard from '../../components/product/productcard';
import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from '@/context/GlobalContext';

export default function Login() {
    const [proArr, setProArr] = useState([]);
    const [user_watchlist, setUserwatchlist] = useState([]);
    const [watchlist_prod, setWatchlistprod] = useState([]);
    const [p_details, setP_detail] = useState(null);
    const [show_d, setShow_d] = useState(true);
    const [item_count, setItemcount] = useState(0);

    const p_detail = (prod) => {
        detail_window(!show_d);
        setP_detail(prod)
    }
    const detail_window = (v) => {
        setShow_d(v);
    }
    const wins = (s) => {
        setShow_d(!show_d);
    }
    const getWatchlist = async () => {
        
        const email = localStorage.getItem("weaver_email");
        if (!email) return [];

        const res = await fetch(`/api/cart/addwatchlist/get?email=${email}`);
        const data = await res.json();

        if (!res.ok) {
            console.error(data.message);
            return [];
        }

        setItemcount(data.items.length);
        return data.items;
    };


    useEffect(() => {
        const fetchAll = async () => {
            const items = await getWatchlist();
            setUserwatchlist(items);

            // Extract product names cleanly
            const extracted = items.map((w_item) =>
                w_item.product.split("-")[0].trim()
            );

            setWatchlistprod(extracted);
        };

        fetchAll();
    }, []);


    useEffect(() => {
        // console.log("Updated watchlist_prod:", watchlist_prod);
    }, [watchlist_prod]);
    useEffect(() => {
        const matchedProducts = [];

        watchlist_prod.forEach((item) => {
            products.forEach((category) => {
                category.subWearCategory.forEach((sub) => {
                    sub.product.forEach((product) => {
                        if (product.name === item) {
                            matchedProducts.push(category);
                        }
                    });
                });
            });
        });

        setProArr(matchedProducts);
    }, [watchlist_prod]); // <-- add watchlist_prod as dependency

    useEffect(() => {
        const checkSession = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                logout();
                return;
            }

            const res = await fetch("/api/auth/verify-token", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!res.ok) {
                logout();
            }
        };

        checkSession();
    }, []);

    function logout() {
        alert("Session expired. Login again.");
        localStorage.clear();
        window.location.href = "/login";
    }


    return (
        <div className="container-fluid d-flex justify-content-center align-items-start py-5 mt-4 overflow-hidden">
            <div className="container col-11 p-2 m-md-0 m-2 rounded" >
                <div>
                    <p>
                        <span className="fw-bolder">My Watchlist</span>
                        <span className="ms-2">{item_count}</span> Item(s)
                    </p>
                </div>

                <div>
                    <h5>Watchlist Products:</h5>
                    {
                        show_d
                            ?
                            <div style={{ maxHeight: '150vh' }} className='cards_container overflow-auto bg-light p-1 col-12 d-flex justify-content-lg-center justify-content-center flex-wrap'>
                                {proArr.map((product, index) => (
                                    <Product_category_cards key={index} productData={product} productDetail={p_detail} />
                                ))}
                            </div>
                            :
                            <div style={{ maxHeight: '150vh' }} className='cards_container overflow-auto bg-light p-1  col-12 d-flex justify-content-lg-center justify-content-center flex-wrap'>
                                <ProductCard productData={p_details} detail_w={wins} />
                            </div>
                    }
                </div>
            </div>
        </div>
    );
}
