"use client";
import React, { useState, useContext } from "react";
import Image from 'next/image';
import close from '../../assets/images/close.png';
import watchlist from '../../assets/icons/watchlist.png';
import checkout from '../../assets/icons/checkout.png';
import { toast } from "react-toastify";
import { GlobalContext } from '@/context/GlobalContext';
import { v4 as uuidv4 } from "uuid"; // for random order ID

const ProductCard = ({ productData, detail_w }) => {
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
  const [quantity, setQuantity] = useState(1);
  const maxQuantity = 10;

  const increment = () => { if (quantity < maxQuantity) setQuantity(quantity + 1); };
  const decrement = () => { if (quantity > 1) setQuantity(quantity - 1); };
  const handleColorChange = (color) => setSelectedColor(color);
  const handleSizeChange = (size) => setSelectedSize(size);

  // Watchlist function
  const addwatchlistdetail = async (productId) => {
    const email = localStorage.getItem("weaver_email");
    if (!email) { toast.error("User not logged in!"); return; }

    try {
      const res = await fetch("/api/cart/addwatchlist/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, productId }),
      });
      const data = await res.json();
      if (res.ok) toast.success("Product added to watchlist!");
      else toast.error(data.message || "Failed to add to watchlist.");
    } catch (err) {
      console.error(err);
      toast.error("Server error!");
    }
  };

  // Add to Cart function (sends entire product object)
  const addToCart = async () => {
    const email = localStorage.getItem("weaver_email");
    if (!email) { toast.error("User not logged in!"); return; }

    const orderId = `ORD-${uuidv4().split('-')[0].toUpperCase()}`;
    const cartItem = {
      orderId,
      email,
      product, // entire product object
      selectedColor,
      selectedSize,
      quantity,
      addedAt: new Date(),
    };

    try {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartItem),
      });
      const data = await res.json();

      if (res.ok) toast.success(`Product added to cart! Order ID: ${orderId}`);
      else toast.error(data.message || "Failed to add to cart.");
    } catch (err) {
      console.error(err);
      toast.error("Server error!");
    }
  };

  return (
    <div className="container-fluid" style={{ height: 'fit-content' }}>
      <div className="bg-light p-2 d-flex justify-content-end" onClick={() => detail_w(false)}>
        <Image src={close} alt="close" width={20} height={20} />
      </div>

      <div className="card shadow-sm mb-4 d-flex flex-md-row flex-column">
        <div className="d-flex flex-md-row flex-column col-md-8 col-12 p-2">
          <div className="d-flex overflow-auto gap-1 col-md-6 col-12">
            {imageOptions.map((img, idx) => (
              <Image key={idx} src={img} alt={selectedColor} className="rounded" width={300} height={400} />
            ))}
          </div>

          <div className="col-md-6 col-12 p-2 px-4">
            <h5>{product.name}<small className="text-danger ">{product.inventary < 1 ? " Out of Stock" : product.inventary < 10 ? "Few Stock remaining" : ""}</small></h5>
            <p className="text-muted">
              Category: {productData.category} / {productData.wearCategory} / {productData.subWearCategory[0].name}
            </p>
            <p>{product.description}</p>

            <p>
              <strong>Price:</strong> ₹{product.discounted_price}{" "}
              <span className="text-muted text-decoration-line-through">₹{product.price}</span>{" "}
              <span className="text-success fw-bold">{product.off_percentage}% OFF</span>
            </p>
            <p><strong>Rating:</strong> ⭐ {product.ratting}</p>

            <div className="mt-3">
              <div className="mb-3">
                <label className="form-label fw-medium">Color:</label>
                <div className="d-flex gap-2 flex-wrap">
                  {colorOptions.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleColorChange(color)}
                      className={`rounded-circle border ${selectedColor === color ? "border-dark" : "border-secondary"}`}
                      style={{ backgroundColor: color, width: "30px", height: "30px" }}
                      title={color}
                    />
                  ))}
                </div>
                <small className="text-secondary">Selected color: {selectedColor}</small>
              </div>

              <div className="mb-3">
                <label className="form-label fw-medium">Size:</label>
                <div className="d-flex gap-2 flex-wrap">
                  {sizeOptions.map((size, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSizeChange(size)}
                      className={`btn ${selectedSize === size ? "btn-dark" : "btn-outline-secondary"}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <small className="text-secondary">Selected size: {selectedSize}</small>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4 col-12 p-2 text-center d-flex flex-column align-items-center justify-content-center">
          <div className="d-flex align-items-center gap-2 mb-3">
            <label className="me-2 mb-0 fw-medium">Quantity:</label>
            <button className="btn btn-outline-secondary" onClick={decrement} disabled={quantity === 1}>-</button>
            <input type="text" className="form-control text-center" value={quantity} readOnly style={{ width: "60px" }} />
            <button className="btn btn-outline-secondary" onClick={increment} disabled={quantity === maxQuantity}>+</button>
          </div>

          <div className="d-flex flex-row align-items-center gap-2 border rounded p-2 mb-2 flex-wrap">
            <div
              className="d-flex align-items-center gap-2 p-2 cursor-pointer border rounded flex-grow-1 justify-content-center"
              onClick={() => addwatchlistdetail(product.name + "-" + product.discounted_price)}
            >
              <Image src={watchlist} alt="watchlist" width={20} height={20} />
              <span>Watchlist</span>
            </div>

            <div
              className={`d-flex align-items-center gap-2 p-2 border rounded flex-grow-1 justify-content-center ${product.ratting[0] < 3
                  ? "bg-secondary text-light cursor-not-allowed"
                  : "bg-danger text-light cursor-pointer"
                }`}
              onClick={() => {
                if (product.inventary < 1) return; // block click
                addToCart();
              }}
              title={product.inventary < 1 ? "Product not available" : "Add to Cart"}
            > 
              <Image src={checkout} alt="cart" width={20} height={20} />
              <span>Add to Cart</span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductCard;
