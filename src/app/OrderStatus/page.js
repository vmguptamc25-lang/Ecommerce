"use client";
import React, { useEffect, useState } from "react";
import Notlogin from "@/components/checkout/notlogin";
import OrderStatus from "@/components/OrderStatus/orderStatus";

export default function Watchlist() {
    const [uname, setUname] = useState(null);
    const [uemail, setUemail] = useState(null);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        const name = localStorage.getItem("weaver_name");
        const email = localStorage.getItem("weaver_email");

        setUname(name);
        setUemail(email);
        setLoading(false); // done loading
    }, []);

    if (loading) return <p>Loading...</p>; // avoid flicker

    return (
        <div>
            {(uname === null || uemail === null || uname === "" || uemail === "")
                ? <Notlogin />
                : <OrderStatus />}
        </div>
    );
}
