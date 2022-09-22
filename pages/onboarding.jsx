import { getCookie } from "cookies-next";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { BsCheckCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostSuggestionsStart } from "../store/slices/homeSlice";
import { subscriptionPaymentPaystackStart } from "../store/slices/subscriptionSlice";
import {
  fetchUserDetailsStart,
  updateUserDetailsStart,
} from "../store/slices/userSlice";
import { useRouter } from "next/router";
import Link from "next/link";
const Onboarding = () => {
  const postSug = useSelector((state) => state.home.postSug);
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const [inputData, setInputData] = useState({});
  const [twoInputData, setTwoInputData] = useState({});

  const avatar = useRef();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const profileInputData = useSelector((state) => state.user.profileInputData);
  const userName = getCookie("username");
  const [image, setImage] = useState({
    picture: "",
    cover: "",
  });

  const followUsers = (users) => {
    users.length > 0 &&
      users.forEach((user) => {
        dispatch(
          subscriptionPaymentPaystackStart({
            user_unique_id: user.user_unique_id,
            plan_type: "months",
            is_free: 1,
            payment_id: "free",
          })
        );
      });
    router.push("/");
  };

  useEffect(() => {
    if (profile.loading) dispatch(fetchUserDetailsStart());
    dispatch(fetchPostSuggestionsStart());
  }, []);

  const handleSecondChange = (event) => {
    setTwoInputData({
      ...twoInputData,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.currentTarget.type === "file") {
      setInputData({
        ...inputData,
        [event.currentTarget.name]: event.currentTarget.files[0],
      });
      let reader = new FileReader();
      let file = event.currentTarget.files[0];

      if (event.currentTarget.name === "picture") {
        reader.onloadend = () => {
          setImage({ ...image, picture: reader.result });
        };
      }

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.keys(inputData).length > 0)
      dispatch(updateUserDetailsStart(inputData));
    else dispatch(updateUserDetailsStart());

    nextStep();
  };

  const handleTwoSubmit = (event) => {
    event.preventDefault();
    if (Object.keys(twoInputData).length > 0)
      dispatch(updateUserDetailsStart(twoInputData));
    else dispatch(updateUserDetailsStart());

    nextStep();
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="pt-14">
      {currentStep == 1 && (
        <div className="max-w-5xl   h-[80vh]   mx-auto ">
          <div className="w-full h-full row-container">
            {profile.loading ? (
              <div className="flex border rounded-md shadow-2xl col-container w-[400px] h-[350px] cursor-pointer transition hover:scale-105">
                <BsCheckCircleFill className="h-8 w-8 text-green-500" />
                <h2 className="text-xl md:text-2xl font-semibold">Welcome</h2>
                <p className="font-medium text-lg">@{userName}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 p-6 gap-x-5  h-full  w-full bg-white mt-10 rounded-xl drop-shadow-[10px_10px_10px_rgba(0,0,0,0.08)] ">
                <div className=" bg-gray-200 rounded-lg  hidden md:block relative ">
                  <p className="text-black font-medium text-[25px] text-center mt-10">
                    {image.picture === "" ? "Add a Photo" : "Looks Good"}
                  </p>
                  <img
                    className="w-10/12 absolute bottom-10 left-[8.85%] rounded-md"
                    alt="intro"
                    src="/images/onboarding-camera.png"
                  />
                </div>
                <div className="col-span-2 bg-white rounded-xl   ">
                  <ul className="list-none tag_steps tag_startup_steps">
                    <li className="active">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          enableBackground="new 0 0 24 24"
                          height={24}
                          viewBox="0 0 24 24"
                          width={24}
                          className="block md:hidden"
                        >
                          <g>
                            <rect fill="none" height={24} width={24} />
                          </g>
                          <g>
                            <path
                              fill="currentColor"
                              d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M6.6,16.2l2-2.67 c0.2-0.27,0.6-0.27,0.8,0L11.25,16l2.6-3.47c0.2-0.27,0.6-0.27,0.8,0l2.75,3.67c0.25,0.33,0.01,0.8-0.4,0.8H7 C6.59,17,6.35,16.53,6.6,16.2z"
                            />
                          </g>
                        </svg>{" "}
                        <span className="hidden md:block">Media</span>
                      </div>
                    </li>
                    <li>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          enableBackground="new 0 0 24 24"
                          height={24}
                          viewBox="0 0 24 24"
                          width={24}
                          className="md:hidden block"
                        >
                          <g>
                            <path d="M0,0h24v24H0V0z" fill="none" />
                          </g>
                          <g>
                            <path
                              fill="currentColor"
                              d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,17c-0.55,0-1-0.45-1-1v-4c0-0.55,0.45-1,1-1 s1,0.45,1,1v4C13,16.55,12.55,17,12,17z M12,9L12,9c-0.55,0-1-0.45-1-1v0c0-0.55,0.45-1,1-1h0c0.55,0,1,0.45,1,1v0 C13,8.55,12.55,9,12,9z"
                            />
                          </g>
                        </svg>{" "}
                        <span className="hidden md:block">Info</span>
                      </div>
                    </li>
                    <li>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          enableBackground="new 0 0 24 24"
                          height={24}
                          viewBox="0 0 24 24"
                          width={24}
                          className="md:hidden block"
                        >
                          <g>
                            <rect fill="none" height={24} width={24} />
                            <rect fill="none" height={24} width={24} />
                          </g>
                          <g>
                            <path
                              fill="currentColor"
                              d="M22,9V8c0-0.55-0.45-1-1-1h0c-0.55,0-1,0.45-1,1v1h-1c-0.55,0-1,0.45-1,1v0c0,0.55,0.45,1,1,1h1v1c0,0.55,0.45,1,1,1h0 c0.55,0,1-0.45,1-1v-1h1c0.55,0,1-0.45,1-1v0c0-0.55-0.45-1-1-1H22z"
                            />
                            <g>
                              <path
                                fill="currentColor"
                                d="M8,12c2.21,0,4-1.79,4-4s-1.79-4-4-4S4,5.79,4,8S5.79,12,8,12z"
                              />
                              <path
                                fill="currentColor"
                                d="M8,13c-2.67,0-8,1.34-8,4v3h16v-3C16,14.34,10.67,13,8,13z"
                              />
                              <path
                                fill="currentColor"
                                d="M12.51,4.05C13.43,5.11,14,6.49,14,8s-0.57,2.89-1.49,3.95C14.47,11.7,16,10.04,16,8S14.47,4.3,12.51,4.05z"
                              />
                              <path
                                fill="currentColor"
                                d="M16.53,13.83C17.42,14.66,18,15.7,18,17v3h2v-3C20,15.55,18.41,14.49,16.53,13.83z"
                              />
                            </g>
                          </g>
                        </svg>{" "}
                        <span className="hidden md:block">Follow</span>
                      </div>
                    </li>
                  </ul>

                  <div className="mt-[10%] text-center font-bold text-black">
                    <p>
                      {image.picture === ""
                        ? "Show your unique personality and style."
                        : "You'll be able to add more to your profile later."}
                    </p>
                    <div className=" row-container">
                      <div className="relative  w-[200px] h-[200px]">
                        <img
                          onClick={() => {
                            document.getElementById("avatar").click();
                          }}
                          className="rounded-full w-[200px] h-[200px] object-contain ml-auto mr-auto mt-10 cursor-pointer"
                          alt="profile"
                          src={
                            image.picture === ""
                              ? "/images/d-avatar.jpg"
                              : image.picture
                          }
                        />
                        <AiOutlineCamera
                          onClick={() => {
                            document.getElementById("avatar").click();
                          }}
                          className="absolute cursor-pointer  -right-1 text-white  -bottom-2 bg-gray-500 p-1 rounded-full w-[30px] h-[30px]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="w-full flex items-center justify-between mt-20">
                    <small
                      onClick={nextStep}
                      className="skip-step cursor-pointer hover:underline"
                    >
                      Or Skip this step for now.
                    </small>
                    <button
                      disabled={image.picture === ""}
                      onClick={handleSubmit}
                      className={`${
                        image.picture === "" ? "bg-red-200" : "bg-red-600"
                      } font-medium rounded-md text-white  w-[150px] h-[30px] `}
                    >
                      {profileInputData.loading ? (
                        "Loading..."
                      ) : (
                        <span>Save &amp; Continue</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
            <form action="#" method="post" className="absolute inset-0 hidden">
              <input
                ref={avatar}
                type="file"
                id="avatar"
                accept="image/*"
                name="picture"
                onChange={handleChangeImage}
              />
            </form>
          </div>
        </div>
      )}
      {currentStep == 2 && (
        <div className="max-w-5xl   h-[80vh]   mx-auto ">
          <div className="w-full h-full row-container">
            {profile.loading ? (
              <div className="flex border rounded-md shadow-2xl col-container w-[400px] h-[350px] cursor-pointer transition hover:scale-105">
                <BsCheckCircleFill className="h-8 w-8 text-green-500" />
                <h2 className="text-xl md:text-2xl font-semibold">Welcome</h2>
                <p className="font-medium text-lg">@{userName}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 p-6 gap-x-5  h-full  w-full bg-white mt-10 rounded-xl drop-shadow-[10px_10px_10px_rgba(0,0,0,0.08)] ">
                <div className=" bg-gray-200 rounded-lg  hidden md:block relative ">
                  <p className="text-black font-medium text-[25px] text-center mt-10">
                    Tell us about yourself
                  </p>
                  <img
                    className="w-10/12 absolute bottom-10 left-[8.85%] rounded-md"
                    alt="intro"
                    src="/images/onboarding-camera.png"
                  />
                </div>
                <div className="col-span-2 bg-white rounded-xl   ">
                  <ul className="list-none tag_steps tag_startup_steps">
                    <li className="active">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          enableBackground="new 0 0 24 24"
                          height={24}
                          viewBox="0 0 24 24"
                          width={24}
                          className="block md:hidden"
                        >
                          <g>
                            <rect fill="none" height={24} width={24} />
                          </g>
                          <g>
                            <path
                              fill="currentColor"
                              d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M6.6,16.2l2-2.67 c0.2-0.27,0.6-0.27,0.8,0L11.25,16l2.6-3.47c0.2-0.27,0.6-0.27,0.8,0l2.75,3.67c0.25,0.33,0.01,0.8-0.4,0.8H7 C6.59,17,6.35,16.53,6.6,16.2z"
                            />
                          </g>
                        </svg>{" "}
                        <span className="hidden md:block">Media</span>
                      </div>
                    </li>
                    <li className="active">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          enableBackground="new 0 0 24 24"
                          height={24}
                          viewBox="0 0 24 24"
                          width={24}
                          className="md:hidden block"
                        >
                          <g>
                            <path d="M0,0h24v24H0V0z" fill="none" />
                          </g>
                          <g>
                            <path
                              fill="currentColor"
                              d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,17c-0.55,0-1-0.45-1-1v-4c0-0.55,0.45-1,1-1 s1,0.45,1,1v4C13,16.55,12.55,17,12,17z M12,9L12,9c-0.55,0-1-0.45-1-1v0c0-0.55,0.45-1,1-1h0c0.55,0,1,0.45,1,1v0 C13,8.55,12.55,9,12,9z"
                            />
                          </g>
                        </svg>{" "}
                        <span className="hidden md:block">Info</span>
                      </div>
                    </li>
                    <li>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          enableBackground="new 0 0 24 24"
                          height={24}
                          viewBox="0 0 24 24"
                          width={24}
                          className="md:hidden block"
                        >
                          <g>
                            <rect fill="none" height={24} width={24} />
                            <rect fill="none" height={24} width={24} />
                          </g>
                          <g>
                            <path
                              fill="currentColor"
                              d="M22,9V8c0-0.55-0.45-1-1-1h0c-0.55,0-1,0.45-1,1v1h-1c-0.55,0-1,0.45-1,1v0c0,0.55,0.45,1,1,1h1v1c0,0.55,0.45,1,1,1h0 c0.55,0,1-0.45,1-1v-1h1c0.55,0,1-0.45,1-1v0c0-0.55-0.45-1-1-1H22z"
                            />
                            <g>
                              <path
                                fill="currentColor"
                                d="M8,12c2.21,0,4-1.79,4-4s-1.79-4-4-4S4,5.79,4,8S5.79,12,8,12z"
                              />
                              <path
                                fill="currentColor"
                                d="M8,13c-2.67,0-8,1.34-8,4v3h16v-3C16,14.34,10.67,13,8,13z"
                              />
                              <path
                                fill="currentColor"
                                d="M12.51,4.05C13.43,5.11,14,6.49,14,8s-0.57,2.89-1.49,3.95C14.47,11.7,16,10.04,16,8S14.47,4.3,12.51,4.05z"
                              />
                              <path
                                fill="currentColor"
                                d="M16.53,13.83C17.42,14.66,18,15.7,18,17v3h2v-3C20,15.55,18.41,14.49,16.53,13.83z"
                              />
                            </g>
                          </g>
                        </svg>{" "}
                        <span className="hidden md:block">Follow</span>
                      </div>
                    </li>
                  </ul>

                  {/* here */}
                  <div className=" text-center font-bold text-black">
                    <h2 className="text-2xl font-medium mt-5 mb-2">
                      Share your information with our community
                    </h2>
                    <div className="relative">
                      <div className="relative h-[45px]">
                        <input
                          name="first_name"
                          onChange={(e) => handleSecondChange(e)}
                          className="w-10/12 !border-none !outline-0 mb-10 bg-gray-200 rounded-sm outline-none  ring-0 focus:outline-none focus:ring-0"
                          type="text"
                          placeholder="first name"
                        />
                        <hr className="absolute text-orange-900 bg-gray-500 bottom-0 z-50 w-10/12 h-[2px] left-[8.5%]" />
                      </div>
                      <br />
                      <div className="relative h-[45px]">
                        <input
                          name="last_name"
                          onChange={(e) => handleSecondChange(e)}
                          className="w-10/12 !border-none !outline-0 mb-10 bg-gray-200 rounded-sm outline-none  ring-0 focus:outline-none focus:ring-0"
                          type="text"
                          placeholder="Last name"
                        />
                        <hr className="absolute text-orange-900 bg-gray-500 bottom-0 z-50 w-10/12 h-[2px] left-[8.5%]" />
                      </div>
                      <br />
                      <div className="relative h-[45px]">
                        <select
                          onChange={(e) => handleSecondChange(e)}
                          name="country"
                          className="w-10/12 !border-none !outline-0 mb-10 bg-gray-200 rounded-sm outline-none  ring-0 focus:outline-none focus:ring-0"
                          id="country"
                        >
                          <option
                            value="Nigeria"
                            label="Select a country ... "
                            selected="selected"
                          >
                            Select a country ...
                          </option>
                          <option value="Afghanistan">Afghanistan</option>
                          <option value="Åland Islands">Åland Islands</option>
                          <option value="Albania">Albania</option>
                          <option value="Algeria">Algeria</option>
                          <option value="American Samoa">American Samoa</option>
                          <option value="Andorra">Andorra</option>
                          <option value="Angola">Angola</option>
                          <option value="Anguilla">Anguilla</option>
                          <option value="Antarctica">Antarctica</option>
                          <option value="Antigua and Barbuda">
                            Antigua and Barbuda
                          </option>
                          <option value="Argentina">Argentina</option>
                          <option value="Armenia">Armenia</option>
                          <option value="Aruba">Aruba</option>
                          <option value="Australia">Australia</option>
                          <option value="Austria">Austria</option>
                          <option value="Azerbaijan">Azerbaijan</option>
                          <option value="Bahamas">Bahamas</option>
                          <option value="Bahrain">Bahrain</option>
                          <option value="Bangladesh">Bangladesh</option>
                          <option value="Barbados">Barbados</option>
                          <option value="Belarus">Belarus</option>
                          <option value="Belgium">Belgium</option>
                          <option value="Belize">Belize</option>
                          <option value="Benin">Benin</option>
                          <option value="Bermuda">Bermuda</option>
                          <option value="Bhutan">Bhutan</option>
                          <option value="Bolivia">Bolivia</option>
                          <option value="Bosnia and Herzegovina">
                            Bosnia and Herzegovina
                          </option>
                          <option value="Botswana">Botswana</option>
                          <option value="Bouvet Island">Bouvet Island</option>
                          <option value="Brazil">Brazil</option>
                          <option value="British Indian Ocean Territory">
                            British Indian Ocean Territory
                          </option>
                          <option value="Brunei Darussalam">
                            Brunei Darussalam
                          </option>
                          <option value="Bulgaria">Bulgaria</option>
                          <option value="Burkina Faso">Burkina Faso</option>
                          <option value="Burundi">Burundi</option>
                          <option value="Cambodia">Cambodia</option>
                          <option value="Cameroon">Cameroon</option>
                          <option value="Canada">Canada</option>
                          <option value="Cape Verde">Cape Verde</option>
                          <option value="Cayman Islands">Cayman Islands</option>
                          <option value="Central African Republic">
                            Central African Republic
                          </option>
                          <option value="Chad">Chad</option>
                          <option value="Chile">Chile</option>
                          <option value="China">China</option>
                          <option value="Christmas Island">
                            Christmas Island
                          </option>
                          <option value="Cocos (Keeling) Islands">
                            Cocos (Keeling) Islands
                          </option>
                          <option value="Colombia">Colombia</option>
                          <option value="Comoros">Comoros</option>
                          <option value="Congo">Congo</option>
                          <option value="Congo, The Democratic Republic of The">
                            Congo, The Democratic Republic of The
                          </option>
                          <option value="Cook Islands">Cook Islands</option>
                          <option value="Costa Rica">Costa Rica</option>
                          <option value="Cote D'ivoire">Cote D ivoire</option>
                          <option value="Croatia">Croatia</option>
                          <option value="Cuba">Cuba</option>
                          <option value="Cyprus">Cyprus</option>
                          <option value="Czech Republic">Czech Republic</option>
                          <option value="Denmark">Denmark</option>
                          <option value="Djibouti">Djibouti</option>
                          <option value="Dominica">Dominica</option>
                          <option value="Dominican Republic">
                            Dominican Republic
                          </option>
                          <option value="Ecuador">Ecuador</option>
                          <option value="Egypt">Egypt</option>
                          <option value="El Salvador">El Salvador</option>
                          <option value="Equatorial Guinea">
                            Equatorial Guinea
                          </option>
                          <option value="Eritrea">Eritrea</option>
                          <option value="Estonia">Estonia</option>
                          <option value="Ethiopia">Ethiopia</option>
                          <option value="Falkland Islands (Malvinas)">
                            Falkland Islands (Malvinas)
                          </option>
                          <option value="Faroe Islands">Faroe Islands</option>
                          <option value="Fiji">Fiji</option>
                          <option value="Finland">Finland</option>
                          <option value="France">France</option>
                          <option value="French Guiana">French Guiana</option>
                          <option value="French Polynesia">
                            French Polynesia
                          </option>
                          <option value="French Southern Territories">
                            French Southern Territories
                          </option>
                          <option value="Gabon">Gabon</option>
                          <option value="Gambia">Gambia</option>
                          <option value="Georgia">Georgia</option>
                          <option value="Germany">Germany</option>
                          <option value="Ghana">Ghana</option>
                          <option value="Gibraltar">Gibraltar</option>
                          <option value="Greece">Greece</option>
                          <option value="Greenland">Greenland</option>
                          <option value="Grenada">Grenada</option>
                          <option value="Guadeloupe">Guadeloupe</option>
                          <option value="Guam">Guam</option>
                          <option value="Guatemala">Guatemala</option>
                          <option value="Guernsey">Guernsey</option>
                          <option value="Guinea">Guinea</option>
                          <option value="Guinea-bissau">Guinea-bissau</option>
                          <option value="Guyana">Guyana</option>
                          <option value="Haiti">Haiti</option>
                          <option value="Heard Island and Mcdonald Islands">
                            Heard Island and Mcdonald Islands
                          </option>
                          <option value="Holy See (Vatican City State)">
                            Holy See (Vatican City State)
                          </option>
                          <option value="Honduras">Honduras</option>
                          <option value="Hong Kong">Hong Kong</option>
                          <option value="Hungary">Hungary</option>
                          <option value="Iceland">Iceland</option>
                          <option value="India">India</option>
                          <option value="Indonesia">Indonesia</option>
                          <option value="Iran, Islamic Republic of">
                            Iran, Islamic Republic of
                          </option>
                          <option value="Iraq">Iraq</option>
                          <option value="Ireland">Ireland</option>
                          <option value="Isle of Man">Isle of Man</option>
                          <option value="Israel">Israel</option>
                          <option value="Italy">Italy</option>
                          <option value="Jamaica">Jamaica</option>
                          <option value="Japan">Japan</option>
                          <option value="Jersey">Jersey</option>
                          <option value="Jordan">Jordan</option>
                          <option value="Kazakhstan">Kazakhstan</option>
                          <option value="Kenya">Kenya</option>
                          <option value="Kiribati">Kiribati</option>
                          <option value="Korea, Democratic Peoples Republic of">
                            Korea, Democratic Peoples Republic of
                          </option>
                          <option value="Korea, Republic of">
                            Korea, Republic of
                          </option>
                          <option value="Kuwait">Kuwait</option>
                          <option value="Kyrgyzstan">Kyrgyzstan</option>
                          <option value="Lao Peoples Democratic Republic">
                            Lao Peoples Democratic Republic
                          </option>
                          <option value="Latvia">Latvia</option>
                          <option value="Lebanon">Lebanon</option>
                          <option value="Lesotho">Lesotho</option>
                          <option value="Liberia">Liberia</option>
                          <option value="Libyan Arab Jamahiriya">
                            Libyan Arab Jamahiriya
                          </option>
                          <option value="Liechtenstein">Liechtenstein</option>
                          <option value="Lithuania">Lithuania</option>
                          <option value="Luxembourg">Luxembourg</option>
                          <option value="Macao">Macao</option>
                          <option value="Macedonia, The Former Yugoslav Republic of">
                            Macedonia, The Former Yugoslav Republic of
                          </option>
                          <option value="Madagascar">Madagascar</option>
                          <option value="Malawi">Malawi</option>
                          <option value="Malaysia">Malaysia</option>
                          <option value="Maldives">Maldives</option>
                          <option value="Mali">Mali</option>
                          <option value="Malta">Malta</option>
                          <option value="Marshall Islands">
                            Marshall Islands
                          </option>
                          <option value="Martinique">Martinique</option>
                          <option value="Mauritania">Mauritania</option>
                          <option value="Mauritius">Mauritius</option>
                          <option value="Mayotte">Mayotte</option>
                          <option value="Mexico">Mexico</option>
                          <option value="Micronesia, Federated States of">
                            Micronesia, Federated States of
                          </option>
                          <option value="Moldova, Republic of">
                            Moldova, Republic of
                          </option>
                          <option value="Monaco">Monaco</option>
                          <option value="Mongolia">Mongolia</option>
                          <option value="Montenegro">Montenegro</option>
                          <option value="Montserrat">Montserrat</option>
                          <option value="Morocco">Morocco</option>
                          <option value="Mozambique">Mozambique</option>
                          <option value="Myanmar">Myanmar</option>
                          <option value="Namibia">Namibia</option>
                          <option value="Nauru">Nauru</option>
                          <option value="Nepal">Nepal</option>
                          <option value="Netherlands">Netherlands</option>
                          <option value="Netherlands Antilles">
                            Netherlands Antilles
                          </option>
                          <option value="New Caledonia">New Caledonia</option>
                          <option value="New Zealand">New Zealand</option>
                          <option value="Nicaragua">Nicaragua</option>
                          <option value="Niger">Niger</option>
                          <option value="Nigeria">Nigeria</option>
                          <option value="Niue">Niue</option>
                          <option value="Norfolk Island">Norfolk Island</option>
                          <option value="Northern Mariana Islands">
                            Northern Mariana Islands
                          </option>
                          <option value="Norway">Norway</option>
                          <option value="Oman">Oman</option>
                          <option value="Pakistan">Pakistan</option>
                          <option value="Palau">Palau</option>
                          <option value="Palestinian Territory, Occupied">
                            Palestinian Territory, Occupied
                          </option>
                          <option value="Panama">Panama</option>
                          <option value="Papua New Guinea">
                            Papua New Guinea
                          </option>
                          <option value="Paraguay">Paraguay</option>
                          <option value="Peru">Peru</option>
                          <option value="Philippines">Philippines</option>
                          <option value="Pitcairn">Pitcairn</option>
                          <option value="Poland">Poland</option>
                          <option value="Portugal">Portugal</option>
                          <option value="Puerto Rico">Puerto Rico</option>
                          <option value="Qatar">Qatar</option>
                          <option value="Reunion">Reunion</option>
                          <option value="Romania">Romania</option>
                          <option value="Russian Federation">
                            Russian Federation
                          </option>
                          <option value="Rwanda">Rwanda</option>
                          <option value="Saint Helena">Saint Helena</option>
                          <option value="Saint Kitts and Nevis">
                            Saint Kitts and Nevis
                          </option>
                          <option value="Saint Lucia">Saint Lucia</option>
                          <option value="Saint Pierre and Miquelon">
                            Saint Pierre and Miquelon
                          </option>
                          <option value="Saint Vincent and The Grenadines">
                            Saint Vincent and The Grenadines
                          </option>
                          <option value="Samoa">Samoa</option>
                          <option value="San Marino">San Marino</option>
                          <option value="Sao Tome and Principe">
                            Sao Tome and Principe
                          </option>
                          <option value="Saudi Arabia">Saudi Arabia</option>
                          <option value="Senegal">Senegal</option>
                          <option value="Serbia">Serbia</option>
                          <option value="Seychelles">Seychelles</option>
                          <option value="Sierra Leone">Sierra Leone</option>
                          <option value="Singapore">Singapore</option>
                          <option value="Slovakia">Slovakia</option>
                          <option value="Slovenia">Slovenia</option>
                          <option value="Solomon Islands">
                            Solomon Islands
                          </option>
                          <option value="Somalia">Somalia</option>
                          <option value="South Africa">South Africa</option>
                          <option value="South Georgia and The South Sandwich Islands">
                            South Georgia and The South Sandwich Islands
                          </option>
                          <option value="Spain">Spain</option>
                          <option value="Sri Lanka">Sri Lanka</option>
                          <option value="Sudan">Sudan</option>
                          <option value="Suriname">Suriname</option>
                          <option value="Svalbard and Jan Mayen">
                            Svalbard and Jan Mayen
                          </option>
                          <option value="Swaziland">Swaziland</option>
                          <option value="Sweden">Sweden</option>
                          <option value="Switzerland">Switzerland</option>
                          <option value="Syrian Arab Republic">
                            Syrian Arab Republic
                          </option>
                          <option value="Taiwan">Taiwan</option>
                          <option value="Tajikistan">Tajikistan</option>
                          <option value="Tanzania, United Republic of">
                            Tanzania, United Republic of
                          </option>
                          <option value="Thailand">Thailand</option>
                          <option value="Timor-leste">Timor-leste</option>
                          <option value="Togo">Togo</option>
                          <option value="Tokelau">Tokelau</option>
                          <option value="Tonga">Tonga</option>
                          <option value="Trinidad and Tobago">
                            Trinidad and Tobago
                          </option>
                          <option value="Tunisia">Tunisia</option>
                          <option value="Turkey">Turkey</option>
                          <option value="Turkmenistan">Turkmenistan</option>
                          <option value="Turks and Caicos Islands">
                            Turks and Caicos Islands
                          </option>
                          <option value="Tuvalu">Tuvalu</option>
                          <option value="Uganda">Uganda</option>
                          <option value="Ukraine">Ukraine</option>
                          <option value="United Arab Emirates">
                            United Arab Emirates
                          </option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="United States">United States</option>
                          <option value="United States Minor Outlying Islands">
                            United States Minor Outlying Islands
                          </option>
                          <option value="Uruguay">Uruguay</option>
                          <option value="Uzbekistan">Uzbekistan</option>
                          <option value="Vanuatu">Vanuatu</option>
                          <option value="Venezuela">Venezuela</option>
                          <option value="Viet Nam">Viet Nam</option>
                          <option value="Virgin Islands, British">
                            Virgin Islands, British
                          </option>
                          <option value="Virgin Islands, U.S.">
                            Virgin Islands, U.S.
                          </option>
                          <option value="Wallis and Futuna">
                            Wallis and Futuna
                          </option>
                          <option value="Western Sahara">Western Sahara</option>
                          <option value="Yemen">Yemen</option>
                          <option value="Zambia">Zambia</option>
                          <option value="Zimbabwe">Zimbabwe</option>
                        </select>
                        <hr className="absolute text-orange-900 bg-gray-500 bottom-0 z-50 w-10/12 h-[2px] left-[8.5%]" />
                      </div>

                      <br />
                      <div className="relative h-[45px]">
                        <input
                          name="birthday"
                          onChange={(e) => handleSecondChange(e)}
                          className="w-10/12 !border-none !outline-0 mb-10 bg-gray-200 rounded-sm outline-none  ring-0 focus:outline-none focus:ring-0"
                          type="date"
                          placeholder="birthday"
                        />
                        <hr className="absolute text-orange-900 bg-gray-500 bottom-0 z-50 w-10/12 h-[2px] left-[8.5%]" />
                      </div>
                    </div>
                  </div>

                  <div className="w-full flex items-center justify-between mt-20">
                    <small
                      onClick={nextStep}
                      className="skip-step cursor-pointer hover:underline"
                    >
                      Or Skip this step for now.
                    </small>
                    <button
                      onClick={handleTwoSubmit}
                      className="
                      bg-red-600
                       font-medium rounded-md text-white  w-[150px] h-[30px] "
                    >
                      {profileInputData.loading ? (
                        "Loading..."
                      ) : (
                        <span>Save &amp; Continue</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {currentStep == 3 && (
        <div className="max-w-5xl   h-[80vh]   mx-auto ">
          <div className="w-full h-full row-container">
            {profile.loading ? (
              <div className="flex border rounded-md shadow-2xl col-container w-[400px] h-[350px] cursor-pointer transition hover:scale-105">
                <BsCheckCircleFill className="h-8 w-8 text-green-500" />
                <h2 className="text-xl md:text-2xl font-semibold">Welcome</h2>
                <p className="font-medium text-lg">@{userName}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 p-6 gap-x-5  h-full  w-full bg-white mt-10 rounded-xl drop-shadow-[10px_10px_10px_rgba(0,0,0,0.08)] ">
                <div className=" bg-gray-200 rounded-lg  hidden md:block relative ">
                  <p className="text-black font-medium text-[25px] text-center mt-10">
                    Follow our famous users
                  </p>
                  <img
                    className="w-10/12 absolute bottom-10 left-[8.85%] rounded-md"
                    alt="intro"
                    src="/images/onboarding-camera.png"
                  />
                </div>
                <div className="col-span-2 bg-white rounded-xl   ">
                  <ul className="list-none tag_steps tag_startup_steps">
                    <li className="active">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          enableBackground="new 0 0 24 24"
                          height={24}
                          viewBox="0 0 24 24"
                          width={24}
                          className="block md:hidden"
                        >
                          <g>
                            <rect fill="none" height={24} width={24} />
                          </g>
                          <g>
                            <path
                              fill="currentColor"
                              d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M6.6,16.2l2-2.67 c0.2-0.27,0.6-0.27,0.8,0L11.25,16l2.6-3.47c0.2-0.27,0.6-0.27,0.8,0l2.75,3.67c0.25,0.33,0.01,0.8-0.4,0.8H7 C6.59,17,6.35,16.53,6.6,16.2z"
                            />
                          </g>
                        </svg>{" "}
                        <span className="hidden md:block">Media</span>
                      </div>
                    </li>
                    <li className="active">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          enableBackground="new 0 0 24 24"
                          height={24}
                          viewBox="0 0 24 24"
                          width={24}
                          className="md:hidden block"
                        >
                          <g>
                            <path d="M0,0h24v24H0V0z" fill="none" />
                          </g>
                          <g>
                            <path
                              fill="currentColor"
                              d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,17c-0.55,0-1-0.45-1-1v-4c0-0.55,0.45-1,1-1 s1,0.45,1,1v4C13,16.55,12.55,17,12,17z M12,9L12,9c-0.55,0-1-0.45-1-1v0c0-0.55,0.45-1,1-1h0c0.55,0,1,0.45,1,1v0 C13,8.55,12.55,9,12,9z"
                            />
                          </g>
                        </svg>{" "}
                        <span className="hidden md:block">Info</span>
                      </div>
                    </li>
                    <li className="active">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          enableBackground="new 0 0 24 24"
                          height={24}
                          viewBox="0 0 24 24"
                          width={24}
                          className="md:hidden block"
                        >
                          <g>
                            <rect fill="none" height={24} width={24} />
                            <rect fill="none" height={24} width={24} />
                          </g>
                          <g>
                            <path
                              fill="currentColor"
                              d="M22,9V8c0-0.55-0.45-1-1-1h0c-0.55,0-1,0.45-1,1v1h-1c-0.55,0-1,0.45-1,1v0c0,0.55,0.45,1,1,1h1v1c0,0.55,0.45,1,1,1h0 c0.55,0,1-0.45,1-1v-1h1c0.55,0,1-0.45,1-1v0c0-0.55-0.45-1-1-1H22z"
                            />
                            <g>
                              <path
                                fill="currentColor"
                                d="M8,12c2.21,0,4-1.79,4-4s-1.79-4-4-4S4,5.79,4,8S5.79,12,8,12z"
                              />
                              <path
                                fill="currentColor"
                                d="M8,13c-2.67,0-8,1.34-8,4v3h16v-3C16,14.34,10.67,13,8,13z"
                              />
                              <path
                                fill="currentColor"
                                d="M12.51,4.05C13.43,5.11,14,6.49,14,8s-0.57,2.89-1.49,3.95C14.47,11.7,16,10.04,16,8S14.47,4.3,12.51,4.05z"
                              />
                              <path
                                fill="currentColor"
                                d="M16.53,13.83C17.42,14.66,18,15.7,18,17v3h2v-3C20,15.55,18.41,14.49,16.53,13.83z"
                              />
                            </g>
                          </g>
                        </svg>{" "}
                        <span className="hidden md:block">Follow</span>
                      </div>
                    </li>
                  </ul>

                  {/* here */}

                  <div className="w-full">
                    <h2 className="text-2xl font-medium mt-5 mb-2">
                      Get Latest activities from our popular users.
                    </h2>

                    {postSug.data.users &&
                    postSug.data.users.filter(
                      (user) => user.user_account_type == 0
                    ).length > 0 ? (
                      <div className="m-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {postSug.data.users &&
                          postSug.data.users
                            .filter((user) => user.user_account_type == 0)
                            .map((user) => (
                              <div
                                key={user.user_id}
                                className="col-container my-3 cursor-pointer"
                              >
                                <div className="bg-gradient-to-tr from-yellow-400 to-playRed p-0.5 rounded-2xl">
                                  <div className="bg-white p-0.5 rounded-2xl">
                                    <div className=" w-28 h-28 relative rounded-2xl">
                                      <Image
                                        src={user.picture}
                                        layout="fill"
                                        alt="username"
                                        objectFit="cover"
                                        className="rounded-2xl"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <p className="text-xs font-semibold text-center whitespace-nowrap">
                                  {user.username}
                                </p>
                              </div>
                            ))}
                        <div />
                      </div>
                    ) : (
                      <p className="w-full text-lg font-medium">
                        No Content Creators Available
                      </p>
                    )}
                  </div>

                  {/* end here */}

                  <div className="w-full flex items-center justify-between mt-20">
                    <Link href="/" passHref>
                      <small className="skip-step cursor-pointer hover:underline">
                        Or Skip this step for now.
                      </small>
                    </Link>

                    <button
                      onClick={() =>
                        followUsers(
                          postSug.data.users.filter(
                            (user) => user.user_account_type == 0
                          )
                        )
                      }
                      className="
                      bg-red-600
                       font-medium rounded-md text-white  w-[150px] h-[30px] "
                    >
                      {profileInputData.loading ? (
                        <span>Loading...</span>
                      ) : (
                        <>
                          {postSug.data.users &&
                          postSug.data.users.filter(
                            (user) => user.user_account_type == 0
                          ).length > 0 ? (
                            <span>
                              Follow{" "}
                              {postSug.data.users &&
                                postSug.data.users.filter(
                                  (user) => user.user_account_type == 0
                                ).length}{" "}
                              &amp; Continue
                            </span>
                          ) : (
                            <span>Finish</span>
                          )}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Onboarding;
