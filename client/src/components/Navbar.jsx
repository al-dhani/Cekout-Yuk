import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{display:"flex",justifyContent:"space-between",padding:"15px",background:"#111",color:"#fff"}}>
      
      <h2>MyStore</h2>

      <div style={{display:"flex",gap:"20px"}}>
        <Link to="/" style={{color:"#fff"}}>Home</Link>
        <Link to="/products" style={{color:"#fff"}}>Produk</Link>
        <Link to="/cart" style={{color:"#fff"}}>Cart</Link>
        <Link to="/orders" style={{color:"#fff"}}>Orders</Link>
      </div>

    </nav>
  );
}