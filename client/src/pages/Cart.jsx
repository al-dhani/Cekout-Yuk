import { useEffect, useState } from "react";
import axios from "axios";

export default function Cart(){

  const [cart, setCart] = useState([]);

  const token = localStorage.getItem("token");

  const getCart = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/cart",
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      setCart(res.data);

    } catch(err){
      console.log(err);
    }
  };

  useEffect(()=>{
    getCart();
  },[]);

  const removeItem = async(id)=>{
    try{

      await axios.delete(
        `http://localhost:5000/api/cart/remove/${id}`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      getCart();

    }catch(err){
      console.log(err);
    }
  };

  const total = cart.reduce((sum,item)=>sum + item.subtotal,0);

  return(

    <div style={{padding:"40px"}}>

      <h1>Cart</h1>

      {cart.length === 0 ? (
        <p>Cart masih kosong 🛒</p>
      ) : (

        <div>

          {cart.map((item)=>(
            <div
              key={item.id}
              style={{
                border:"1px solid #ddd",
                padding:"15px",
                marginBottom:"10px",
                borderRadius:"8px",
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center"
              }}
            >

              <div>

                <h3>{item.name}</h3>

                <p>Harga: Rp {item.price}</p>

                <p>Qty: {item.quantity}</p>

                <p>Subtotal: Rp {item.subtotal}</p>

              </div>

              <button
                onClick={()=>removeItem(item.id)}
                style={{
                  background:"red",
                  color:"#fff",
                  border:"none",
                  padding:"8px 12px",
                  borderRadius:"5px",
                  cursor:"pointer"
                }}
              >
                Hapus
              </button>

            </div>
          ))}

          <h2>Total: Rp {total}</h2>

        </div>

      )}

    </div>

  );

}