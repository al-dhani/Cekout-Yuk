import {useParams} from "react-router-dom"
import {useEffect,useState} from "react"
import axios from "axios"

export default function ProductDetail(){

  const {id} = useParams()

  const [product,setProduct] = useState(null)

  useEffect(()=>{

    axios.get(`http://localhost:5000/api/products/${id}`)
    .then(res=>setProduct(res.data))

  },[id])

  if(!product) return <p>Loading...</p>

  return(

    <div style={{padding:"40px"}}>

      <img src={product.image_url} style={{width:"300px"}}/>

      <h2>{product.name}</h2>

      <p>{product.description}</p>

      <h3>Rp {product.price}</h3>

      <button>Tambah ke Cart</button>

    </div>

  )

}