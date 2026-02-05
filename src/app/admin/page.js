"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

// India States + Cities
const indiaData = {
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],
  Karnataka: ["Bengaluru", "Mysuru", "Mangalore", "Hubli"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  Rajasthan: ["Jaipur", "Udaipur", "Kota", "Jodhpur"],
  Delhi: ["New Delhi", "Dwarka", "Rohini", "Saket"],
  UttarPradesh: ["Lucknow", "Kanpur", "Noida", "Varanasi"],
};

export default function OrderSearchUI() {
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");

  // Search states
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Check if already logged in on page load
  useEffect(() => {
    const loggedIn = localStorage.getItem("admin_logged_in");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // Login function
  const handleLogin = () => {
    if (loginUser === "admin" && loginPass === "admin") {
      localStorage.setItem("admin_logged_in", "true");
      setIsLoggedIn(true);
      toast.success("Logged in successfully!");
    } else {
      toast.error("Invalid credentials!");
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("admin_logged_in");
    setIsLoggedIn(false);

    // Clear search filters and results
    setState("");
    setCity("");
    setEmail("");
    setPhone("");
    setName("");
    setOrderStatus("");
    setStartDate("");
    setEndDate("");
    setOrders([]);
    setError("");

    toast.info("Logged out successfully!");
  };

  // Handle order search
  const handleSearch = async () => {
    setLoading(true);
    setError("");

    try {
      const query = new URLSearchParams();

      if (state) query.append("state", state);
      if (city) query.append("city", city);
      if (email) query.append("email", email);
      if (phone) query.append("phone", phone);
      if (name) query.append("name", name);
      if (orderStatus) query.append("orderStatus", orderStatus);
      if (startDate) query.append("startDate", startDate);
      if (endDate) query.append("endDate", endDate);

      const res = await fetch(`/api/Orders/getOrder_admin?${query.toString()}`);
      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Something went wrong");
        setOrders([]);
      } else {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch orders");
      setOrders([]);
    }

    setLoading(false);
  };

  // If not logged in, show login form
  if (!isLoggedIn) {
    return (
      <div className="container mt-5">
        <div className="card p-4 shadow-sm w-50 mx-auto">
          <h4 className="mb-3 text-center">Admin Login</h4>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              value={loginUser}
              onChange={(e) => setLoginUser(e.target.value)}
              autoFocus
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={loginPass}
              onChange={(e) => setLoginPass(e.target.value)}
            />
          </div>
          <button className="btn btn-primary w-100" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    );
  }

  // Logged in view (search + results)
  return (
    <div className="container mt-4">
      {/* Logout Button */}
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* SEARCH FILTERS */}
      <div className="card p-4 shadow-sm border-0 mb-4">
        <h4 className="mb-3 cpointer" onClick={()=>{handleLogout()}}>Search Orders</h4>
        <div className="row g-3">
          {/* State */}
          <div className="col-md-3">
            <label className="form-label fw-semibold">State</label>
            <select
              className="form-select"
              value={state}
              onChange={(e) => {
                setState(e.target.value);
                setCity("");
              }}
            >
              <option value="">Select State</option>
              {Object.keys(indiaData).map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* City */}
          <div className="col-md-3">
            <label className="form-label fw-semibold">City</label>
            <select
              className="form-select"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={!state}
            >
              <option value="">Select City</option>
              {state &&
                indiaData[state].map((ct) => (
                  <option key={ct} value={ct}>
                    {ct}
                  </option>
                ))}
            </select>
          </div>

          {/* Email */}
          <div className="col-md-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Customer Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Phone */}
          <div className="col-md-3">
            <label className="form-label fw-semibold">Phone</label>
            <input
              type="text"
              className="form-control"
              placeholder="Customer Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Name */}
          <div className="col-md-3">
            <label className="form-label fw-semibold">Customer Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Customer Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Order Status */}
          <div className="col-md-3">
            <label className="form-label fw-semibold">Order Status</label>
            <select
              className="form-select"
              value={orderStatus}
              onChange={(e) => setOrderStatus(e.target.value)}
            >
              <option value="">Any Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Start Date */}
          <div className="col-md-3">
            <label className="form-label fw-semibold">Start Date</label>
            <input
              type="date"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          {/* End Date */}
          <div className="col-md-3">
            <label className="form-label fw-semibold">End Date</label>
            <input
              type="date"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          {/* Search Button */}
          <div className="col-md-3 d-flex align-items-end">
            <button
              className="btn btn-primary w-100"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? "Searching..." : "Search Orders"}
            </button>
          </div>
        </div>
      </div>

      {/* ERROR */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* RESULTS */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="mb-3">Search Results</h5>

          {loading && <p>Loading...</p>}

          {!loading && orders.length === 0 && (
            <p className="text-muted">No orders found.</p>
          )}

          {!loading && orders.length > 0 && (
            <table className="table table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Order ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>State</th>
                  <th>City</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.orderId}</td>
                    <td>
                      <a
                        href={`/admin/customers/${order.customerEmail}`}
                        className="text-primary fw-semibold"
                        style={{
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        {order.customerName}
                      </a>
                    </td>
                    <td>{order.customerEmail}</td>
                    <td>{order.customerPhone}</td>
                    <td>
                      {order.deliveryAddress?.address},{" "}
                      {order.deliveryAddress?.pincode}
                    </td>
                    <td>{order.deliveryAddress?.state}</td>
                    <td>{order.deliveryAddress?.city}</td>
                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td>
                      <span
                        className={`badge bg-${
                          order.orderStatus === "delivered"
                            ? "success"
                            : order.orderStatus === "pending"
                            ? "warning"
                            : "info"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
