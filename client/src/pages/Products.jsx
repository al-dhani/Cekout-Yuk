import {useEffect,useState} from "react"
import axios from "axios"
import ProductCard from "../components/ProductCard"

export default function Products(){

  const [products,setProducts] = useState([])

  useEffect(()=>{

    axios.get("http://localhost:5000/api/products")
    .then(res=>setProducts(res.data))
    .catch(err=>console.log(err))

  },[])

  return(

    <div style={{padding:"30px"}}>

      <h1>Products</h1>

      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",
        gap:"20px"
      }}>

        {products.map(p=>(
          <ProductCard key={p.id} product={p}/>
        ))}

      </div>

    </div>

  )

}