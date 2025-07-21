"use client";

import { CloudUpload, Cross } from "lucide-react";
import Image from "next/image";

const Uploader = ({ image, setImage, onFileChange }) => {
  const handleImageChange = (files) => {
    if (files && files[0]) {
      const file = files[0];
      setImage(URL.createObjectURL(file));
      onFileChange(file); // Pass the selected file to the parent component
    }
  };

  return (
    <>
      {image ? (
        <div className="relative ">
          <Image
            className="h-auto w-96"
            height={70}
            width={90}
            src={image}
            alt="Uploaded Image"
          />
          <span
            onClick={() => {
              setImage(null);
              onFileChange(null); // Clear the file in the parent component
            }}
            className="absolute rounded-full right-[-10px] top-[-10px] cursor-pointer font-semibold text-red-500 text-xl"
          >
            X
          </span>
        </div>
      ) : (
        <div
          onClick={() => document.querySelector("#image-query").click()}
          className="h-32 lg:w-72 md:w-72 sm:w-56 border-2 border-slate-300 border-dashed flex justify-center items-center"
        >
          <div className="text-center">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="image-query"
              onChange={({ target: { files } }) => handleImageChange(files)}
            />
            <div className="flex justify-center text-4xl font-semibold text-green-400">
              <CloudUpload />
            </div>
            <p>Drag your image here</p>
            <p className="text-slate-400 dark:text-slate-600">
              (Only jpeg, webp, png is accepted)
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Uploader;
