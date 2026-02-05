"use client";
import { useEffect, useState } from "react";

export default function CustomerDetailsPage({ params }) {
  const email = params.email;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusUpdates, setStatusUpdates] = useState({});
  const [messages, setMessages] = useState({});

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch(`/api/Orders/customer-orders?email=${email}`);
        const data = await res.json();

        if (!data.success) {
          setError(data.message || "Failed to fetch orders");
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
    }

    fetchOrders();
  }, [email]);

  const handleStatusChange = (orderId, newStatus) => {
    setStatusUpdates((prev) => ({ ...prev, [orderId]: newStatus }));
  };

  const handleMessageChange = (orderId, newMessage) => {
    setMessages((prev) => ({ ...prev, [orderId]: newMessage }));
  };

  const updateOrder = async (orderId) => {
    const newStatus = statusUpdates[orderId];
    const message = messages[orderId] || "";

    if (!newStatus) return alert("Please select a status");

    try {
      const res = await fetch("/api/Orders/update-orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, orderStatus: newStatus, message }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Failed to update order");
      } else {
        alert("Order updated successfully");
        // Update local state
        setOrders((prev) =>
          prev.map((order) =>
            order.orderId === orderId ? { ...order, orderStatus: newStatus, message } : order
          )
        );
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update order");
    }
  };

  if (loading) return <div className="container mt-4">Loading...</div>;
  if (error) return <div className="container mt-4 alert alert-danger">{error}</div>;
  if (orders.length === 0)
    return <div className="container mt-4">No orders found for {email}</div>;

  const customer = orders[0]; // basic info

  return (
    <div className="container mt-4 my-4">
      <h2>Customer Details</h2>
      <hr />

      {/* CUSTOMER INFO */}
      <div className="card p-4 mb-4 shadow-sm">
        <h4 className="mb-3">Personal Information</h4>
        <p><strong>Name:</strong> {customer.customerName}</p>
        <p><strong>Email:</strong> {customer.customerEmail}</p>
        <p><strong>Phone:</strong> {customer.customerPhone}</p>

        <h5 className="mt-4">Delivery Address</h5>
        <p><strong>Address:</strong> {customer.deliveryAddress.address}</p>
        <p><strong>City:</strong> {customer.deliveryAddress.city}</p>
        <p><strong>State:</strong> {customer.deliveryAddress.state}</p>
        <p><strong>Pincode:</strong> {customer.deliveryAddress.pincode}</p>
      </div>

      {/* ALL ORDERS */}
      <div className="card p-4 shadow-sm">
        <h4 className="mb-3">All Orders</h4>

        {orders.map((order) => (
          <div key={order._id} className="mb-5 border p-3 rounded shadow-sm">
            <h5 className="mb-3">Order ID: {order.orderId}</h5>
            <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
            
            {/* Status Dropdown */}
            <p>
              <strong>Status:</strong>{" "}
              <select
                className="form-select d-inline-block w-auto"
                value={statusUpdates[order.orderId] || order.orderStatus}
                onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </p>

            {/* Message Input */}
            <p>
              <strong>Message:</strong>{" "}
              <input
                type="text"
                className="form-control d-inline-block w-50"
                placeholder="Add a message"
                value={messages[order.orderId] || order.message || ""}
                onChange={(e) => handleMessageChange(order.orderId, e.target.value)}
              />
            </p>

            <button className="btn btn-success mb-3" onClick={() => updateOrder(order.orderId)}>
              Update Order
            </button>

            <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
            <p><strong>Shipping Cost:</strong> ₹{order.shippingCost}</p>
            <p><strong>Discounts:</strong> ₹{order.discounts}</p>
            <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>

            {/* PRODUCTS */}
            <h6 className="mt-4">Products</h6>
            <table className="table table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Product Name</th>
                  <th>Description</th>
                  <th>Selected Color</th>
                  <th>Selected Size</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Discounted Price</th>
                  <th>Images</th>
                </tr>
              </thead>
              <tbody>
                {order.originalProductData.map((item) => (
                  <tr key={item._id}>
                    <td>{item.product.name}</td>
                    <td>{item.product.description}</td>
                    <td>{item.selectedColor}</td>
                    <td>{item.selectedSize}</td>
                    <td>{item.quantity}</td>
                    <td>₹{item.product.price}</td>
                    <td>₹{item.product.discounted_price}</td>
                    <td>
                      {item.product.images[0] &&
                        Object.values(item.product.images[0]).map((img, idx) => (
                          <img
                            key={idx}
                            src={img}
                            alt={item.product.name}
                            style={{ width: "50px", marginRight: "5px" }}
                          />
                        ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
