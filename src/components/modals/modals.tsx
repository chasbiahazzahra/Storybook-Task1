import React, { FC, HTMLAttributes, useState } from "react";
import IconifyIcon from "../icon"

//interface buat nampung props 
export interface modalProps extends HTMLAttributes<HTMLDivElement> {
  size: "small" | "medium" | "large"; //buat ngatur size
  title: string; //buat value title di modals
  text: string; //buat value text di modals
  modalButton: string; //value buat tombol (text)
  primaryButton: string; //value buat tombol (text)
  secondButton: string; //value buat tombol (text)
}
//1. Props ini banyak variannya bisa (enum, string, boolean) tinggal eksplor di documentasinya.
//2. Props ini buat custom element di storybook
//3. Props bakal dimasukkin di params elemnt buat pasing argumen ke dalam element

//init component 
export const Modals: React.FC<modalProps> = ({ 
  //parameter buat nampung propsnya 
  size, 
  modalButton,
  title,
  text,
  children, //children nanti diisi element html yang lain (text, header, inputan, dll)
  primaryButton,
  secondButton,
}) => {
  //args buat ganti size modalsnya (contoh penggunaan args)
  const sizeStyles = {
    small: "max-w-[360px] max-h-[200px]",
    medium: "max-w-[580px] max-h-[180px]",
    large: "max-w-[800px] max-h-[180px]",
  };
  const [isOpen, setIsOpen] = useState<boolean>(false);

  //function buat open modal pakai button 
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="bg-[#005EFF] p-3 rounded-md text-white font-semibold hover:bg-primary-400"
        onClick={() => toggleModal()}
      >
        {modalButton}
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75">
          <div
          //args yang di storybook dipassing ke dalam style/value di tag html
            className={`relative flex flex-col justify-between shadow-md rounded- p-4 bg-white rounded-md ${size === "small" ? sizeStyles.small : size === "medium" ? sizeStyles.medium : size === "large" ? sizeStyles.large : ""}`}
          >
            <div>
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">{title}</h4>
                <span
                  className="cursor-pointer text-[#2D2E31]"
                  onClick={() => setIsOpen(false)}
                >
                  <IconifyIcon icon="tabler:x" fontSize={18} />
                </span>
              </div>
              <div>
                <p className="text-[14px] text-neutral">{text}</p>
              </div>
              <div className="border border-dashed border-[#9F67E7] w-full h-10 bg-[#E6CCFFCC] rounded-md flex items-center p-4">
                {children}
              </div>
              <div className="w-full flex justify-end gap-4 mt-4">
                <button className="border border-primary text-primary font-medium bg-[#FEFEFE] rounded-md p-2 w-fit">
                  {secondButton}
                </button>
                <button className="border border-1 p-2 bg-[#005EFF] text-white font-medium rounded-md shadow-md">
                  {primaryButton}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};