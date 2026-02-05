"use client"
import React from "react";
import Notlogin from "@/components/watchlist/notlogin";
import Login from "@/components/watchlist/login";

export default function Watchlist(){
    const uname=localStorage.getItem("weaver_name")
    const uemail=localStorage.getItem("weaver_email")
    return(
        <div>
            {
                uname==""||uemail==""?<Notlogin/>:<Login/>
            }
        </div>
    )
}