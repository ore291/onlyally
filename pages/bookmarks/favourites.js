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
              <h1>Favourites</h1>
            </div>
          </section>

         
          {(fansTab === "active" )  && 
                <section className="my-4">
                <h3 className="font-medium">{fansTab.toUpperCase()}</h3>
    
                <div className="block lg:flex justify-between flex-wrap">
                 
                  {!activeFollowers.loading ? activeFollowers.data.followers.map((user, i) => {
                   return (
                    <>
                    <FansCard  user={user} i={i}/>
                    </>
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
    
                <div className="block lg:flex justify-between flex-wrap">
                 
                  {!expiredFollowers.loading ? expiredFollowers.data.followers.map((user, i) => {
                    return (
                      <>
                      <FansCard  user={user} i={i}/>
                      </>
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
    
                <div className="block lg:flex justify-between flex-wrap">
                 
                  {!followers.loading ? followers.data.followers.map((user, i) => {
                     
                     return (
                      <>
                      <FansCard  user={user} i={i}/>
                      </>
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
