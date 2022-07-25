import React, { useEffect, useState } from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineWarning,
  AiOutlineStar,
  AiOutlineDollarCircle
} from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineLibraryAddCheck } from "react-icons/md";
import { BsBoxArrowRight, BsThreeDots } from "react-icons/bs";
import ProfileNavItem from "../../components/ProfileNavBar";
import  {
  fetchActiveFollowersStart,
  fetchExpiredFollowersStart,
  fetchFollowersStart,
}   from "../../store/slices/followerSlice"
import { useDispatch, useSelector } from "react-redux";

export default function Fan() {
  const [fansTab, setFansTab] = useState("all")
  const [openFansCardOption, setOpenFansCardOption] = useState(false)
  const changeFansTab = (tab)=> {
    setFansTab(tab)
  } 
  const dispatch = useDispatch()
  const followers = useSelector(state => state.follow.followers)
  const activeFollowers = useSelector(state => state.follow.activeFollowers)
  const expiredFollowers = useSelector(state => state.follow.expiredFollowers)


  useEffect(()=> {
    dispatch(fetchActiveFollowersStart())
    dispatch(fetchExpiredFollowersStart())
    dispatch(fetchFollowersStart())
  }, [])
  

 

  return (
    <>
      <div className="flex flex-col justify-center lg:flex-row">
        <ProfileNavItem color="red" />

        <div className="w-full lg:w-4/5 lg:mr-16 lg:ml-6 bg-white px-4 mx-auto mt-20 shadow py-4">
          <section className="space-y-2  p-4">
            <div className="flex gap-4 items-center uppercase font-semibold">
              <FaArrowLeft size="20px" />
              <h1>Fans</h1>
            </div>
          </section>

          <div className="border-b-2 pb-2 block lg:flex items-center gap-4">
            <article onClick={()=>changeFansTab("active")} className={fansTab === "active"  ? "flex gap-2 border-b-4 border-red-600 pr-2 cursor-pointer"  : "flex gap-2 pr-2  cursor-pointer"}>
              <AiOutlineCheckCircle size="20px" />
              <p>Active</p>
            </article>
            <article onClick={()=>changeFansTab("unsubscribed")}  className={fansTab === "unsubscribed"  ? "flex gap-2 border-b-4 border-red-600 pr-2  cursor-pointer"  : "flex gap-2 pr-2  cursor-pointer"}>
              <AiOutlineWarning size="20px" />
              <p>Unsubscribed</p>
            </article>
            <article onClick={()=>changeFansTab("all")}  className={fansTab === "all"  ? "flex gap-2 border-b-4 border-red-600 pr-2  cursor-pointer"  : "flex gap-2 border p-2 dotted  cursor-pointer"}>
              <MdOutlineLibraryAddCheck size="20px" />
              <p>ALL</p>
            </article>
          </div>
          {(fansTab === "active" )  && 
                <section className="my-4">
                <h3 className="font-medium">{fansTab.toUpperCase()}</h3>
    
                <div className="block lg:flex justify-between flex-wrap">
                 
                  {!activeFollowers.loading ? activeFollowers.data.followers.map((EachUser, i) => (
                    <article
                    className="w-full  lg:w-1/3 border-2 border-grey-500 "
                    key={i}
                  >
                    <div className="bg-[url('/images/settings/grey.jpg')] h-32 flex justify-end items-end">
                      {/* <p className="text-white text-3xl">...</p> */}
                      <BsThreeDots onClick={() => setOpenFansCardOption(!openFansCardOption)} size="23" className="text-white  mr-3 m-1 cursor-pointer  hover:border-2 p-1 hover:rounded-full"/>
                    </div>
  
                    <section className="flex w-full justify-between relative ">
                   {openFansCardOption  &&
                   
                    <section className="w-4/5 absolute  bg-white ml-2 pl-1 rounded-b-lg"   >
                        <ul className="list-none">
                          <li className="p-2 hover:bg-grey-500 font-medium hover:text-red-600 cursor-pointer">Copy link to profile </li>
                          <li className="p-2 hover:bg-grey-500 font-medium hover:text-red-600 cursor-pointer">Block the user </li>
                          <li className="p-2  hover:bg-grey-500  font-medium hover:text-red-600 cursor-pointer">Unsubscribe</li>
                        </ul>
                      </section>
                   }
                      <img
                        width="100px"
                        src={EachUser.picture}
                        className="rounded-full mx-2 mt-[-50px]"
                        alt="Placeholder"
                      />
                      <div>
                        <h2 className="text-2xl  font-semibold">{EachUser.username}</h2>
                        <p>@{EachUser.u_unique_id}</p>
                      </div>
                      <div className=" flex  justify-center items-center flex-1 ">
                        <div  className="h-10 w-10 p-1 justify-center items-center flex  border-2 border-gray-400 hover:scale-105 cursor-pointer rounded-full">

                      <BsBoxArrowRight className="text-blue-400  " size="20" />
                        </div>
                      </div>
                    </section>
  
                    <div className="pb-4  mx-2">
                  
                      <section className="my-4 ml-2  w-fit bg-gray-200 text-xs font-semibold  rounded-md p-1 flex gap-4 items-center">
                        <AiOutlineStar />
                         Remove from Favorites
                      </section>
                      <div className="text-center">
                        <button className="flex justify-center items-center h-10 bg-red-600 uppercase text-base rounded-full w-full ">
                         <AiOutlineDollarCircle className="ml-3"  size="23"/>
                         <p  className="flex-1 text-white"> TIP</p>
                        </button>
                      </div>
                    </div>
                  </article>
                  ))
                :
                 <h1>loading...</h1>
                }
                </div>
              </section>
        
         }
          {(fansTab === "unsubscribed" )  && 
                <section className="my-4">
                <h3 className="font-medium">{fansTab.toUpperCase()}</h3>
    
                <div className="block lg:flex justify-between flex-wrap">
                 
                  {!expiredFollowers.loading ? expiredFollowers.data.followers.map((EachUser, i) => (
                     <article
                     className="w-full  lg:w-1/3 border-2 border-grey-500 "
                     key={i}
                   >
                     <div className="bg-[url('/images/settings/grey.jpg')] h-32 flex justify-end items-end">
                       {/* <p className="text-white text-3xl">...</p> */}
                       <BsThreeDots onClick={() => setOpenFansCardOption(!openFansCardOption)} size="23" className="text-white  mr-3 m-1 cursor-pointer  hover:border-2 p-1 hover:rounded-full"/>
                     </div>
   
                     <section className="flex w-full justify-between relative ">
                    {openFansCardOption  &&
                    
                     <section className="w-4/5 absolute  bg-white ml-2 pl-1 rounded-b-lg"   >
                         <ul className="list-none">
                           <li className="p-2 hover:bg-grey-500 font-medium hover:text-red-600 cursor-pointer">Copy link to profile </li>
                           <li className="p-2 hover:bg-grey-500 font-medium hover:text-red-600 cursor-pointer">Block the user </li>
                           <li className="p-2  hover:bg-grey-500  font-medium hover:text-red-600 cursor-pointer">Unsubscribe</li>
                         </ul>
                       </section>
                    }
                       <img
                         width="100px"
                         src={EachUser.picture}
                         className="rounded-full mx-2 mt-[-50px]"
                         alt="Placeholder"
                       />
                       <div>
                         <h2 className="text-2xl  font-semibold">{EachUser.username}</h2>
                         <p>@{EachUser.u_unique_id}</p>
                       </div>
                       <div className=" flex  justify-center items-center flex-1 ">
                         <div  className="h-10 w-10 p-1 justify-center items-center flex  border-2 border-gray-400 hover:scale-105 cursor-pointer rounded-full">

                       <BsBoxArrowRight className="text-blue-400  " size="20" />
                         </div>
                       </div>
                     </section>
   
                     <div className="pb-4  mx-2">
                   
                       <section className="my-4 ml-2  w-fit bg-gray-200 text-xs font-semibold  rounded-md p-1 flex gap-4 items-center">
                         <AiOutlineStar />
                          Remove from Favorites
                       </section>
                       <div className="text-center">
                         <button className="flex justify-center items-center h-10 bg-red-600 uppercase text-base rounded-full w-full ">
                          <AiOutlineDollarCircle className="ml-3"  size="23"/>
                          <p  className="flex-1 text-white"> TIP</p>
                         </button>
                       </div>
                     </div>
                   </article>
                  ))
                :
                 <h1>loading...</h1>
                }
                </div>
              </section>
        
         }


         {(fansTab === "all" )  && 
                <section className="my-4">
                <h3 className="font-medium">{fansTab.toUpperCase()}</h3>
    
                <div className="block lg:flex justify-between flex-wrap">
                 
                  {!followers.loading ? followers.data.followers.map((EachUser, i) => (
                    <article
                      className="w-full  lg:w-1/3 border-2 border-grey-500 "
                      key={i}
                    >
                      <div className="bg-[url('/images/settings/grey.jpg')] h-32 flex justify-end items-end">
                        {/* <p className="text-white text-3xl">...</p> */}
                        <BsThreeDots onClick={() => setOpenFansCardOption(!openFansCardOption)} size="23" className="text-white  mr-3 m-1 cursor-pointer  hover:border-2 p-1 hover:rounded-full"/>
                      </div>
    
                      <section className="flex w-full justify-between relative ">
                     {openFansCardOption  &&
                     
                      <section className="w-4/5 absolute  bg-white ml-2 pl-1 rounded-b-lg"   >
                          <ul className="list-none">
                            <li className="p-2 hover:bg-grey-500 font-medium hover:text-red-600 cursor-pointer">Copy link to profile </li>
                            <li className="p-2 hover:bg-grey-500 font-medium hover:text-red-600 cursor-pointer">Block the user </li>
                            <li className="p-2  hover:bg-grey-500  font-medium hover:text-red-600 cursor-pointer">Unsubscribe</li>
                          </ul>
                        </section>
                     }
                        <img
                          width="100px"
                          src={EachUser.picture}
                          className="rounded-full mx-2 mt-[-50px]"
                          alt="Placeholder"
                        />
                        <div>
                          <h2 className="text-2xl  font-semibold">{EachUser.username}</h2>
                          <p>@{EachUser.u_unique_id}</p>
                        </div>
                        <div className=" flex  justify-center items-center flex-1 ">
                          <div  className="h-10 w-10 p-1 justify-center items-center flex  border-2 border-gray-400 hover:scale-105 cursor-pointer rounded-full">

                        <BsBoxArrowRight className="text-blue-400  " size="20" />
                          </div>
                        </div>
                      </section>
    
                      <div className="pb-4  mx-2">
                    
                        <section className="my-4 ml-2  w-fit bg-gray-200 text-xs font-semibold  rounded-md p-1 flex gap-4 items-center">
                          <AiOutlineStar />
                           Remove from Favorites
                        </section>
                        <div className="text-center">
                          <button className="flex justify-center items-center h-10 bg-red-600 uppercase text-base rounded-full w-full ">
                           <AiOutlineDollarCircle className="ml-3"  size="23"/>
                           <p  className="flex-1 text-white"> TIP</p>
                          </button>
                        </div>
                      </div>
                    </article>
                  ))
                :
                 <h1>loading...</h1>
                }
                </div>
              </section>
        
         }
          
        </div>
      </div>
    </>
  );
}