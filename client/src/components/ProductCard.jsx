import { Link } from "react-router-dom";

export default function ProductCard({product}){

  return(
    <div style={{
      border:"1px solid #ddd",
      borderRadius:"10px",
      padding:"10px",
      textAlign:"center"
    }}>

      <img 
        src={product.image_url} 
        alt={product.name}
        style={{width:"100%",height:"180px",objectFit:"cover"}}
      />

      <h3>{product.name}</h3>

      <p>Rp {product.price}</p>

      <Link to={`/product/${product.id}`}>
        <button>Detail</button>
      </Link>

    </div>
  )

}