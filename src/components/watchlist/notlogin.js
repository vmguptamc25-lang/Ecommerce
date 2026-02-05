"use client"
import {React,useState} from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation'
import notloggin from '@/assets/images/notlogin.png'


export default function Notlogin() {
    const router = useRouter();


    const login=()=> {
        router.push("/login");
    }
    
    
    return (
        <div className="d-flex justify-content-center align-items-start py-5 mt-4 overflow-hidden">

            <div className="col-md-4 col-sm-6 col-11 bg-light p-2 m-md-0 m-2 rounded" >
                <div className="px-3 text-center mb-2">
                    <b>PLEASE LOG IN</b>
                </div>
                <div className="px-3 text-secondary mb-2">
                    <p className="text-center">Login to view items in your wishlist.</p>
                </div>
                <div className="text-center mb-3 ">
                    <Image src={notloggin} className="img-fluid" width={200} height={100} alt="weaver" />
                </div>

                
                    <button type="submit" className='btn btn-primary my-4 w-100' onClick={()=>{login()}}>LOG IN</button>
                
            </div>
        </div>
    )
}