import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { deleteProduct } from "../connections/cartqueries";
import useImageUrl from "./helpers/useImageUrl";
import useNameandPrice from "./helpers/useNameandPrice";
import { toast } from "react-toastify";

const ProductItem = ({item, index, id, setProducts}) => {
    const userId= id
    const [deleteItem] = useMutation(deleteProduct)
    const [quantity, setQuantity] = useState(1);
    const producto = useNameandPrice(String(4))
    console.log("hola", producto.nombre)
    // Eliminar producto
    const handledeleteProduct = (e, producto) => {
        e.preventDefault();
        deleteItem({
          variables: {
            usuario: userId,
            producto
          },
        }).then(() => {
            setProducts((prevProducts) => prevProducts.filter((p) => p !== item));
            console.log("Producto eliminado")
        })
        .catch(error => {
            console.error("Promesa rechazada:", error);
            toast.error('Hubo un error quitando tu producto... Intenta de nuevo');
        })
    };

    const increment = () =>{
        setQuantity(quantity+1)
    }

    const decrement = () =>{
        if (quantity>1){
            setQuantity(quantity-1)
        }
    }
        
    return(
        <>
            <div id={`Producto ${index}`} className="rounded-lg shadow-xl w-full h-52 mb-5 bg-[#d9d9d9] md:h-60 md:rounded-sm">
                <div className="grid grid-rows-4 grid-cols-3 grid-flow-row h-full"> 
                    <img alt={`Imagen producto ${index}`} src={useImageUrl(String(item.producto)).url} className=" row-start-1 row-end-4 self-center row-span-3 ml-4 rounded-2xl h-4/5 w-11/12 "/>
                    <div className=" row-start-4 ml-6 justify-center flex items-center border-gray-100">
                        <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={decrement}> - </span>
                        <div className="flex justify-center items-center h-8 w-16 border bg-white text-center text-xs outline-none">                                        
                            {quantity} 
                        </div>
                        <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={increment}> + </span>
                    </div>                                    
                    <h2 className=" overflow-hidden whitespace-nowrap text-ellipsis row-start-1 col-span-2 text-xl text-center mt-4 self-start font-text ml-4 "> {useNameandPrice(String(item.producto)).nombre} </h2>
                    <h2 className=" whitespace-nowrap self-center row-start-2 ml-8 font-text text-lg"> <span className="text-green-500">Disponible: </span>  </h2>
                    <h2 className=" self-center text-right mr-9 row-start-2 ml-4 font-text text-lg">${useNameandPrice(String(item.producto)).precio}</h2>
                    <div className="flex items-center justify-center col-start-2 row-start-3 ml-4 col-span-2 ">
                        <button onClick={(e)=> handledeleteProduct(e, item.producto)} className=" w-10/12 h-3/4 rounded-lg font-text text-sm bg-[#fd9200]"> Eliminar del carrito </button>
                    </div>
                    <div className="flex items-center justify-center col-start-2 row-start-4 ml-4 col-span-2 ">
                        <button className="w-10/12 h-3/4 rounded-lg font-text text-sm bg-[#fd9200]"> Guardar para más tarde </button>                                   
                    </div>
                </div>
            </div>               
        </>
    )
}

export default ProductItem;
