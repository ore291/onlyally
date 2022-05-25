import Button from "../Button";
import Image from "next/image";

import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { fetchChannelsStart , channelSubscribeStart} from "../../store/slices/channelsSlice";
import CommonCenterLoader from "../helpers/CommonCenterLoader";

// .filter(filterchannel => !checkMember(filterchannel.members)) code for filtering

const LikedChannels = () => {
  const dispatch = useDispatch();
  const channels = useSelector(state => state.channels.channels.data);
  const user = useSelector(state => state.user.loginData)

  const joinChannel = (slug)=>{
    dispatch(channelSubscribeStart(slug))
  }


  const checkMember = (memberList) =>{
      var members =  memberList.map((member)=>{
        return member.user_id
        
      })

     return members.includes(user.user_id)
  }
  useEffect(() => {
    dispatch(fetchChannelsStart())
    
  }, [])
  return (
    <div className="side-container">
      <p className="text-start font-bold">Channels you may like</p>
      <div className="flex flex-col space-y-2 items-center pb-4">
        <div className="flex space-x-2  justify-center items-center mb-2">
          <Button text="POPULAR" active={true} />
          <Button text="NEWEST" active={false} />
          <Button text="SEE ALL" active={false} />
        </div>
        {
          channels.loading ? (
            <div className="row-container">
              <CommonCenterLoader/>
            </div>
          ) : (
            <>
          
             <div className="grid grid-cols-1 gap-y-2" >
             {
            channels.length > 0 ? (channels.map((channel, i) => (
         
            <div className="grid grid-cols-4 place-content-center items-center justify-center  w-full" key={i}>
              <div className=" w-12 h-12 relative ">
                <Image
                  src="/profile_avatar_full.jpg"
                  alt="side-img"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col space-y-.5 col-span-2 " >
                <p className="font-bold text-sm  text-gray-600 whitespace-nowrap">{channel.name}</p>
                <span className="text-xs font-semibold">{channel.members.length} Subscribers</span>
              </div>
              <div className=" row-container" >
                {
                  checkMember(channel.members) ? (
                    <Button  text="view" active={true}  />
                  ) : <Button  text="Subscribe" active={true} onClick={e => joinChannel(channel.slug)} />
                }
                
              </div>
              
            </div>
         
        ))) : null}
         </div>
            </>
          )
        }
        
      </div>
    </div>
  );
};

export default LikedChannels;
