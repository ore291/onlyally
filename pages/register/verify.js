import { getCookie } from "cookies-next";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VerificationCodeInput from "../../components/verify/VerificationCodeInput";
import {registerVerifyStart, registerVerifyResendStart} from "../../store/slices/userSlice"

const Verify = () => {
  const [value, setValue] = useState("");

  const onChange = (value) => setValue(value);

  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({});

  const verifyEmail = useSelector((state) => state.user.registerVerify)

  const dispatch = useDispatch();

  const emailId = getCookie("user_email") || "";

  const submitVerfication = (event) => {
    event.preventDefault();
    if(inputData.verification_code){
      dispatch(registerVerifyStart({verification_code : inputData.verification_code , email : emailId}));
    }
  };

  const resendVerfication = (event) => {
    event.preventDefault();
  dispatch(registerVerifyResendStart({email : emailId}));
  };
  return (
    <div className="h-screen bg-white py-20 px-3">
      <div className="container mx-auto">
        <div className="max-w-sm mx-auto md:max-w-lg">
          <div className="w-full">
            <div className="bg-white shadow-2xl h-80 py-3 rounded text-center">
              <h1 className="text-2xl font-bold">Your Verification Code</h1>
              <p>For verification code, please check your registered email inbox</p>
              <VerificationCodeInput
                length={6}
                label={"Enter Verification Code"}
                loading={loading}
                labelClassName="c-email-content-text text-italic opacity-30 text-title mx-auto"
                onComplete={(code) => {
                  setLoading(true);
                  setTimeout(() => {
                    setInputData({
                      ...inputData,
                      verification_code: code,
                    });
                  }, 1000);
                  setTimeout(() => {
                    setLoading(false);
                    setInputData({
                      ...inputData,
                      verification_code: code,
                    });
                  }, 10000);
                }}
              />
               <div className="my-2">
                  <button 
                    className="w-24  h-8 rounded bg-lightPlayRed text-white" 
                    onClick={(event)=>submitVerfication(event)}
                    disabled={verifyEmail.buttonDisable || inputData.verification_code ? false : true}
                  >
                    
                    {verifyEmail.loadingButtonContent != null ? verifyEmail.loadingButtonContent : "Verify"}
                  </button>
                </div>
              {/* <div className="flex justify-center text-center mt-5">
                <a className="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer">
                  <span className="font-bold">Resend OTP</span>
                  <i className="bx bx-caret-right ml-1" />
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
