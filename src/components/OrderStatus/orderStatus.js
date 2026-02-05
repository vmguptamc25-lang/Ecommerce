"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all"); // NEW: track selected filter

  const getDateTime = (dateObj1) => {
    const dateObj = new Date(dateObj1);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    let hours = dateObj.getHours();
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
  };

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
      const res = await fetch(`/api/Orders/getOrders?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      if (data.success) {
        setCartItems(data.orders);
      } else {
        toast.error(data.message || "Failed to fetch orders");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error!");
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId) => {
    setLoading(true);
    const email = localStorage.getItem("weaver_email");
    if (!email) {
      toast.error("User not logged in!");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/Orders/remove-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, orderId }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Order canceled successfully!");
        setCartItems((prev) => prev.filter((item) => item.orderId !== orderId));
      } else {
        toast.error(data.message || "Failed to cancel order");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error!");
    } finally {
      setLoading(false);
    }
  };

  // Filter orders based on selected status
  const filteredItems =
    filterStatus === "all"
      ? cartItems
      : cartItems.filter((item) => item.orderStatus === filterStatus);

  if (loading) return <div className="container mt-5 text-center">Loading orders...</div>;
  if (cartItems.length === 0) return <div className="container mt-5 text-center">Your order bucket is empty.</div>;

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-primary">My Orders</h2>

      {/* Filter Dropdown */}
      <div className="mb-4">
        <label htmlFor="statusFilter" className="form-label me-2">
          Filter by Status:
        </label>
        <select
          id="statusFilter"
          className="form-select w-auto d-inline-block"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="row g-4">
        {filteredItems.length === 0 ? (
          <div className="col-12 text-center text-muted">No orders found for this filter.</div>
        ) : (
          filteredItems.map((item) => (
            <div key={item.orderId} className="col-12">
              <div className="card shadow-sm border-0 hover-shadow p-3">
                {/* Order Header */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h5 className="mb-1">Order ID: <span className="text-secondary">{item.orderId}</span></h5>
                    <p className="mb-0 small text-muted">Ordered on: {getDateTime(item.orderDate)}</p>
                  </div>
                  <span className={`badge rounded-pill ${
                    item.orderStatus === "delivered" ? "bg-success" :
                    item.orderStatus === "pending" ? "bg-warning text-dark" :
                    item.orderStatus === "cancelled" ? "bg-danger" : "bg-info text-dark"
                  }`}>{item.orderStatus.toUpperCase()}</span>
                </div>

                {/* Product List */}
                <div className="row g-3 align-items-center">
                  {item.originalProductData.map((prod) => (
                    <div key={prod._id} className="col-12 col-md-6 d-flex align-items-center">
                      <Image
                        src={prod.product.images[0].img1}
                        alt={prod.product.name}
                        width={100}
                        height={120}
                        className="rounded me-3"
                      />
                      <div>
                        <h6 className="mb-1">{prod.product.name}</h6>
                        <p className="mb-0 small text-muted">{prod.product.description}</p>
                        <p className="mb-0 small">
                          <strong>Qty:</strong> {prod.quantity} &nbsp;
                          <strong>Color:</strong> {prod.selectedColor} &nbsp;
                          <strong>Size:</strong> {prod.selectedSize}
                        </p>
                        <p className="mb-0 small text-danger">₹{prod.product.discounted_price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div>
                    <p className="mb-1"><strong>Payment Method:</strong> {item.paymentMethod}</p>
                    <p className="mb-0"><strong>Total Amount:</strong> ₹{item.totalAmount}</p>
                    {item.message && <p className="mb-0 small text-secondary">Message: {item.message}</p>}
                  </div>
                  {item.orderStatus === "pending" && (
                    <button className="btn btn-outline-danger btn-sm" onClick={() => cancelOrder(item.orderId)}>
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <style jsx>{`
        .hover-shadow:hover {
          box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15);
          transition: all 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default CheckoutPage;
