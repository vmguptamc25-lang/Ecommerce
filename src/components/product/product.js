"use client"
import React from 'react'
import ProductCard from "./productcard";
// import products from '../../assets/json/product.json';


export default function Product() {
    // var len = products.length;
    // for (var i = 0; i < len; i++) {
    //     console.log(products[i].category);
    //     console.log(products[i].wearCategory);
    //     console.log(products[i].subWearCategory[0].product[0].name);
    //     console.log(products[i].subWearCategory[0].product[0].description);
    //     console.log(products[i].subWearCategory[0].product[0].price);
    //     console.log(products[i].subWearCategory[0].product[0].discounted_price);
    //     console.log(products[i].subWearCategory[0].product[0].off_percentage);
    //     console.log(products[i].subWearCategory[0].product[0].ratting);
    //     console.log(products[i].subWearCategory[0].product[0].color_variant);
    //     console.log(products[i].subWearCategory[0].product[0].size_variant);
    //     console.log(products[i].subWearCategory[0].product[0].images);

    // }

    return (
        <div>
            <h1>Product Cards</h1>
            {products.map((product, index) => (
                <ProductCard key={index} productData={product} />
            ))}
        </div>
    )
}
