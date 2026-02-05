"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

/* ============================
   MAIN CHECKOUT PAGE
============================ */
export default function CheckoutPage({ sendProduct = [], sendTotal = 0 }) {
  const [email, setEmail] = useState("");
  const shippingCost = 50;

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false); // ✅ new state

  /* -------- GET EMAIL SAFELY -------- */
  useEffect(() => {
    const userEmail = localStorage.getItem("weaver_email");
    if (!userEmail) {
      toast.error("Please login first");
      return;
    }
    setEmail(userEmail);
  }, []);

  /* -------- FETCH ADDRESSES -------- */
  useEffect(() => {
    if (!email) return;

    fetch(`/api/address/get?email=${email}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setAddresses(data.addresses || []);
        }
      })
      .catch(() => toast.error("Failed to load addresses"));
  }, [email]);

  /* -------- PLACE ORDER -------- */
  const placeOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }

    if (sendProduct.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    setLoading(true);

    const orderId = `ORD-${Date.now()}`;
    const orderData = {
      orderId,
      orderDate: new Date().toISOString(),
      orderStatus: "pending",
      paymentStatus: paymentMethod === "COD" ? "unpaid" : "paid",

      customerEmail: email,
      customerName: selectedAddress.fullName,
      customerPhone: selectedAddress.phone,
      deliveryAddress: selectedAddress,

      originalProductData: sendProduct,
      shippingCost,
      discounts: 0,
      totalAmount: Number(sendTotal) + shippingCost,
      paymentMethod,
    };

    try {
      const res = await fetch("/api/Orders/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        toast.success("Order placed successfully");
        setOrderPlaced(true);

        // ✅ Remove all cart items from DB
        for (let item of sendProduct) {
          try {
            await fetch("/api/cart/remove", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, orderId: item.orderId }),
            });
          } catch (err) {
            console.error("Failed to remove cart item:", err);
          }
        }
      } else {
        toast.error(result.message || "Order failed");
      }
    } catch {
      toast.error("Server error");
    }

    setLoading(false);
  };

  /* -------- UI AFTER ORDER PLACED -------- */
  if (orderPlaced) {
    return (
      <div className="container my-5 text-center">
        <h3 className="text-success">✅ Your order has been placed!</h3>
        <p>Order ID: <strong>{`ORD-${Date.now()}`}</strong></p>
        <p>Thank you for shopping with us.</p>
      </div>
    );
  }

  /* -------- UI BEFORE ORDER -------- */
  return (
    <div className="container my-4">
      <div className="row">

        {/* ADDRESS SECTION */}
        <div className="col-md-6">
          <h5>Delivery Address</h5>

          {addresses.length === 0 && (
            <p className="text-muted">No saved address found</p>
          )}

          {addresses.map(addr => (
            <div
              key={addr._id}
              className={`border p-3 mb-2 rounded ${selectedAddress?._id === addr._id ? "border-primary" : ""}`}
            >
              <input
                type="radio"
                name="address"
                checked={selectedAddress?._id === addr._id}
                onChange={() => setSelectedAddress(addr)}
              />{" "}
              <strong>{addr.fullName}</strong>
              <p className="mb-0 small">
                {addr.address}, {addr.city}, {addr.state} - {addr.pincode}
              </p>
              <p className="mb-0 small">📞 {addr.phone}</p>
            </div>
          ))}

          <AddAddress
            email={email}
            onAdd={(newAddr) => setAddresses(prev => [...prev, newAddr])}
            disabled={addresses.length >= 5}
          />
        </div>

        {/* PAYMENT + SUMMARY */}
        <div className="col-md-6">
          <h5>Payment Method</h5>

          <div className="border p-3 rounded mb-3">
            <label>
              <input
                type="radio"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
              /> Cash on Delivery
            </label>

            <br />

            <label className="mt-2">
              <input
                type="radio"
                checked={paymentMethod === "RAZORPAY"}
                onChange={() => setPaymentMethod("RAZORPAY")}
              /> Razorpay (UPI / Card)
            </label>
          </div>

          <h5>Order Summary</h5>
          <div className="border p-3 rounded">
            <p>Items Total: ₹{sendTotal}</p>
            <p>Shipping: ₹{shippingCost}</p>
            <hr />
            <h6>Total: ₹{Number(sendTotal) + shippingCost}</h6>

            <button
              className="btn btn-primary w-100 mt-3"
              onClick={placeOrder}
              disabled={loading}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ============================
   ADD ADDRESS COMPONENT
============================ */
function AddAddress({ email, onAdd, disabled }) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleSubmit = async () => {
    if (!email) {
      toast.error("Login required");
      return;
    }

    if (!form.address || !form.phone || !form.fullName) {
      toast.error("Full Name, Address & Phone are required");
      return;
    }

    try {
      const res = await fetch("/api/address/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, email }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Address saved");
        onAdd(data.address);
        setForm({ fullName: "", phone: "", address: "", city: "", state: "", pincode: "" });
      } else {
        toast.error(data.message || "Failed to save address");
      }
    } catch {
      toast.error("Server error");
    }
  };

  return (
    <div className="border p-3 mt-3 rounded">
      <h6>Add New Address</h6>

      {Object.keys(form).map((field) => (
        <input
          key={field}
          className="form-control mb-2"
          placeholder={field}
          value={form[field]}
          onChange={(e) =>
            setForm({ ...form, [field]: e.target.value })
          }
        />
      ))}

      <button
        className="btn btn-outline-primary w-100"
        onClick={handleSubmit}
        disabled={disabled}
      >
        {disabled ? "Max 5 Addresses Allowed" : "Save Address"}
      </button>
    </div>
  );
}
