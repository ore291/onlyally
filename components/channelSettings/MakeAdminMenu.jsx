import { IoIosArrowDropdownCircle } from "react-icons/io";
import { FaCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateChannelMemberStart } from "../../store/slices/channelsSlice";

import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";

function MakeAdminMenu({id, slug, adminStatus}) {


  const [modalOpen, setModalOpen] = useState(false);
  const [admin, setAdmin] = useState(adminStatus);

  const dispatch = useDispatch();

  const toggleStatus = (status) => {
    setAdmin(!admin);
    dispatch(
      updateChannelMemberStart({
        user_id: id,
        role: status,
        slug: slug,
      })
    );
  };

  return (
    <Menu as="div" className="relative inline-block text-left z-10">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="inline-flex w-full justify-center rounded-md  py-1 text-sm font-medium  focus:outline-none">
              <IoIosArrowDropdownCircle
                onClick={() => setModalOpen(!modalOpen)}
                className=" h-6 w-6 "
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            show={modalOpen}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="absolute right-0 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() =>{toggleStatus(admin ? "Member" : "Admin")}}
                      className={`${
                        active ? "text-gray-900" : "text-black"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium`}
                    >
                      {admin ? (
                        <svg
                          className="mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width={24}
                          height={24}
                        >
                          <path
                            fill="#4CAF50"
                            d="M10.3125,16.09375a.99676.99676,0,0,1-.707-.293L6.793,12.98828A.99989.99989,0,0,1,8.207,11.57422l2.10547,2.10547L15.793,8.19922A.99989.99989,0,0,1,17.207,9.61328l-6.1875,6.1875A.99676.99676,0,0,1,10.3125,16.09375Z"
                            opacity=".99"
                          />
                          <path
                            fill="#4CAF50"
                            opacity="0.2"
                            d="M12,2A10,10,0,1,0,22,12,10.01146,10.01146,0,0,0,12,2Zm5.207,7.61328-6.1875,6.1875a.99963.99963,0,0,1-1.41406,0L6.793,12.98828A.99989.99989,0,0,1,8.207,11.57422l2.10547,2.10547L15.793,8.19922A.99989.99989,0,0,1,17.207,9.61328Z"
                          />
                        </svg>
                      ) : (
                        <FaRegTimesCircle className="w-5 h-5 text-red-600" />
                      )}
                      Admin
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}

export default MakeAdminMenu;
