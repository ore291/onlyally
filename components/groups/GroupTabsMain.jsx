import { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import GroupCard from "./GroupCard";
import {useSelector} from "react-redux";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const GroupTabs = () => {
    const user = useSelector(state => state.user.profile.data)
    const groupsData = useSelector(state => state.groups.groups)

  const checkMember = (memberList) =>{
    var members =  memberList.map((member)=>{
      return member.user_id
      
    })
   return members.includes(user.user_id)
}


const [groupValues, setGroupValues] = useState([])

const filtered = groupValues.filter(filterchannel => checkMember(filterchannel.members)) 

useEffect(() => {
    setGroupValues(Object.values(groupsData.data))
},[groupsData])


console.log(filtered);
console.log(groupsData.data);

  let [categories] = useState([
    "Subscribed Groups",
    "Suggested Groups",
    "My Groups",
  ]);

  let [groups] = useState([
    "Recently added",
    "Family",
    "University",
    "more"
  ])


  return (
    <Tab.Group>
      <div className="bg-white rounded-2xl p-1 pb-5 shadow-md">
        <h1 className="text-3xl font-semibold pl-2 py-3">Groups</h1>
        <Tab.List>
          <div className="flex items-center space-x-3 py-3 overflow-x-scroll scrollbar-thin flex-shrink-0">
            {categories.map((category, index) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  classNames(
                    " whitespace-nowrap p-2 text-sm leading-5 font-medium",
                    "focus:outline-none focus:ring-0 ",
                    selected
                      ? "bg-[#FFCFD4] text-textPlayRed rounded-full shadow-lg"
                      : "text-gray-800 bg-white rounded-full shadow-lg"
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </div>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
            {/* subscribed groups */}
            {
              groupsData.loading ?   (
              null
          ) : 
          
          (<div className="p-2 pb-5 flex overflow-x-scroll space-x-4 py-1 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scroll-smooth scrollbar-track-white">
          {groupValues.length > 0 && groupValues.filter(filterchannel => checkMember(filterchannel.members)).map((group, index) => (
            <GroupCard key={index} group={group} groupsPage={true} />
          ))}
        </div>)
            }
            

          </Tab.Panel>
          <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
          {
              groupsData.loading ?   (
              null
          ) : 
          
          (<div className="p-2 pb-5 flex overflow-x-scroll space-x-4 py-1 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scroll-smooth scrollbar-track-white">
          {groupValues.length > 0 && groupValues.filter(filterchannel => !checkMember(filterchannel.members)).map((group, index) => (
            <GroupCard key={index} group={group} groupsPage={true} />
          ))}
        </div>)
            }
            
          </Tab.Panel>
          <Tab.Panel className={classNames("bg-white rounded-xl p-1")}>
          {
              groupsData.loading ?   (
              null
          ) : 
          
          (<div className="p-2 pb-5 flex overflow-x-scroll space-x-4 py-1 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scroll-smooth scrollbar-track-white">
          {groupValues.length > 0 && groupValues.filter(filterchannel => filterchannel.user_id === user.user_id).map((group, index) => (
            <GroupCard key={index} group={group} groupsPage={true} />
          ))}
        </div>)
            }
          </Tab.Panel>
        </Tab.Panels>
      </div>
    </Tab.Group>
  );
};

export default GroupTabs;
