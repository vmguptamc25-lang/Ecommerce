import React from 'react'
import Image from 'next/image'
import '../../css/aids.css'
import saleimg1 from '../../assets/images/aids/img_sale1.webp'
import saleimg2 from '../../assets/images/aids/img_sale2.webp'
import aidbelow1 from '../../assets/images/aids/aidbelow1.webp'
import aidbelow2 from '../../assets/images/aids/aidbelow2.webp'
import aidbelow3 from '../../assets/images/aids/aidbelow3.webp'
import bank_dis from '../../assets/gif/bank_dis.webp'
import aid_label from '../../assets/images/aids/label.webp'

export default function Aids() {
    return (
        <div className='container-fluid  my-2 p-2'>
            <div className='container d-flex flex-column flex-md-row px-md-2'>
                <div className='w-md-75 w-100  rounded-3 m-md-1 me-0 d-flex flex-column justify-content-center align-items-center discount_gradient'>
                    <p className='fw-bolder text-warning roboto-slab-robotoslab_class fs-1 mb-0'>Flat $300 OFF</p>
                    <p className='fw-normal fs-4'>+ Free Shipping On Your 1<sup>st</sup> Order</p>
                </div>
                <div className='w-md-25  rounded-3 m-1 ms-0 d-flex flex-md-column justify-content-center align-items-center discount_gradient2'>
                    <p className='fw-normal mb-0 fs-4'>CODE:</p>
                    <p className='fw-bold fs-5 bg-white px-4 m-2 m-md-0 fst-italic'>MYNTRA300</p>
                </div>
            </div>
            <div className='container flex-row '>
                <div className='d-flex justify-content-center align-items-center m-0 p-0 '>
                    <Image src={saleimg1} alt="Description" width={500} className='h-100  col-6 p-0 m-0'></Image>
                    <Image src={saleimg2} alt="Description" width={500} className='h-100  col-6 p-0 m-0'></Image>

                </div>
                <div className='d-flex justify-content-center align-items-center  m-0 p-0'>
                    <Image src={aidbelow3} alt="Description" width={500} className='h-100  col-4 p-0 m-0'></Image>
                    <Image src={aidbelow2} alt="Description" width={500} className='h-100  col-4 p-0 m-0'></Image>
                    <Image src={aidbelow1} alt="Description" width={500} className='h-100  col-4 p-0 m-0'></Image>

                </div>
            </div>
            <div className='d-flex justify-content-center align-items-center  m-1 px-md-4'>
                <Image src={bank_dis} alt="Description"  className='h-100 w-100  col-12 p-0 m-0'></Image>
            </div>
            <div className='d-flex justify-content-center align-items-center  m-1 px-md-4'>
                <Image src={aid_label} alt="Description"  className='h-100 w-100  col-12 p-0 m-0'></Image>
            </div>
            <div className='fs-5 fw-bold d-flex justify-content-center align-items-center fixed_div p-1 px-4 d-md-block d-none'>
                UPTO $500 OFF <i className="fas fa-caret-up"></i>

            </div>
        </div>
    )
}
