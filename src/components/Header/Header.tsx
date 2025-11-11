import React from "react";
import { BagIcon, MotorIcon, SearchIcon } from "../Icons/Icons";
import { Button } from "../ui/button";
import Image from "next/image";

const Header = () => {
  return (
    <section className="md:px-32 px-6 bg-[#FFB30E] relative overflow-hidden pb-20">
      <div className="pt-10 flex items-center justify-between space-x-3">
        <div className="space-y-4">
          <h1 className="flex flex-col relative">
            <span className="md:text-[88px] text-[40px] font-medium text-white">
              Are you starving?
            </span>
            <span className="text-white text-[22px] font-normal relative  -top-4">
              Within a few clicks, find meals that are accessible near you
            </span>
          </h1>

          <div className=" bg-white space-y-4 rounded-3xl p-6">
            <div className="">
              <div className="flex items-center space-x-3">
                <button className="flex space-x-3 items-center py-[10px] px-6 bg-[#F172281A] hover:bg-[#F172281A]/40 ease-in-out duration-300 rounded-xl">
                  <MotorIcon />
                  <p className="text-[#F17228] font-medium text-[18px]">
                    Delivery
                  </p>
                </button>

                <button className="flex space-x-3 items-center py-[10px] px-6 rounded-xl hover:bg-black/20 ease-in-out duration-300">
                  <BagIcon />
                  <p className="text-[#757575] font-medium text-[18px]">
                    Pickup
                  </p>
                </button>
              </div>
            </div>

            <div className="w-full h-px bg-black/90 opacity-10"></div>

            <form className="flex md:flex-row flex-col md:items-center gap-4 w-full">
              <div className="flex items-center space-x-4 bg-[#F5F5F5] rounded-[8px] py-3 px-4 flex-1">
                <SearchIcon />
                <input
                  type="text"
                  placeholder="What do you like to eat today?"
                  className="placeholder:text-[#9E9E9E] text-[18px] outline-none w-full bg-[#F5F5F5]"
                />
              </div>
              <Button
                svg={
                  <svg
                    width={15}
                    height={15}
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.8086 12.1133C14.0547 12.3867 14.0547 12.7969 13.7812 13.043L13.0156 13.8086C12.7695 14.082 12.3594 14.082 12.0859 13.8086L9.37891 11.1016C9.24219 10.9648 9.1875 10.8008 9.1875 10.6367V10.1719C8.20312 10.9375 7 11.375 5.6875 11.375C2.54297 11.375 0 8.83203 0 5.6875C0 2.57031 2.54297 0 5.6875 0C8.80469 0 11.375 2.57031 11.375 5.6875C11.375 7.02734 10.9102 8.23047 10.1719 9.1875H10.6094C10.7734 9.1875 10.9375 9.26953 11.0742 9.37891L13.8086 12.1133ZM5.6875 9.1875C7.60156 9.1875 9.1875 7.62891 9.1875 5.6875C9.1875 3.77344 7.60156 2.1875 5.6875 2.1875C3.74609 2.1875 2.1875 3.77344 2.1875 5.6875C2.1875 7.62891 3.74609 9.1875 5.6875 9.1875Z"
                      fill="white"
                    />
                  </svg>
                }
                text="Find Meal"
                className="text-white font-medium text-[18px] rounded-[8px] py-7 px-7"
                style={{
                  background:
                    "linear-gradient(95.71deg, #FF7A7A -39.64%, #F75900 135.31%)"
                }}
                position="left"
              />
            </form>
          </div>
        </div>

        <div className="relative md:block hidden">
          <div
            className="h-[397.14px] w-[397.14px] overflow-hidden absolute -top-[110px] right-0 rounded-full"
            style={{
              boxShadow:
                "-40px 25px 50px rgba(0, 0, 0, 0.25), -10px 10px 20px rgba(0, 0, 0, 0.15)",
              borderRadius: "50%"
            }}
          >
            <Image
              src={"/FoodPlate.svg"}
              alt="food"
              style={{
                objectFit: "cover"
              }}
              fill
              className="w-full h-full absolute"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
