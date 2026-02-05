"use client";
import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";
import signin from "@/assets/images/aids/signin.jpg";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { GlobalContext } from "@/context/GlobalContext";
import GoogleLoginButton from "@/components/GoogleLoginButton";

export default function Signin() {
    const {
        globalValue,
        setGlobalValue,
        gname,
        setNameg,
        gemail,
        setEmailg,
        gprofilepicture,
        setProfilepicture
    } = useContext(GlobalContext);

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    // -------------------------------------
    // 🔵 AUTO LOGOUT AT 11:59 PM
    // -------------------------------------
    useEffect(() => {
        const now = new Date();
        const midnight = new Date();

        midnight.setHours(24, 0, 0, 0); // 12:00 AM next day

        const timeRemaining = midnight - now; // ms left until midnight

        const timer = setTimeout(() => {
            handleLogout();
            toast.info("Auto logout at 11:59 PM");
        }, timeRemaining);

        return () => clearTimeout(timer);
    }, []);

    // -------------------------------------
    // 🔵 MANUAL LOGOUT
    // -------------------------------------
    const handleLogout = () => {
        localStorage.clear();

        setEmailg("");
        setNameg("");
        setProfilepicture("");

        toast.success("Logged out successfully!");
        router.push("/signin");
    };

    // -------------------------------------
    // 🔵 LOGIN SUBMIT
    // -------------------------------------
    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     if (!email.trim() || !password.trim()) {
    //         setMessage("All fields are required!");
    //         return;
    //     }

    //     try {
    //         // 1️⃣ LOGIN REQUEST
    //         const res = await fetch("/api/auth/login", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ email, password }),
    //         });

    //         const data = await res.json();

    //         if (data.message === "Account not found") {
    //             router.push("/register");
    //             toast.warning("Account Not Exist");
    //             return;
    //         }

    //         if (!res.ok) {
    //             toast.error(data.message || "Something went wrong!");
    //             return;
    //         }

    //         // 2️⃣ SAVE TOKEN
    //         router.push('/')
    //         localStorage.setItem("token", data.token);
    //         toast.success(data.message);
    //         setMessage(data.message);

    //         setEmailg(email);

    //         // 3️⃣ FETCH USER DATA
    //         const userRes = await fetch("/api/auth/get_user", {
    //             method: "GET",
    //             headers: {
    //                 Authorization: `Bearer ${data.token}`,
    //             },
    //         });

    //         const userData = await userRes.json();

    //         if (userRes.ok) {
    //             localStorage.setItem("weaver_email", userData.email);
    //             localStorage.setItem("weaver_name", userData.name);
    //             toast.success("Welcome " + userData.name);
    //         } else {
    //             toast.error("Unable to load user details.");
    //         }

    //         // Reset fields
    //         setEmail("");
    //         setPassword("");

    //     } catch (error) {
    //         toast.error("Server error!");
    //         console.error(error);
    //     }
    // };

    return (
        <div className="d-flex justify-content-center align-items-start py-5 mt-4 overflow-hidden">
            <div className="col-md-4 col-sm-6 col-11 bg-light p-2 m-md-0 m-2 rounded">

                <div className="text-center mb-3">
                    <Image src={signin} className="img-fluid" alt="weaver" />
                </div>

                <div className="px-3 text-start mb-2">
                    <b>Signin with...</b>
                </div>
                <GoogleLoginButton/>
                {/* <form onSubmit={handleSubmit} className="d-flex flex-column">
                    <input
                        className="mb-2 p-1 input_hover"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="mb-2 p-1 input_hover"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit" className='btn btn-primary my-4'>
                        Signin
                    </button>
                </form> */}

                {message && (
                    <p className="mt-2 text-center text-danger">{message}</p>
                )}

                {/* 🔵 MANUAL LOGOUT BUTTON */}
                {/* <button className="btn btn-danger w-100 mt-3" onClick={handleLogout}>
                    Logout
                </button> */}

            </div>
        </div>
    );
}
