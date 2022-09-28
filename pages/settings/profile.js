import React, { useState, useEffect } from "react";
import ProfileNavItem from "../../components/ProfileNavBar";
import Multiselect from "multiselect-react-dropdown";
import {
  editUserDetails,
  userNameValidationStart,
  updateUserDetailsStart,
} from "../../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import imageCompression from "browser-image-compression";
import Image from "next/image";
import { fetchUserDetailsStart } from "../../store/slices/userSlice";
import CropImageModal from "../../components/Profile/CropImageModal";
import Link from "next/link";

const options = [
  {
    name: "Rather Not Select",
    value: "rather-not-select",
    id: 1,
  },
  {
    name: "Male",
    value: "male",
    id: 2,
  },
  {
    name: "Female",
    value: "female",
    id: 3,
  },
  {
    name: "Others",
    value: "others",
    id: 4,
  },
];

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const validation = useSelector((state) => state.user.validationInputData);
  const profileInputData = useSelector((state) => state.user.profileInputData);

  const [profileInputData1, setProfileInputData1] = useState({});

  const userGender = useState([[profile.data.gender]]);

  useEffect(() => {
    if (profile.loading || profile.data !== null)
      dispatch(fetchUserDetailsStart());
  }, []);

  // const [first, setFirst] = useState({
  //   plan: "",
  // });

  // console.log(profile.data.pro_membership_logs[0].plan)

  // useEffect(() => {
  //   const name = profile?.data?.pro_membership_logs?.find(
  //     (e) => typeof e !== "undefined"
  //   );
  //   // if (profile.loading || profile.data !== null) dispatch(fetchUserDetailsStart());
  //   profile.data.pro_membership_logs[0] !== null &&
  //     setFirst({
  //       ...first,
  //       plan: name.plan,
  //     });
  // }, [profile.data]);

  const handleCategoryEdit = (data) => {
    dispatch(editUserDetails(data));
  };
  const handleUsernameValidation = (event, username, value) => {
    event.preventDefault();
    dispatch(editUserDetails(username, value));
    dispatch(userNameValidationStart({ username: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.keys(profileInputData1).length > 0)
      dispatch(updateUserDetailsStart(profileInputData1));
    else dispatch(updateUserDetailsStart());
  };

  const [image, setImage] = useState({
    picture: "",
    cover: "",
  });

  const [cropModalFlag, setCropModalFlag] = useState({
    flag: false,
    image: "",
    width: "",
    height: "",
    shape: "",
    type: "",
    fileType: "",
    fileName: "",
  });

  const handleCoverChangeImage = (event) => {
    if (event.currentTarget.type === "file") {
      const currentfileType = event.currentTarget.files[0].type;
      const currentfileName = event.currentTarget.files[0].name;
      let coverReader = new FileReader();
      let coverFile = event.currentTarget.files[0];
      let imageFile = event.currentTarget.files[0];
      let currentInputName = event.currentTarget.name;
      var options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      imageCompression(imageFile, options)
        .then(function (compressedFile) {
          var covercroppedReader = new FileReader();
          covercroppedReader.readAsDataURL(compressedFile);
          covercroppedReader.onloadend = function () {
            var coverbase64 = covercroppedReader.result;

            setCropModalFlag({
              ...cropModalFlag,
              image: coverbase64,
              width: 95,
              height: 25,
              shape: "rect",
              flag: true,
              type: "cover",
              fileType: currentfileType,
              fileName: currentfileName,
            });
          };
        })
        .catch(function (error) {
          console.log(error.message);
        });

      if (coverFile) {
        coverReader.readAsDataURL(coverFile);
      }
    }
  };

  const handleChangeImage = (event) => {
    if (event.currentTarget.type === "file") {
      const currentfileType = event.currentTarget.files[0].type;
      const currentfileName = event.currentTarget.files[0].name;
      let reader = new FileReader();
      let file = event.currentTarget.files[0];
      let imageFile = event.currentTarget.files[0];
      let currentInputName = event.currentTarget.name;

      var options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      imageCompression(imageFile, options)
        .then(function (compressedFile) {
          var croppedReader = new FileReader();
          croppedReader.readAsDataURL(compressedFile);
          croppedReader.onloadend = function () {
            var base64data = croppedReader.result;

            if (currentInputName === "picture") {
              setCropModalFlag({
                ...cropModalFlag,
                image: base64data,
                width: 1,
                height: 1,
                shape: "round",
                flag: true,
                type: "picture",
                fileType: currentfileType,
                fileName: currentfileName,
              });
            }
          };
        })
        .catch(function (error) {
          console.log(error.message);
        });

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  const closeCropModal = () => {
    setCropModalFlag({
      flag: false,
      image: "",
      width: "",
      height: "",
      shape: "",
      cropedProfileImage: "",
      cropedCoverImage: "",
      type: "",
      fileType: "",
      fileName: "",
    });
  };

  return (
    <>
      <div className="flex flex-col justify-center lg:flex-row">
        <ProfileNavItem />
        <div className="w-full lg:w-4/5 bg-white px-4 mx-auto mt-5 lg:mr-16 lg:ml-6 border-2 border-gray-500 rounded-md shadow py-4 space-y-6">
          <section className="space-y-2 ">
            <h1 className="font-semibold text-gray-400 uppercase">
              Edit Profile
            </h1>
            <p className="font-semibold text-gray-400  uppercase">
              Change Profile and Cover PHOTO
            </p>

            <div className="shadow-md">
              <section className="relative w-full  h-64 rounded-md pb-8 bg-cover bg-center px-4 ">
                <img
                  src={image.cover === "" ? profile.data.cover : image.cover}
                  className="w-full h-full object-cover"
                  alt=""
                />
                <form id="coverForm" action="#">
                  <input
                    className="hidden-input hidden"
                    id="changeCover"
                    type="file"
                    name="cover"
                    accept="image/*"
                    onChange={handleCoverChangeImage}
                  />
                  <label
                    className="absolute  right-5 bottom-2 btn p-4 text-sm font-medium bg-red-600 rounded-md mb-0 w-[200px] h-10 row-container cursor-pointer"
                    htmlFor="changeCover"
                    title="Change cover"
                  >
                    Upload Cover
                  </label>
                </form>
                <form id="pictureForm" action="#">
                  <input
                    className="hidden-input hidden"
                    id="changeImage"
                    type="file"
                    name="picture"
                    accept="image/*"
                    onChange={handleChangeImage}
                  />
                  <label
                    htmlFor="changeImage"
                    className=" absolute -bottom-16 left-10  z-10 p-0.5 bg-white rounded-full cursor-pointer"
                  >
                    <img
                      width="150"
                      height="150"
                      className="rounded-full w-[150px] h-[150px] object-cover"
                      src={
                        image.picture === ""
                          ? profile.data.picture
                          : image.picture
                      }
                      alt="profile-pic"
                    />
                  </label>
                </form>
              </section>

              <section className="pl-8 pr-2 pb-4 flex mt-6 md:mt-0 justify-end ">
                {" "}
                <form id="pictureForm" className="flex items-center" action="#">
                  <input
                    className="hidden-input hidden"
                    id="changeImage"
                    type="file"
                    name="picture"
                    accept="image/*"
                    onChange={handleChangeImage}
                  />
                  <label htmlFor="changeImage">
                    <div className="border-2 border-red-600 px-2 lg:px-4 py-2 cursor-pointer text-xs lg:text-lg rounded-lg shadow-md text-red-700 font-bold hover:bg-red-500 hover:text-white transition duration-150 ">
                      Upload profile photo
                    </div>
                  </label>
                  <label htmlFor="story-button">
                    <button
                      name="story-button"
                      type="button"
                      className="border-2 border-red-600 px-2 lg:px-4 py-2 cursor-pointer text-xs lg:text-lg rounded-lg shadow-md text-red-700 font-bold  hover:bg-red-500 hover:text-white transition duration-150 "
                    >
                      Upload Feature Story
                    </button>
                  </label>
                </form>
              </section>
            </div>
            <p className="font-semibold text-gray-400 text-sm ">
              Use 144px * 144px for profile and 1960 * 960px for cover picture.
              Accept .jpg .jpeg .png and .svg format images.
            </p>
          </section>

          <section className="block lg:flex gap-12 text-gray-500 mt-8">
            <article className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="" className="font-medium text-lg">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder=""
                  className="border-gray-500 rounded-md"
                  defaultValue={profile.data.name}
                  onChange={(event) => {
                    dispatch(
                      editUserDetails({
                        name: event.currentTarget.name,
                        value: event.currentTarget.value,
                      })
                    );
                  }}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="" className="font-medium text-lg">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="Enter Email"
                  className="border-gray-500 rounded-md"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="" className="font-medium text-lg">
                  Birthday
                </label>
                <input
                  type="date"
                  placeholder="Enter Date"
                  className="border-gray-500 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="font-medium text-lg">
                  Gender
                </label>
                {/* <input
                  type="text"
                  placeholder="Enter Gender"
                  className="border-gray-500 rounded-md"
                /> */}
                <Multiselect
                  name="gender"
                  options={options}
                  displayValue="name"
                  selectedValues={[
                    { name: profile.data.gender, value: profile.data.gender },
                  ]}
                  placeholder="choose gender"
                  onSelect={(value) =>
                    dispatch(
                      editUserDetails({
                        name: "gender",
                        value: value[0].value,
                      })
                    )
                  }
                  singleSelect={true}
                />
              </div>
            </article>

            <article className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="" className="font-medium text-lg">
                  User Name
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder=""
                  name="username"
                  className="border-gray-500 rounded-md"
                  defaultValue={profile.data.username}
                  onChange={(event) =>
                    handleUsernameValidation(
                      event,
                      event.currentTarget.name,
                      event.currentTarget.value
                    )
                  }
                  // isValid={validation.isValid}
                  // isInvalid={validation.isInValid}
                />
                {validation.isInValid ? (
                  <span className="text-xs text-red-500 font-light text-right">
                    Username already taken, Please try another
                  </span>
                ) : (
                  ""
                )}
                {validation.isValid ? (
                  <span className="text-xs text-green-500 font-light text-right">
                    Looks Good, the username is availaible
                  </span>
                ) : (
                  ""
                )}
              </div>

              <div className="flex flex-col">
                {/* <label htmlFor="" className="font-medium text-lg">
                  User Category
                </label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  className="border-gray-500 rounded-md"
                /> */}
                {profile &&
                profile.data.categories &&
                profile.data.categories.length > 0 ? (
                  <>
                    <label className="!pl-0 mb-3 lg:mb-3">
                      <p className="text-sm font-light">
                        CATEGORY &#40;OPTIONAL&#41;
                      </p>
                    </label>
                    {profile.data.categories ? (
                      <Multiselect
                        name="u_category_id"
                        options={profile.data.categories}
                        displayValue="name"
                        placeholder=""
                        selectedValues={[profile.data.selected_category]}
                        onSelect={(values) =>
                          handleCategoryEdit({
                            name: "u_category_id",
                            value: values[0].u_category_id
                              ? values[0].u_category_id
                              : 3,
                          })
                        }
                        singleSelect={true}
                      />
                    ) : null}
                  </>
                ) : (
                  ""
                )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="" className="font-medium text-lg">
                  Phone
                </label>
                <input
                  type="number"
                  placeholder="Enter Phone"
                  className="border-gray-500 rounded-md"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="" className="font-medium text-lg">
                  Country
                </label>
                <input
                  id="edit-address"
                  name="address"
                  type="text"
                  placeholder=""
                  defaultValue={profile.data.address}
                  onChange={(event) => {
                    dispatch(
                      editUserDetails({
                        name: "address",
                        value: event.target.value,
                      })
                    );
                  }}
                  className="border-gray-500 rounded-md"
                />
              </div>
            </article>
          </section>
          {profile.data.pro_package_config &&
          Object.keys(profile?.data.pro_package_config).length == 0 ? null : (
            <section className="grid grid-cols-1 md:grid-cols-2 gap-x-1 ">
              <div>
                <span className="font-medium">
                  Subscription Price (Per Month)
                </span>
                <div className="border-2 border-gray-400 rounded-md py-2 px-2 w-full">
                  
                  <input
                    className="w-full outline-none border-0 ring-0 focus:ring-0 focus:outine-none"
                    id="monthly_amount"
                    type="number"
                    step="any"
                    min="0"
                    placeholder=""
                    name="monthly_amount"
                    defaultValue={profile.data.monthly_amount}
                    onChange={(event) => {
                      dispatch(
                        editUserDetails({
                          name: event.currentTarget.name,
                          value: event.currentTarget.value,
                        })
                      );
                    }}
                  />
                </div>
              </div>

              <div>
                <span className="font-medium">Subscription Price (1 year)</span>
                <div className="border-2 border-gray-400 rounded-md py-2 px-2 w-full">
                  <input
                    className="w-full outline-none border-0 ring-0 focus:ring-0 focus:outine-none"
                    id="yearly_amount"
                    type="number"
                    step="any"
                    min="0"
                    placeholder=""
                    name="yearly_amount"
                    defaultValue={profile.data.yearly_amount}
                    onChange={(event) => {
                      dispatch(
                        editUserDetails({
                          name: event.currentTarget.name,
                          value: event.currentTarget.value,
                        })
                      );
                    }}
                  />
                </div>
              </div>
            </section>
          )}

          <section className="text-grey-500 space-y-4">
            <div>
              <span className="uppercase font-medium">
                Video call amount(usd) optional
              </span>
              <input
                id="video_call_amount"
                type="number"
                step="any"
                min="0"
                placeholder=""
                name="video_call_amount"
                className="input-form bg-white"
                defaultValue={profile.data.video_call_amount}
                onChange={(event) => {
                  dispatch(
                    editUserDetails({
                      name: event.currentTarget.name,
                      value: event.currentTarget.value,
                    })
                  );
                }}
              />
              <span className="text-xs pl-8">
                Note: set price for the video call this amount will be paid by
                those requesting the video call
              </span>
            </div>

            <div>
              <span className="uppercase font-medium">
                Audio call amount(usd) optional
              </span>
              <input
                id="audio_call_amount"
                type="number"
                step="any"
                min="0"
                placeholder=""
                name="audio_call_amount"
                className="input-form bg-white"
                defaultValue={profile.data.audio_call_amount}
                onChange={(event) => {}}
              />
              <span className="text-xs pl-8">
                Note: set price for the audio call this amount will be paid by
                those requesting the audio call
              </span>
            </div>

            <div>
              <span className="uppercase font-medium">
                default payment method optional
              </span>
              <select
                className="w-full border-0 border-b-2 border-gray-300 focus:border-0 outline-none"
                onChange={(event) => {
                  dispatch(
                    editUserDetails({
                      name: event.currentTarget.name,
                      value: event.currentTarget.value,
                    })
                  );
                }}
                name="default_payment_method"
                defaultValue={profile.data.default_payment_method}
              >
                <option
                  value="WALLET"
                  selected={
                    profile.data.default_payment_method == "WALLET"
                      ? true
                      : false
                  }
                >
                  Wallet
                </option>
                <option
                  value="CARD"
                  selected={
                    profile.data.default_payment_method == "CARD" ? true : false
                  }
                >
                  Card
                </option>
              </select>
              <span className="text-xs pl-8">
                Note: set price for the audio call this amount will be paid by
                those requesting the audio call
              </span>
            </div>
          </section>

          <section>
            <h1 className="font-semibold border-b-2 border-gray-300  text-gray-500 pb-4 ">
              Social Settings (optional)
            </h1>

            <div className="block lg:flex gap-8 my-8">
              <div className="w-full">
                <article className="space-y-4">
                  <div className="flex flex-col">
                    <label htmlFor="" className="font-medium text-lg">
                      Website
                    </label>
                    <input
                      id="edit-website"
                      type="text"
                      autoComplete="off"
                      defaultValue={profile.data.website}
                      placeholder="Website"
                      className="border-gray-500 rounded-md"
                      name="website"
                      onChange={(event) => {
                        dispatch(
                          editUserDetails({
                            name: event.currentTarget.name,
                            value: event.currentTarget.value,
                          })
                        );
                      }}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="" className="font-medium text-lg">
                      Instagram
                    </label>
                    <input
                      id="edit_instagram_link"
                      type="text"
                      autoComplete="off"
                      value={profile.data.instagram_link}
                      placeholder={"instagaram link"}
                      name="instagram_link"
                      className="border-gray-500 rounded-md"
                      onChange={(event) => {
                        dispatch(
                          editUserDetails({
                            name: event.currentTarget.name,
                            value: event.currentTarget.value,
                          })
                        );
                      }}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="" className="font-medium text-lg">
                      Twitter
                    </label>
                    <input
                      id="edit_twitter_link"
                      type="text"
                      autoComplete="off"
                      value={profile.data.twitter_link}
                      name="twitter_link"
                      placeholder="Twitter Link"
                      className="border-gray-500 rounded-md"
                      onChange={(event) => {
                        dispatch(
                          editUserDetails({
                            name: event.currentTarget.name,
                            value: event.currentTarget.value,
                          })
                        );
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="font-medium text-lg">
                      Pinterest
                    </label>
                    <input
                      id="edit_pinterest_link"
                      type="text"
                      autoComplete="off"
                      defaultValue={profile.data.pinterest_link}
                      name="pinterest_link"
                      placeholder="Pinterest Link"
                      className="border-gray-500 rounded-md"
                      onChange={(event) => {
                        dispatch(
                          editUserDetails({
                            name: event.currentTarget.name,
                            value: event.currentTarget.value,
                          })
                        );
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="font-medium text-lg">
                      Twitch
                    </label>
                    <input
                      id="edit_twitch_link"
                      type="text"
                      autoComplete="off"
                      defaultValue={profile.data.twitch_link}
                      name="twitch_link"
                      placeholder="Twitch Link"
                      className="border-gray-500 rounded-md"
                      onChange={(event) => {
                        dispatch(
                          editUserDetails({
                            name: event.currentTarget.name,
                            value: event.currentTarget.value,
                          })
                        );
                      }}
                    />
                  </div>
                  {/* <div className="flex flex-col">
                    <label htmlFor="" className="font-medium text-lg">
                      Monthly Amount
                    </label>
                    <input
                      type="number"
                      placeholder="100"
                      className="border-gray-500 rounded-md"
                      onChange={(event) => {
                        dispatch(
                          editUserDetails({
                            name: event.currentTarget.name,
                            value: event.currentTarget.value,
                          })
                        );
                      }}
                    />
                  </div> */}
                </article>
              </div>

              <div className="w-full">
                <article className="space-y-4">
                  <div className="flex flex-col">
                    <label htmlFor="" className="font-medium text-lg">
                      Amazon Wishlist
                    </label>
                    <input
                      id="edit-amazon-wishlist"
                      type="text"
                      autoComplete="off"
                      defaultValue={profile.data.amazon_wishlist}
                      name="amazon_wishlist"
                      placeholder="Amazon Wishlist"
                      className="border-gray-500 rounded-md"
                      onChange={(event) => {
                        dispatch(
                          editUserDetails({
                            name: event.currentTarget.name,
                            value: event.currentTarget.value,
                          })
                        );
                      }}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="" className="font-medium text-lg">
                      Facebook
                    </label>
                    <input
                      id="edit_facebook_link"
                      type="text"
                      autoComplete="off"
                      defaultValue={profile.data.facebook_link}
                      name="facebook_link"
                      placeholder={"Facebook Link"}
                      className="border-gray-500 rounded-md"
                      onChange={(event) => {
                        dispatch(
                          editUserDetails({
                            name: event.currentTarget.name,
                            value: event.currentTarget.value,
                          })
                        );
                      }}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="" className="font-medium text-lg">
                      LinkedIn
                    </label>
                    <input
                      id="edit_linkedin_link"
                      type="text"
                      autoComplete="off"
                      defaultValue={profile.data.linkedin_link}
                      name="linkedin_link"
                      placeholder="LinkedIn Link"
                      className="border-gray-500 rounded-md"
                      onChange={(event) => {
                        dispatch(
                          editUserDetails({
                            name: event.currentTarget.name,
                            value: event.currentTarget.value,
                          })
                        );
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="font-medium text-lg">
                      Youtube
                    </label>
                    <input
                      id="edit_youtube_link"
                      type="text"
                      autoComplete="off"
                      defaultValue={profile.data.youtube_link}
                      name="youtube_link"
                      placeholder="Youtube Link"
                      className="border-gray-500 rounded-md"
                      onChange={(event) => {
                        dispatch(
                          editUserDetails({
                            name: event.currentTarget.name,
                            value: event.currentTarget.value,
                          })
                        );
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="" className="font-medium text-lg">
                      Snapchat
                    </label>
                    <input
                      id="edit_snapchat_link"
                      type="text"
                      autoComplete="off"
                      defaultValue={profile.data.snapchat_link}
                      name="snapchat_link"
                      placeholder="Snapchat Link"
                      className="border-gray-500 rounded-md"
                      onChange={(event) => {
                        dispatch(
                          editUserDetails({
                            name: event.currentTarget.name,
                            value: event.currentTarget.value,
                          })
                        );
                      }}
                    />
                  </div>
                  {/* <div className="flex flex-col">
                    <label htmlFor="" className="font-medium text-lg">
                      Yearly Amount
                    </label>
                    <input
                      type="number"
                      placeholder="100"
                      className="border-gray-500 rounded-md"
                      onChange={(event) => {
                        dispatch(
                          editUserDetails({
                            name: event.currentTarget.name,
                            value: event.currentTarget.value,
                          })
                        );
                      }}
                    />
                  </div> */}
                </article>
              </div>
            </div>
          </section>

          <section className="bg-red-200 w-4/5 mx-auto shadow-md flex flex-col justify-center items-center rounded-md">
            <div className="text-center flex flex-col justify-center items-center space-y-2 py-4 px-2">
              <img
                width="150"
                height="150"
                className="rounded-full h-[150px]  w-[150px] object-cover"
                src={profile.data.picture}
                alt="profile-pic"
              />

              {profile.data.pro_package_config &&
              Object.keys(profile?.data.pro_package_config).length == 0 ? (
                <h5>Free Membership</h5>
              ) : (
                <>
                  {`${
                    profile.data.pro_package_config &&
                    profile.data.pro_package_config["name"]
                  } Membership`}
                </>
              )}

              <Link href="/go-pro" passHref>
                <button className="btn bg-red-600 uppercase text-base rounded-lg">
                  Upgrade
                </button>
              </Link>
            </div>
          </section>

          <div className="text-center">
            <button
              onClick={handleSubmit}
              disabled={profileInputData.buttonDisable}
              className="btn bg-red-600 uppercase text-base rounded-lg px-8 py-2"
            >
              {profileInputData.loadingButtonContent !== null
                ? profileInputData.loadingButtonContent
                : "save"}
            </button>
          </div>
        </div>
      </div>

      <CropImageModal
        image={cropModalFlag.image}
        modalFlag={cropModalFlag.flag}
        cropModalFlag={cropModalFlag}
        closeModal={closeCropModal}
        setImage={setImage}
        imageState={image}
        setProfileInputData={setProfileInputData1}
        profileInputData={profileInputData1}
      />
    </>
  );
}
