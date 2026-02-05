"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import DeliveryDetails from "./deliverydetail";

const CheckoutPage = () => {
    const [del_wind, setDel_win] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        const email = localStorage.getItem("weaver_email");
        if (!email) {
            toast.error("User not logged in!");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`/api/cart/getcart?email=${encodeURIComponent(email)}`);
            const data = await res.json();

            if (data.success) {
                setCartItems(data.cartItems);
            } else {
                toast.error(data.message || "Failed to fetch cart items");
            }
        } catch (err) {
            console.error(err);
            toast.error("Server error!");
        } finally {
            setLoading(false);
        }
    };

    const c_outRemove = async (orderId) => {
        setLoading(true);
        const email = localStorage.getItem("weaver_email");
        if (!email) {
            toast.error("User not logged in!");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/cart/remove", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, orderId }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                toast.success("Product removed from cart!");
                setCartItems((prevItems) => prevItems.filter(item => item.orderId !== orderId));
            } else {
                toast.error(data.message || "Failed to remove product");
            }
        } catch (err) {
            console.error(err);
            toast.error("Server error!");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Callback for DeliveryDetails to notify order success
    const handleOrderSuccess = () => {
        // Close delivery popup
        setDel_win(false);
        // Clear cart UI
        setCartItems([]);
        toast.success("Order placed successfully and cart cleared!");
    };

    const total = cartItems.reduce((acc, item) => acc + item.quantity * item.product.discounted_price, 0);


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
        <div className="container my-md-5 my-4 py-md-4">
            <h2 className="mb-4">Checkout</h2>

            {del_wind && (
                <DeliveryDetails
                    sendtoParent={setDel_win}
                    sendProduct={cartItems}
                    sendTotal={total}
                    onOrderSuccess={handleOrderSuccess} // ✅ pass callback
                />
            )}

            {loading ? (
                <p>Loading cart items...</p>
            ) : cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="row">
                    <div className="col-12">
                        {cartItems.map((item) => (
                            <div key={item.orderId} className="card mb-3">
                                <div className="d-flex g-0 align-items-center">
                                    <div className="col-md-2 p-2">
                                        <Image
                                            src={item.product.images[0][Object.keys(item.product.images[0])[0]]}
                                            alt={item.product.name}
                                            width={120}
                                            height={150}
                                            className="img-fluid rounded"
                                        />
                                    </div>
                                    <div className="col-md-7">
                                        <div className="card-body">
                                            <h5 className="card-title">{item.product.name}</h5>
                                            <p className="card-text mb-0">
                                                <strong>Color:</strong> {item.selectedColor} <br />
                                                <strong>Size:</strong> {item.selectedSize} <br />
                                                <strong>Quantity:</strong> {item.quantity} <br />
                                                <strong>Price:</strong> ₹{item.product.discounted_price} <br />
                                                <strong>Subtotal:</strong> ₹{item.quantity * item.product.discounted_price}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-2" onClick={() => { c_outRemove(item.orderId) }}>
                                        <span className="bg-danger rounded p-2 text-light cpointer">Remove</span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="card p-3" onClick={() => { setDel_win(true) }}>
                            <h4>Total: ₹{total}</h4>
                            <button className="btn btn-success mt-3">Proceed to Payment</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckoutPage;
