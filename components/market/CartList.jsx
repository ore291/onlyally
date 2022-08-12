import React from "react";

function CartList() {
 return (
    <div className="container  md:w-3/4 md:p-8  mt-12">
    <div className="w-full overflow-x-auto">
      <div className="my-2">
        <h3 className="text-xl font-bold tracking-wider">Shopping Cart 3 item</h3>
      </div>
      <table className="w-full shadow-inner">
        <thead>
          <tr className="bg-gray-100">
            <th className="md:px-6 py-3 font-bold whitespace-nowrap">Image</th>
            <th className="md:px-6 py-3 font-bold whitespace-nowrap">Product</th>
            <th className="md:px-6 py-3 font-bold whitespace-nowrap">Qty</th>
            <th className="md:px-6 py-3 font-bold whitespace-nowrap">Price</th>
            <th className="md:px-6 py-3 font-bold whitespace-nowrap">Remove</th>
          </tr>
        </thead>
        <tbody>
         
          <tr>
            <td>
              <div className="flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1537589376225-5405c60a5bd8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8aXBob25lfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                  className="object-cover h-28 w-28 rounded-2xl"
                  alt="image"
                />
              </div>
            </td>
            <td className="p-4 md:px-4 text-center whitespace-nowrap">Iphone 12</td>
            <td className="p-4 md:px-4 text-center whitespace-nowrap">
            <div className="w-20 flex h-8">
                        <button className="w-2/5 border-1 border-stone-650 h-full bg-stone-400">-</button>
                        <input className="w-3/5 border-1 text-lg font-normal border-stone-650 outline-none m-0 p-0  appearance-none"
                         type='number'
                         min="1"
                         max="67"
                         value="1"                 
                         />
                        <button  className="w-2/5 border-1 border-stone-650 h-full bg-stone-400">+</button>
                    </div>
            </td>
            <td className="p-4 md:px-4 text-center whitespace-nowrap">$12,00</td>
            <td className="p-4 md:px-4 text-center whitespace-nowrap">
             <button className="btn"> Remove</button>
            </td>
          </tr>
         


        </tbody>
      </table>
    
    
      
    </div>
  </div>
 )
}

export default CartList;
