import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RxAvatar } from "react-icons/rx";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

const ProfileAvatar = ({ reload, setReload }) => {
  const dataFireBase = useSelector((state) => state.firebase.value);
  const [imageData, setImageData] = useState("");
  const data = useSelector((state) => state.user.value);
  const token = localStorage.getItem("token");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault(); 

    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", file.name);
        const response = await axios.post(
          `http://localhost:8000/api/user/avatar`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        Swal.fire({
          icon: "success",
          title: "Change Picture Success",
          text: " ",
          timer: 1500,
          showConfirmButton: false,
        });
        setReload(!reload);
      } else {
        Swal.fire({
          icon: "warning",
          iconColor: "red",
          title: "File cannot be empty",
        });
      }
      event.preventDefault();
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {}, [reload]);

  return (
    <div className="w-full p-4">
      <div className="text-gray-700 xs:text-xl md:text-3xl font-semibold">
        <p>Change Your Avatar Here</p>{" "}
      </div>
      <form onSubmit={handleSubmit} action="#">
        <div className="p-2">
          <div className="my-auto p-4">
            {data.profileImg || dataFireBase.profileImg ? (
              <img
                className="h-32 w-32 border rounded-full object-fill"
                src={`http://localhost:8000/avatars/${
                  data.profileImg || dataFireBase.imgUrl
                }`}
                alt="Avatar"
              />
            ) : (
              <RxAvatar size={"50"} color="#2CA4A5" />
            )}
          </div>

          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            Choose your file
          </label>

          <input
            className="block w-full border border-gray-300 rounded-sm cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
            type="file"
            id="file_input"
            name="file"
            // onChange={handleChange}
          ></input>
        </div>

        <div className="p-2">
          <button
            type="submit"
            className="w-full bg-bgPrimary hover:btnHverify text-white font-semibold py-2 px-4 rounded"
          >
            Save Change
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileAvatar;
