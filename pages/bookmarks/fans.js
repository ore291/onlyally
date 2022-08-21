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
import FansCard from "../../components/FansCard";

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
    
                <div className="block lg:grid grid-cols-">
                 
                  {!activeFollowers.loading ? activeFollowers.data.followers.map((user, i) => {
                   return (
                
                    <FansCard  user={user} key={i}/>
             
                   )
                  })
                :
                 <h1>loading...</h1>
                }
                </div>
              </section>
        
         }
          {(fansTab === "unsubscribed" )  && 
                <section className="my-4">
                <h3 className="font-medium">{fansTab.toUpperCase()}</h3>
    
                <div className="block lg:grid grid-cols-">
                 
                  {!expiredFollowers.loading ? expiredFollowers.data.followers.map((user, i) => {
                    return (
                   
                      <FansCard  user={user} key={i}/>
                   
                     )
                    
                   })
                :
                 <h1>loading...</h1>
                }
                </div>
              </section>
        
         }


         {(fansTab === "all" )  && 
                <section className="my-4">
                <h3 className="font-medium">{fansTab.toUpperCase()}</h3>
    
                <div className="block lg:grid grid-cols-3">
                 
                  {!followers.loading ? followers.data.followers.map((user, i) => {
                     
                     return (
               
                      <FansCard  user={user}  key={i}/>
                
                     )
                  })
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