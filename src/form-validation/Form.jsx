import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  const [users, setUsers] = useState([]);

  const handleChanges = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.fullName.trim() || formData.fullName.length < 4) {
      newErrors.fullName = "Full Name must be at least 4 characters long";
    }

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Password and Confirm Password must match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setUsers((prevUsers) => [
      ...prevUsers,
      {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      },
    ]);

    setFormData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    toast.success("Login Successful! ✅", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 w-96">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
              Create an Account
            </h2>
            <form onSubmit={submitHandler} className="flex flex-col gap-4">
              <input
                className="w-full border border-gray-300 px-4 py-2 text-sm rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                type="text"
                name="fullName"
                placeholder="Enter Name here"
                value={formData.fullName}
                onChange={handleChanges}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">{errors.fullName}</p>
              )}

              <input
                className="w-full border border-gray-300 px-4 py-2 text-sm rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                type="email"
                placeholder="Enter Your Email"
                name="email"
                value={formData.email}
                onChange={handleChanges}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}

              <input
                className="w-full border border-gray-300 px-4 py-2 text-sm rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChanges}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}

              <input
                className="w-full border border-gray-300 px-4 py-2 text-sm rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChanges}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}

              <button className="text-sm px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full mt-3">
                Submit
              </button>
            </form>

            <p className="text-xs text-gray-600 mt-4 text-center">
              By registering, you agree to our{" "}
              <span className="text-indigo-600">Terms & Conditions</span> and{" "}
              <span className="text-indigo-600">Privacy Policy</span>.
            </p>
          </div>
          <ToastContainer />
        </div>
      </div>

      {users.map((elem, idx) => (
        <div className="bg-white text-black flex m-4" key={idx}>
          <h1>name-{elem.fullName}</h1>
          <h1>email-{elem.email}</h1>
        </div>
      ))}
    </>
  );
};

export default Form;
