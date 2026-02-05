"use client"
import { useRouter } from "next/navigation";

import React from 'react'
import Image from 'next/image'
import shopbycat from '../../assets/json/category.json'
import '../../css/aids.css'
// import img from '../../assets/images/aids/img_sale1.webp'

export default function Shopbycategory() {
  return (
    <div className='container-fluid'>
      <div className='container text-center '>
        <div className='fs-2'>
          <p className='font_fam_emoji text-warning'>SHOP BY CATEGORY</p>
        </div>
        <div className='overflow-scroll overflow-md-hidden w-100 d-flex justify-content-center align-items-center flex-lg-wrap  flex-nowrap'>

          {shopbycat.map((product, index) => (
                <ShopCat name={product.name} ll_off={product.ll_off} hl_off={product.hl_off} img={product.img_url} key={index}/>
            ))}
          


        </div>
      </div>
    </div>
  )
}

function ShopCat({name,ll_off,hl_off,img}) {
  const router = useRouter();

  return (
    <div className='col-5 cpointer col-md-2 searchBycat d-flex align-items-center flex-column flash_deal_card p-1 m-1 rounded rounded-4'>

      <Image
        src={img}
        alt='category-product'
        className="custom_img rounded rounded-4 w-100 "
        width={300}
        height={200}
        onClick={() => router.push("/product_category")}
      />

      <div className='w-100 h-50 bg- p-1 rounded rounded-4 text-center'>
        <p className='p-0 m-0'>{name}</p>
        <p className='p-0 m-0 fw-bold fs-lg-5'>{ll_off}-{hl_off}% OFF</p>
        <p className='p-0 m-0 rounded  border border-danger'>Shop Now</p>
      </div>
    </div>
  )
}