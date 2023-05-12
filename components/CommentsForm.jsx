"use client";
import React, { useRef, useState, useEffect } from "react";
import { submitComment } from "@/services";

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setlocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentEl = useRef(null);
  const nameEl = useRef(null);
  const emailEl = useRef(null);
  const storeDataEl = useRef(null);

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem("name");
    emailEl.current.value = window.localStorage.getItem("email");
  }, []);

  const handlePostSubmission = () => {
    setError(false);
    const { value: comment } = commentEl.current;
    const { value: name } = nameEl.current;
    const { value: email } = emailEl.current;
    const { checked: storeData } = storeDataEl.current;
    // const storeData = storeData.current.value;
    console.log("storeData :", storeData);

    if (!comment || !name || !email) {
      setError(true);
      return;
    }
    const commentObj = {
      name,
      email,
      comment,
      slug,
    };
    if (typeof window !== "undefined") {
      console.log("window :", window.localStorage);
      if (storeData) {
        window.localStorage.setItem("name", name);
        window.localStorage.setItem("email", email);
      } else {
        window.localStorage.removeItem("name", name);
        window.localStorage.removeItem("email", email);
      }
    }

    // if (storeData) {
    //   window.localStorage.setItem("name", name);
    //   window.localStorage.setItem("email", email);
    // } else {
    //   window.localStorage.remove("name", name);
    //   window.localStorage.remove("email", email);
    // }
    submitComment(commentObj).then((res) => {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    });
  };
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        Leave a reply
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          ref={commentEl}
          placeholder="Comment"
          name="comment"
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          ref={nameEl}
          placeholder="Name"
          name="name"
          className="py-2  px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
        />
        <input
          type="text"
          ref={emailEl}
          placeholder="Email"
          name="email"
          className="py-2  px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
        />
        {/* <input
          type="text"
          ref={storeData}
          placeholder="storeData"
          name="storeData"
          className="py-2  px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
        /> */}
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            className="cursor:pointer"
            ref={storeDataEl}
            htmlFor={storeDataEl}
            // checked={formData.storeData}
            // onChange={onInputChange}
            type="checkbox"
            id="storeDataEl"
            name="storeDataEl"
            value="true"
          />
          <label
            className="text-gray-500 cursor-pointer ml-2"
            htmlFor="storeData"
          >
            {" "}
            Save my name, email in this browser for the next time I comment.
          </label>
        </div>
      </div>
      {error && <p className="text-sx text-red-500">All fields are required</p>}
      <div className="mt-8">
        <button
          type="button"
          onClick={handlePostSubmission}
          className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer"
        >
          Post Comment
        </button>
        {showSuccessMessage && (
          <span className="text-xl float-right font-semibold mt-3 text-green-500">
            Comment submitted for review
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
