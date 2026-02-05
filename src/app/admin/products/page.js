"use client";

import { useEffect, useState } from "react";

/* ================= DRIVE URL CONVERTER ================= */
function convertDriveUrlToDirect(url) {
  const regex = /\/file\/d\/(.+?)\/view/;
  const match = url?.match(regex);
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }
  return url || "";
}

export default function AdminProductsPage() {
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");


  const [data, setData] = useState([]);
  const [flat, setFlat] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [draft, setDraft] = useState(null);
  const [metaDraft, setMetaDraft] = useState(null);
  const [status, setStatus] = useState("");

  //admin loign 
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
  }


  /* ---------------- FLATTEN PRODUCTS ---------------- */
  const flattenProducts = (json) => {
    const list = [];
    json.forEach((cat, ci) => {
      cat.subWearCategory.forEach((sub, si) => {
        sub.product.forEach((prod, pi) => {
          list.push({ ci, si, pi, product: prod });
        });
      });
    });
    return list;
  };

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setFlat(flattenProducts(json));
      });
  }, []);

  /* ---------------- SEARCH ---------------- */
  const results = flat.filter((p) =>
    (p.product.name || "").toLowerCase().includes(search.toLowerCase())
  );

  /* ---------------- ADD PRODUCT (SAME SUB CATEGORY) ---------------- */
  const addProduct = () => {
    if (!selected) {
      alert("Select a product first");
      return;
    }

    const updated = structuredClone(data);

    updated[selected.ci].subWearCategory[selected.si].product.push({
      name: "New Product",
      description: "",
      price: "",
      discounted_price: "",
      off_percentage: "",
      ratting: "",
      color_variant: [{ color1: "", color2: "", color3: "" }],
      size_variant: [{ size1: "", size2: "", size3: "" }],
      images: [{ img1: "", img2: "", img3: "" }],
    });

    setData(updated);
    setFlat(flattenProducts(updated));
  };

  /* ---------------- DELETE PRODUCT ---------------- */
  const deleteProduct = () => {
    if (!confirm("Delete this product?")) return;

    const updated = structuredClone(data);
    updated[selected.ci].subWearCategory[selected.si].product.splice(
      selected.pi,
      1
    );

    setData(updated);
    setFlat(flattenProducts(updated));
    setSelected(null);
    setDraft(null);
    setMetaDraft(null);
  };

  /* ---------------- SAVE ---------------- */
  const saveAll = async () => {
    if (!selected) return;

    const updated = structuredClone(data);

    // Update meta fields
    updated[selected.ci].category = metaDraft.category;
    updated[selected.ci].wearCategory = metaDraft.wearCategory;
    updated[selected.ci].subWearCategory[selected.si].name =
      metaDraft.subWearCategory;

    // Update product
    updated[selected.ci].subWearCategory[selected.si].product[selected.pi] =
      draft;

    setData(updated);
    setFlat(flattenProducts(updated));

    setStatus("Saving...");
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });

    setStatus(res.ok ? "✅ Saved Successfully" : "❌ Save Failed");
  };

  /* ---------------- HANDLERS FOR VARIANTS ---------------- */
  const updateVariant = (type, index, key, value) => {
    const updated = [...draft[type]];
    updated[index][key] = value;
    setDraft({ ...draft, [type]: updated });
  };

  const addVariant = (type) => {
    if (type === "color_variant") {
      setDraft({
        ...draft,
        color_variant: [...draft.color_variant, { color1: "", color2: "", color3: "" }],
      });
    } else if (type === "size_variant") {
      setDraft({
        ...draft,
        size_variant: [...draft.size_variant, { size1: "", size2: "", size3: "" }],
      });
    }
  };

  const removeVariant = (type, index) => {
    setDraft({
      ...draft,
      [type]: draft[type].filter((_, i) => i !== index),
    });
  };

  ///user authenticate 
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


  return (
    <div className="container p-4">
      <h2 className="mb-3">Admin – Product Manager</h2>

      <div className="d-flex gap-2 mb-3">
        <input
          className="form-control"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addProduct}>
          ➕ Add Product
        </button>
      </div>

      {/* PRODUCT LIST */}
      <ul className="list-group mb-4">
        {results.map((p, i) => (
          <li
            key={i}
            className={`list-group-item ${selected === p ? "active" : ""}`}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSelected(p);
              setDraft(structuredClone(p.product));
              setMetaDraft({
                category: data[p.ci].category,
                wearCategory: data[p.ci].wearCategory,
                subWearCategory: data[p.ci].subWearCategory[p.si].name,
              });
              setStatus("");
            }}
          >
            {p.product.name}
          </li>
        ))}
      </ul>

      {/* EDIT FORM */}
      {draft && metaDraft && (
        <div className="border rounded p-4 bg-light">
          <h5>Category Details</h5>

          <input
            className="form-control mb-2"
            placeholder="Category"
            value={metaDraft.category}
            onChange={(e) =>
              setMetaDraft({ ...metaDraft, category: e.target.value })
            }
          />

          <input
            className="form-control mb-2"
            placeholder="Wear Category"
            value={metaDraft.wearCategory}
            onChange={(e) =>
              setMetaDraft({ ...metaDraft, wearCategory: e.target.value })
            }
          />

          <input
            className="form-control mb-3"
            placeholder="Sub Wear Category"
            value={metaDraft.subWearCategory}
            onChange={(e) =>
              setMetaDraft({ ...metaDraft, subWearCategory: e.target.value })
            }
          />

          <h5>Product Details</h5>

          {["name", "description", "price", "discounted_price", "off_percentage", "ratting"].map(
            (key) => (
              <input
                key={key}
                className="form-control mb-2"
                placeholder={key}
                value={draft[key]}
                onChange={(e) => setDraft({ ...draft, [key]: e.target.value })}
              />
            )
          )}

          {/* Color Variants */}
          <h6 className="mt-3">Color Variants</h6>
          {draft.color_variant.map((colorObj, i) => (
            <div className="d-flex gap-2 mb-2" key={i}>
              {Object.keys(colorObj).map((k) => (
                <input
                  key={k}
                  className="form-control"
                  placeholder={k}
                  value={colorObj[k]}
                  onChange={(e) =>
                    updateVariant("color_variant", i, k, e.target.value)
                  }
                />
              ))}
              <button
                className="btn btn-danger"
                onClick={() => removeVariant("color_variant", i)}
              >
                ❌
              </button>
            </div>
          ))}
          <button
            className="btn btn-secondary mb-3"
            onClick={() => addVariant("color_variant")}
          >
            ➕ Add Color
          </button>

          {/* Size Variants */}
          <h6 className="mt-3">Size Variants</h6>
          {draft.size_variant.map((sizeObj, i) => (
            <div className="d-flex gap-2 mb-2" key={i}>
              {Object.keys(sizeObj).map((k) => (
                <input
                  key={k}
                  className="form-control"
                  placeholder={k}
                  value={sizeObj[k]}
                  onChange={(e) =>
                    updateVariant("size_variant", i, k, e.target.value)
                  }
                />
              ))}
              <button
                className="btn btn-danger"
                onClick={() => removeVariant("size_variant", i)}
              >
                ❌
              </button>
            </div>
          ))}
          <button
            className="btn btn-secondary mb-3"
            onClick={() => addVariant("size_variant")}
          >
            ➕ Add Size
          </button>

          {/* Images */}
          <h6 className="mt-3">Images</h6>
          {draft.images.map((imgObj, index) => (
            <div key={index} className="mb-2">
              {Object.keys(imgObj).map((k) => (
                <input
                  key={k}
                  className="form-control mb-1"
                  placeholder={k}
                  value={imgObj[k]}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      images: [
                        {
                          ...draft.images[index],
                          [k]: convertDriveUrlToDirect(e.target.value),
                        },
                      ],
                    })
                  }
                />
              ))}
            </div>
          ))}

          <div className="d-flex gap-2 mt-3">
            <button className="btn btn-success" onClick={saveAll}>
              💾 Save
            </button>
            <button className="btn btn-danger" onClick={deleteProduct}>
              🗑 Delete
            </button>
          </div>

          {status && <p className="mt-2">{status}</p>}
        </div>
      )}
    </div>
  );
}
