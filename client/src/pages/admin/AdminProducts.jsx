import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/AdminLayout";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "", description: "", price: "", stock: "", category_id: "", image: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const token = localStorage.getItem("token");

  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) { console.log(err); }
  };

  const getCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);
    } catch (err) { console.log(err); }
  };

  useEffect(() => { getProducts(); getCategories(); }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const resetForm = () => {
    setFormData({ name: "", description: "", price: "", stock: "", category_id: "", image: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const addProduct = async () => {
    try {
      await axios.post("http://localhost:5000/api/products", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      resetForm();
      getProducts();
    } catch (err) { console.log(err); }
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name, description: product.description,
      price: product.price, stock: product.stock,
      category_id: product.category_id, image: product.image
    });
    setShowForm(true);
  };

  const updateProduct = async () => {
    try {
      await axios.put(`http://localhost:5000/api/products/${editingId}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      resetForm();
      getProducts();
    } catch (err) { console.log(err); }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Yakin hapus product?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      getProducts();
    } catch (err) { console.log(err); }
  };

  return (
    <AdminLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .prod-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          min-height: 100vh;
          background: linear-gradient(135deg, #f0f7f4 0%, #e8f4fb 50%, #f5f0ff 100%);
          padding: 32px 36px;
          flex: 1;
        }

        .prod-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
        }

        .prod-header-left {}

        .prod-greeting {
          font-size: 13px;
          font-weight: 500;
          color: #20d2b4;
          letter-spacing: 0.3px;
          margin-bottom: 4px;
        }

        .prod-title {
          font-size: 30px;
          font-weight: 800;
          color: #0f1923;
          letter-spacing: -0.8px;
          line-height: 1.1;
        }

        .prod-subtitle {
          font-size: 14px;
          color: #7a9baa;
          margin-top: 4px;
          font-weight: 400;
        }

        .btn-add-product {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #20d2b4, #38b2e8);
          color: #0f1923;
          font-size: 13px;
          font-weight: 700;
          padding: 11px 20px;
          border-radius: 12px;
          cursor: pointer;
          border: none;
          font-family: 'Plus Jakarta Sans', sans-serif;
          letter-spacing: 0.1px;
          box-shadow: 0 4px 16px rgba(32,210,180,0.3);
          transition: opacity 0.2s, transform 0.2s;
        }

        .btn-add-product:hover { opacity: 0.88; transform: translateY(-1px); }

        /* Form Card */
        .form-card {
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 2px 20px rgba(0,0,0,0.06);
          border: 1px solid rgba(255,255,255,0.9);
          padding: 24px 28px;
          margin-bottom: 24px;
          animation: slideDown 0.2s ease;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .form-card-title {
          font-size: 15px;
          font-weight: 700;
          color: #0f1923;
          margin-bottom: 20px;
          letter-spacing: -0.3px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .form-card-title span {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: linear-gradient(135deg, #20d2b4, #38b2e8);
          display: inline-block;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-bottom: 18px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-group.full { grid-column: 1 / -1; }

        .form-label {
          font-size: 11px;
          font-weight: 700;
          color: #92a8b5;
          text-transform: uppercase;
          letter-spacing: 0.6px;
        }

        .form-input, .form-select {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          color: #0f1923;
          background: #f8fbfd;
          border: 1.5px solid #e2edf3;
          border-radius: 10px;
          padding: 10px 14px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          width: 100%;
          box-sizing: border-box;
        }

        .form-input:focus, .form-select:focus {
          border-color: #20d2b4;
          box-shadow: 0 0 0 3px rgba(32,210,180,0.12);
          background: #fff;
        }

        .form-input::placeholder { color: #b0c8d4; }

        .form-actions {
          display: flex;
          gap: 10px;
          justify-content: flex-end;
        }

        .btn-submit {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px;
          font-weight: 700;
          padding: 10px 22px;
          border-radius: 10px;
          cursor: pointer;
          border: none;
          letter-spacing: 0.1px;
          transition: opacity 0.2s;
        }

        .btn-submit.save {
          background: linear-gradient(135deg, #20d2b4, #38b2e8);
          color: #0f1923;
          box-shadow: 0 4px 14px rgba(32,210,180,0.25);
        }

        .btn-submit.cancel {
          background: rgba(0,0,0,0.05);
          color: #7a9baa;
        }

        .btn-submit:hover { opacity: 0.85; }

        /* Table Card */
        .table-card {
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 2px 20px rgba(0,0,0,0.05);
          border: 1px solid rgba(255,255,255,0.9);
          overflow: hidden;
        }

        .table-card-header {
          padding: 20px 24px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }

        .table-card-title {
          font-size: 15px;
          font-weight: 700;
          color: #0f1923;
          letter-spacing: -0.3px;
        }

        .table-count {
          font-size: 12px;
          font-weight: 600;
          color: #20d2b4;
          background: rgba(32,210,180,0.1);
          padding: 4px 12px;
          border-radius: 20px;
        }

        .prod-table { width: 100%; border-collapse: collapse; }

        .prod-table th {
          font-size: 11px;
          font-weight: 700;
          color: #92a8b5;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          padding: 12px 20px;
          text-align: left;
          background: rgba(0,0,0,0.015);
        }

        .prod-table td {
          padding: 14px 20px;
          font-size: 13.5px;
          color: #2d4a5a;
          font-weight: 500;
          border-top: 1px solid rgba(0,0,0,0.04);
          vertical-align: middle;
        }

        .prod-table tr:hover td { background: rgba(32,210,180,0.03); }

        .prod-id {
          font-size: 12px;
          font-weight: 700;
          color: #b0c8d4;
          background: rgba(0,0,0,0.04);
          padding: 3px 8px;
          border-radius: 6px;
        }

        .prod-img {
          width: 48px;
          height: 48px;
          object-fit: cover;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.10);
        }

        .prod-img-placeholder {
          width: 48px;
          height: 48px;
          border-radius: 10px;
          background: linear-gradient(135deg, rgba(32,210,180,0.1), rgba(56,178,232,0.1));
          display: flex;
          align-items: center;
          justify-content: center;
          color: #b0c8d4;
        }

        .prod-name { font-weight: 700; color: #0f1923; }
        .prod-desc { color: #92a8b5; font-size: 12.5px; max-width: 180px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        .cat-badge {
          display: inline-flex;
          align-items: center;
          font-size: 12px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 20px;
          background: rgba(56,178,232,0.10);
          color: #38b2e8;
        }

        .price-text { font-weight: 700; color: #0f1923; }

        .stock-badge {
          display: inline-flex;
          align-items: center;
          font-size: 12px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 20px;
        }

        .stock-ok { background: rgba(32,210,180,0.10); color: #20d2b4; }
        .stock-low { background: rgba(245,87,108,0.10); color: #f5576c; }

        .action-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          padding: 6px 12px;
          border-radius: 8px;
          cursor: pointer;
          border: none;
          transition: opacity 0.2s;
          margin-right: 6px;
        }

        .action-btn.edit {
          background: rgba(56,178,232,0.10);
          color: #38b2e8;
        }

        .action-btn.delete {
          background: rgba(245,87,108,0.10);
          color: #f5576c;
        }

        .action-btn:hover { opacity: 0.75; }

        .empty-state {
          text-align: center;
          padding: 48px 24px;
          color: #b0c8d4;
        }

        .empty-state-icon { font-size: 40px; margin-bottom: 12px; }
        .empty-state-text { font-size: 14px; font-weight: 500; }

        @media (max-width: 900px) {
          .form-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <div className="prod-root">
        {/* Header */}
        <div className="prod-header">
          <div className="prod-header-left">
            <div className="prod-greeting">📦 Manajemen Produk</div>
            <div className="prod-title">Products</div>
            <div className="prod-subtitle">Kelola semua produk toko kamu di sini</div>
          </div>
          <button
            className="btn-add-product"
            onClick={() => { resetForm(); setShowForm(true); }}
          >
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            Tambah Produk
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="form-card">
            <div className="form-card-title">
              <span />
              {editingId ? "Edit Produk" : "Tambah Produk Baru"}
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Nama Produk</label>
                <input className="form-input" type="text" name="name" placeholder="Masukkan nama produk" value={formData.name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label">Harga</label>
                <input className="form-input" type="number" name="price" placeholder="0" value={formData.price} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label">Stok</label>
                <input className="form-input" type="number" name="stock" placeholder="0" value={formData.stock} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label">Kategori</label>
                <select className="form-select" name="category_id" value={formData.category_id} onChange={handleChange}>
                  <option value="">Pilih Kategori</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">URL Gambar</label>
                <input className="form-input" type="text" name="image" placeholder="https://..." value={formData.image} onChange={handleChange} />
              </div>
              <div className="form-group full">
                <label className="form-label">Deskripsi</label>
                <input className="form-input" type="text" name="description" placeholder="Deskripsi singkat produk..." value={formData.description} onChange={handleChange} />
              </div>
            </div>
            <div className="form-actions">
              <button className="btn-submit cancel" onClick={resetForm}>Batal</button>
              <button className="btn-submit save" onClick={editingId ? updateProduct : addProduct}>
                {editingId ? (
                  <>
                    <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Simpan Perubahan
                  </>
                ) : (
                  <>
                    <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                    Tambah Produk
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="table-card">
          <div className="table-card-header">
            <span className="table-card-title">Daftar Produk</span>
            <span className="table-count">{products.length} produk</span>
          </div>
          <table className="prod-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Gambar</th>
                <th>Produk</th>
                <th>Kategori</th>
                <th>Harga</th>
                <th>Stok</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="7">
                    <div className="empty-state">
                      <div className="empty-state-icon">📭</div>
                      <div className="empty-state-text">Belum ada produk. Tambahkan produk pertama kamu!</div>
                    </div>
                  </td>
                </tr>
              ) : (
                products.map((product) => {
                  const category = categories.find((c) => c.id === product.category_id);
                  return (
                    <tr key={product.id}>
                      <td><span className="prod-id">#{product.id}</span></td>
                      <td>
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="prod-img" />
                        ) : (
                          <div className="prod-img-placeholder">
                            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                              <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                              <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
                              <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                          </div>
                        )}
                      </td>
                      <td>
                        <div className="prod-name">{product.name}</div>
                        <div className="prod-desc">{product.description}</div>
                      </td>
                      <td>
                        <span className="cat-badge">{category ? category.name : "Unknown"}</span>
                      </td>
                      <td>
                        <span className="price-text">Rp {Number(product.price).toLocaleString("id-ID")}</span>
                      </td>
                      <td>
                        <span className={`stock-badge ${product.stock > 10 ? "stock-ok" : "stock-low"}`}>
                          {product.stock} pcs
                        </span>
                      </td>
                      <td>
                        <button className="action-btn edit" onClick={() => startEdit(product)}>
                          <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                          Edit
                        </button>
                        <button className="action-btn delete" onClick={() => deleteProduct(product.id)}>
                          <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
                            <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Hapus
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}