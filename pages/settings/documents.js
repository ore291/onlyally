import React, { useState, useEffect } from "react";
import ProfileNavItem from "../../components/ProfileNavBar";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import {
  addKycDocumentStart,
  getKycDocumentStart,
} from "../../store/slices/kycDocumentSlice";
import NoDataFound from "../../components/NoDataFound/NoDataFound";

export default function Documents() {
  const dispatch = useDispatch();

  const kycDocDetails = useSelector((state) => state.kycDocument.kycDocDetails);
  const addKycDocInput = useSelector(
    (state) => state.kycDocument.addKycDocInput
  );

  useEffect(() => {
    dispatch(getKycDocumentStart());
  }, []);

  const [selectedCover, setSelectedCover] = useState();

  const coverChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedCover(e.target.files[0]);
    }
  };

  const [inputData, setInputData] = useState({});

  const [image, setImage] = useState({});

  const [uploadDocumentID, setUploadDocumentID] = useState(null);

  const handleChangeImage = (event) => {
    coverChange(event);
    if (event.currentTarget.type === "file") {
     

      setInputData({
        ...inputData,
        document_file: event.currentTarget.files[0],
        document_id: 8,
      });
      let reader = new FileReader();
      let file = event.currentTarget.files[0];

      reader.onloadend = () => {
        setImage({ ...image, [8]: reader.result });
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUploadDocumentID(8);
    dispatch(addKycDocumentStart(inputData));
  };

  return (
    <>
      <div className="flex flex-col justify-center lg:flex-row">
        <ProfileNavItem />
        <div className="w-full lg:w-4/5 lg:mr-16 lg:ml-6 bg-white px-4 mx-auto mt-5 shadow py-4">
          {kycDocDetails.loading ? (
            ""
          ) : (
            <>
              <h1 className="text-[#17A2B8] text-base font-semibold pb-5">
                {kycDocDetails.data.document_status_text_formatted}
              </h1>
            </>
          )}

          <div className="flex justify-center mt-2">
            <div className="rounded-lg shadow-xl bg-gray-50 lg:w-1/2">
              <div className="m-4">
                <label className="inline-block mb-2 text-gray-500">
                  Upload either your driving license or passport.
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col w-full  border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                    {selectedCover != null ? (
                      <div className="w-full relative h-[300px]">
                        <Image
                          src={URL.createObjectURL(selectedCover)}
                          objectFit="contain"
                          layout="fill"
                          className="object-cover rounded-lg"
                          alt="Thumb"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-32 pt-7">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                          Select a photo
                        </p>
                      </div>
                    )}

                    <input
                      type="file"
                      onChange={(event) => handleChangeImage(event)}
                      id="add-cover-img"
                      className="opacity-0"
                      accept="image/*"
                    />
                  </label>
                 
                </div>
                {
                  kycDocDetails.loading ? (
                    <p className="text-xs">Loading...</p>
                  ) : kycDocDetails.data.documents.length > 0 ? (
                    kycDocDetails.data.documents.map((doc, i) => (
                       <label className="inline-flex items-center ml-6" key={i}>
                              <input
                                type="radio"
                                className="form-radio"
                                name="streaming-mode"
                                value="private"
                                onChange={(event) =>
                                  setInputData({
                                    ...inputData,
                                    document_id: doc.document_id,
                                  })
                                }
                              />
                              <span className="ml-2">{doc.name}</span>
                            </label>
                    ))
                  ) : (<NoDataFound/>)
                }
               
              </div>
              <div className="flex p-2 space-x-4">
                <button
                  className="px-4 py-2 text-white bg-red-500 rounded shadow-xl"
                  onClick={() => setSelectedCover(null)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 text-white bg-green-500 rounded shadow-xl"
                  onClick={(event) => handleSubmit(event)}
                  disabled={inputData.document_id === null}
                >
                  {uploadDocumentID !== null
                    ? addKycDocInput.loadingButtonContent
                    : "Send for Approval"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
