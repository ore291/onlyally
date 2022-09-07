import { useEffect, useRef, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProductPicturesStart, userProductPicturesDeleteStart, userProductPicturesSaveStart, userProductViewForOthersStart } from "../../store/slices/productsSlice";
import {ImBin } from "react-icons/im"




function ProductGallery({id}) {
    const productPictures = useSelector(state => state.products.productPictures)
    const productPicturesSave = useSelector(state => state.products.productPicturesSave)
    const [galleryImages, setGalleryImages] = useState(null);

    const fileInput = useRef()
     const   dispatch = useDispatch()
       const  uploadFile = () => {
        fileInput.current.click()
      }
      useEffect(()=> {
        dispatch(fetchUserProductPicturesStart({ user_product_id: id }))
      },  [id])

    const savePicture = (event)=>{
      event.preventDefault();
      
      dispatch(
        userProductPicturesSaveStart({
          user_product_id: id,
          picture: galleryImages.picture,
        })
      );
    }

    const deleteGalleryImage = (id) => {
     dispatch(userProductPicturesDeleteStart({user_product_picture_id : id}))
    }
    const handleChange = (event) => {
      const fileReader = new FileReader();
  
      let file = event.currentTarget.files[0];
  
      fileReader.onloadend = () => {
        setGalleryImages({
          ...galleryImages,
          picture: file,
          previewImage: fileReader.result,
        });
      };
      if (file) {
        fileReader.readAsDataURL(file);
      }
    };
    console.log(productPicturesSave)
    console.log(productPictures)
  return (
    <div className="block lg:flex w-full space-x-5">
      <div className="mt-6 p-2 rounded-md w-full lg:w-[48%] ml-3">
        <div className="pb-5">
        <p className="text-[12px] font-semibold mb-1">Update Product Image</p>
        <div className="w-[100%] h-20 shadow-sm border-2 rounded ">
          <div  onClick={uploadFile}  className=" space-y-1 flex justify-center flex-col items-center text-gray-500 container my-4 ">
            <FaDownload  className="text-[25px] " />
            <p className="text-[12px] font-normal mb-1 t-[15px]">
              Select an image
            </p>
            <input  
             className="hidden" ref={fileInput} type='file'  
              name="picture" accept="image/*"
              onChange={(event) => {
                handleChange(event);
              }}
              />
          </div>
        </div>
        <p className="text-[12px] font-normal mb-1 t-[10px] text-gray-500 ml-3 my-2.5">
          Please upload .jpg .jpeg and ,png format image only
        </p>
        <div onClick={savePicture} className="py-2 my-3 px-2 rounded flex items-center text-white justify-center gap-2 hover:bg-red-700 bg-lightPlayRed cursor-pointer">
          
          <p className="text-xs  font-bold ">{"Add New Products"}</p>
        </div>
        </div>
      </div>
      
      <div className="rounded-md w-[90%] lg:w-[48%] px-3  mt-6 p-2 h-[110%] flex flex-col">
          
          <div className="grid grid-cols-3 gap-4" >
            {(!productPictures.loading && productPictures.data.user_product_pictures)  &&  productPictures.data.user_product_pictures.map((data, i) =>{
               return(
                <div  key={i} className="relative ml-[2rem] flex-1">
                        <ImBin className="absolute text-red-500  hover:text-red-400 cursor-pointer right-2 top-2" 
                        size="20"
                         onClick={() => deleteGalleryImage(data.user_product_picture_id)}
                        />
                 <img src={data.picture} className="w-full " alt="" />
                
                
                </div>
               )
            })}
          </div>

      </div>
   
    </div>
  );
}

export default ProductGallery;
