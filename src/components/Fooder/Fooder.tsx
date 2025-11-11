"use client";
import React from "react";
import List from "./List";
import {
  EnvelopeIcon,
  FacebookIcon,
  InstagramIcon,
  SearchIcon,
  XIcon
} from "../Icons/Icons";
import { Button } from "../ui/button";

const Footer = () => {
  const Company_list = ["About", "Team", "Careers", "Blog"];
  const Contact_list = ["Help & Support", "Partner with us", "Ride with us"];
  const Legal_list = [
    "Terms & Conditions",
    "Refund & Cancellation",
    "Privacy Policy",
    "Cookie Policy"
  ];

  const currentYear = new Date().getFullYear();
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME || "Your Company";

  return (
    <footer className="md:px-32 px-6 pt-16 bg-[#212121]">
      <div className="flex md:flex-row flex-col md:space-x-6 space-x-0 md:space-y-0 space-y-5 justify-between">
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-4 place-content-stretch">
          <List title="Company" list={Company_list} />
          <List title="Contact" list={Contact_list} />
          <List title="Legal" list={Legal_list} />
        </div>
        <div className="space-y-4">
          <h1 className="text-[#F5F5F5] text-[18px] uppercase opacity-70">
            Follow Us
          </h1>
          <div className="flex space-x-2 items-center pt-2">
            <InstagramIcon />
            <FacebookIcon />
            <XIcon />
          </div>

          <p className="text-[#BBBBBB] text-[18px] font-bold">
            Receive exclusive offers in your mailbox
          </p>

          <div className="flex md:flex-row flex-col md:items-center gap-4 w-full">
            <div className="flex items-center space-x-4  bg-[#424242] rounded-[8px] py-3 px-4 flex-1">
              <EnvelopeIcon />
              <input
                type="email"
                placeholder="Enter Your email"
                className="placeholder:text-[#ADADAD] text-[#ADADAD] text-[18px] outline-none w-full bg-[#424242]"
              />
            </div>
            <Button
              text="Subscribe"
              className="text-white font-medium text-[18px] rounded-[8px] py-7 px-7"
              style={{
                background:
                  "linear-gradient(97.86deg, #FFBA26 -8.95%, #FF9A0E 109.24%)",
                boxShadow:
                  "0px 20px 40px 0px #FFAE004A, 0px 5px 10px 0px #FFAE0042"
              }}
              position="left"
            />
          </div>
        </div>
      </div>
      <div className="w-full h-px mt-12 bg-[#424242]"></div>

      <div className="flex md:flex-row flex-col items-center justify-between space-x-2 py-4">
        <span className="flex items-center space-x-3 text-[#F5F5F5]">
          <p className="opacity-70">All rights Reserved </p>
          <p>
            © {companyName}, {currentYear}
          </p>
        </span>

        <span className="flex items-center space-x-1 text-[#F5F5F5]">
          <p>Made with</p>
          <p>💛</p>
          <p>by</p>
          <p className="text-white font-semibold">Themewagon</p>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
