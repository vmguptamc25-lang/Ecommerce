"use client";
import React, { useState } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import ir from "@/assets/images/aids/label.webp";
import { toast } from "react-toastify";

export default function Signup() {
  const [isChecked, setIsChecked] = useState(false);

  // User fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Address fields
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");

  function generateCustomerId() {
    return "CUST-" + uuidv4();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("All required fields must be filled");
      return;
    }

    if (!isChecked) {
      toast.error("Please accept terms & conditions");
      return;
    }

    const customerId = generateCustomerId();

    try {
      // 1️⃣ REGISTER USER
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          uniqid: customerId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Signup failed");
        return;
      }

      // 2️⃣ SAVE ADDRESS (OPTIONAL BUT INDUSTRY STANDARD)
      if (address && phone) {
        await fetch("/api/address/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            fullName: name,
            phone,
            address,
            city,
            state,
            pincode,
          }),
        });
      }

      toast.success("Signup successful!");
      
      // Reset form
      setName("");
      setEmail("");
      setPassword("");
      setAddress("");
      setCity("");
      setState("");
      setPincode("");
      setPhone("");

    } catch (error) {
      toast.error("Server error");
      console.error(error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-start py-5 mt-4">
      <div className="col-md-4 col-sm-6 col-11 bg-light p-3 rounded">

        <div className="text-center mb-3">
          <Image src={ir} className="img-fluid" alt="weaver" />
        </div>

        <b className="d-block mb-2">Signup</b>

        <form onSubmit={handleSubmit}>

          {/* USER INFO */}
          <input className="form-control mb-2" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
          <input className="form-control mb-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input className="form-control mb-3" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />

          <hr />

          {/* ADDRESS INFO */}
          <small className="text-muted">Primary Address (optional)</small>

          <textarea className="form-control mb-2" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} />
          <input className="form-control mb-2" placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
          <input className="form-control mb-2" placeholder="State" value={state} onChange={e => setState(e.target.value)} />
          <input className="form-control mb-2" placeholder="Pincode" value={pincode} onChange={e => setPincode(e.target.value)} />
          <input className="form-control mb-3" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />

          {/* TERMS */}
          <div className="form-check mb-3">
            <input type="checkbox" checked={isChecked} onChange={e => setIsChecked(e.target.checked)} className="form-check-input" />
            <label className="form-check-label">
              I agree to Terms & Privacy Policy
            </label>
          </div>

          <button className="btn btn-primary w-100" disabled={!isChecked}>
            Continue
          </button>

        </form>
      </div>
    </div>
  );
}
