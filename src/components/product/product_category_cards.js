"use client"
import React, { useState, useEffect } from "react";
import Image from 'next/image'
import '../../css/product.css'
import watchlist from '../../assets/icons/watchlist.png'
import { toast } from "react-toastify";

import { useContext } from 'react'
import { GlobalContext } from '@/context/GlobalContext'

export default function Product_category_cards({ productData, productDetail }) {
    const { globalValue } = useContext(GlobalContext);

    const product = productData.subWearCategory[0].product[0];
    const colorObj = product.color_variant[0];
    const sizeObj = product.size_variant[0];
    const imagesObj = product.images[0];

    const colorOptions = Object.values(colorObj);
    const sizeOptions = Object.values(sizeObj);
    const imageOptions = Object.values(imagesObj);

    const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
    const [selectedSize, setSelectedSize] = useState(sizeOptions[0]);
    const [selectedImage, setSelectedImage] = useState(imageOptions[0]);

    const [detailproduct, setdetailProduct] = useState(null);

    const addwatchlist = async (product) => {
        setdetailProduct(product);

        const email = localStorage.getItem("weaver_email");
        if (!email) {
            toast.error("User not logged in!");
            return;
        }

        try {
            const res = await fetch("/api/cart/addwatchlist/post", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, product }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Product added to watchlist!");
            } else {
                toast.error(data.message || "Failed to add to watchlist.");
            }

        } catch (err) {
            console.error(err);
            toast.error("Server error!");
        }
    };

    const product_Details = () => {
        productDetail(productData);
    }

    const handleColorChange = (e) => {
        const index = colorOptions.indexOf(e.target.value);
        setSelectedColor(e.target.value);
        setSelectedImage(imageOptions[index]);
    };

    const handleSizeChange = (e) => {
        setSelectedSize(e.target.value);
    };

    useEffect(() => {
        if (globalValue) {
            setSelectedImage(imageOptions[0]);
        }
    }, [globalValue, imageOptions]);

    return (
        <div className="col-sm-3 col-6 card shadow-sm m-md-1 m-0 d-flex flex-column ">
            <Image
                src={selectedImage}
                alt={selectedColor}
                className="card-img-top w-100"
                width={300}
                height={200}
                onClick={() => { product_Details(product) }}
            />

            <div className='product_parent d-flex justify-content-end flex-column mobile_font '>
                <div className='Product_name'>
                    <p className='fw-bold p-2 pb-0 m-0'>{product.name}</p>
                    <p className='px-2 m-0 text-truncate'>{product.description}</p>
                </div>

                <div className='watchlist_add p-2 border text-center'>
                    <Image
                        src={watchlist}
                        alt="watchlist"
                        width={20}
                        height={20}
                        className='watchlist_icon'
                        onClick={() => {
                            const identifier = product.name + "-" + product.discounted_price;
                            addwatchlist(identifier);
                        }}
                    />
                    <span className='mx-2'>Watchlist</span>
                </div>

                <div className='d-flex justify-content-start align-items-center p-2'>
                    <span className='fw-bold'>₹{product.discounted_price}</span>
                    <span className='small_font ms-2 text-decoration-line-through'>₹{product.price}</span>
                    <span className='small_font ms-2 text-warning'>{product.off_percentage}% OFF</span>
                </div>
            </div>
        </div>
    )
}
