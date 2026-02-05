"use client";
import React, { useEffect, useState } from "react";
import Notlogin from "@/components/checkout/notlogin";
import Login from "@/components/checkout/login";

export default function Watchlist() {
    const [uname, setUname] = useState(null);
    const [uemail, setUemail] = useState(null);
    const [loading, setLoading] = useState(true);

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
                : <Login />}
        </div>
    );
}
