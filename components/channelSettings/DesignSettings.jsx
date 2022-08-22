import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import axios from "axios";
import { updateChannelPhotosStart } from "../../store/slices/channelsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { getCookie } from "cookies-next";

const DesignSettings = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState({});
  const { data: channel } = useSelector((state) => state.channels.channelData);

  const [selectedImage, setSelectedImage] = useState();
  const [selectedCover, setSelectedCover] = useState();

  const avatar = useRef();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (event) => {
    event.preventDefault();

    const body = {
      ...data,
      slug: channel.slug,
    };
    // console.log(body);
    dispatch(updateChannelPhotosStart(body));
  };

  const { loading } = useSelector(
    (state) => state.channels.updateChannelPhotos
  );

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      setData({
        ...data,
        avatar: e.target.files[0],
      });
    }
  };
  const coverChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedCover(e.target.files[0]);
      setData({
        ...data,
        cover: e.target.files[0],
      });
    }
  };

  // async function createFile(url) {
  //   let image = await axios.get(url, {
  //     responseType: "arraybuffer",
  //     headers: {
  //       "Access-Control-Allow-Origin": "*",
  //       "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  //       "Access-Control-Allow-Headers": "Authorization",
  //       Authorization: `Bearer ${getCookie("accessToken")}`,
  //     },
  //   });
  //   let raw = Buffer.from(image.data).toString("base64");
  //   setData({
  //     ...data,
  //     avatar: "data:" + image.headers["content-type"] + ";base64," + raw,
  //   });
  //   return "data:" + image.headers["content-type"] + ";base64," + raw;
  // }

  // const toDataURL = (url) =>
  //   fetch(url)
  //     .then((response) => response.blob())
  //     .then(
  //       (blob) =>
  //         new Promise((resolve, reject) => {
  //           const reader = new FileReader();
  //           reader.onloadend = () => resolve(reader.result);
  //           reader.onerror = reject;
  //           reader.readAsDataURL(blob);
  //         })
  //     );

  // function dataURLtoFile(dataurl, filename) {
  //   var arr = dataurl.split(","),
  //     mime = arr[0].match(/:(.*?);/)[1],
  //     bstr = atob(arr[1]),
  //     n = bstr.length,
  //     u8arr = new Uint8Array(n);
  //   while (n--) {
  //     u8arr[n] = bstr.charCodeAt(n);
  //   }
  //   return new File([u8arr], filename);
  // }

  // async function dataUrlToFile(dataUrl) {
  //   const res = await fetch(dataUrl);
  //   const blob = await res.blob();
  //   return new File([blob], `${channel.name.replace(/\s+/g, "")}.jpg`, {
  //     type: "image/jpg",
  //   });
  // }

  // useEffect(() => {
  //   console.log(createFile(channel.avatar));
  // }, []);

  return (
    <>
      <form className="w-full " onSubmit={onSubmit}>
        <div className="w-full relative mb-10">
          <div className="flex flex-wrap gap-2">
            <label
              id="add-img-label"
              className="flex justify-center items-center text-[150%] cursor-pointer w-full bg-[#f3f3f3] h-[250px]  rounded-lg object-cover"
              htmlFor="add-cover-img"
            >
              {!selectedCover && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M14,6L10.25,11L13.1,14.8L11.5,16C9.81,13.75 7,10 7,10L1,18H23L14,6Z"
                  ></path>
                </svg>
              )}
              {selectedCover && (
                <div className="w-full relative h-[250px]">
                  <Image
                    src={URL.createObjectURL(selectedCover)}
                    objectFit="cover"
                    layout="fill"
                    className="object-cover rounded-lg"
                    alt="Thumb"
                  />
                </div>
              )}
            </label>
            <input
              onChange={coverChange}
              type="file"
              name="cover"
              id="add-cover-img"
              accept="image/png, image/gif, image/jpeg"
              className="opacity-0 h-0"
            />
          </div>
          <div className="flex flex-wrap gap-2 centered-axis-xyz p-1 bg-white w-[150px] h-[150px] rounded-full">
            <label
              id="add-img-label"
              className="flex justify-center items-center  text-[150%] cursor-pointer w-full h-full bg-[#f3f3f3]  rounded-full object-cover"
              htmlFor="add-single-img"
            >
              {!selectedImage && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z"
                  />
                </svg>
              )}
              {selectedImage && (
                <div className="w-full relative h-full rounded-full">
                  <Image
                    src={URL.createObjectURL(selectedImage)}
                    objectFit="cover"
                    layout="fill"
                    className="object-cover rounded-full"
                    alt="Thumb"
                  />
                </div>
              )}
            </label>
            <input
              onChange={imageChange}
              ref={avatar}
              type="file"
              id="add-single-img"
              className="opacity-0 h-0"
              name="avatar"
              accept="image/png, image/gif, image/jpeg"
            />
          </div>
        </div>
        <br />
        <div className="w-full row-container mt-12 ">
          <button
            type="submit"
            className="w-32 h-9 rounded-md  bg-lightPlayRed text-white font-medium text-sm row-container"
          >
            {loading ? "Loading..." : "Save"}
          </button>
        </div>
      </form>
    </>
  );
};

export default DesignSettings;
