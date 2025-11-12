"use client";
import React, { useState } from "react";
import { Logo } from "../Icons/Icons";
import { Button } from "../ui/button";
import { AddProductDialog } from "../Dialogs";

const Navbar = () => {
  const [addProductDialoagOpen, setaddProductDialoagOpen] =
    useState<boolean>(false);

  return (
    <>
      <nav className="xl:px-32 md:px-12 px-6 py-4">
        <div className="flex items-center place-content-between">
          <Logo />

          <Button
            text="Add Meal"
            className="text-white rounded-[16px]"
            style={{
              background:
                "linear-gradient(97.86deg, #FFBA26 -8.95%, #FF9A0E 109.24%)",
              boxShadow:
                "0px 20px 40px 0px #FFAE004A, 0px 5px 10px 0px #FFAE0042"
            }}
            onClick={() => setaddProductDialoagOpen(true)}
          />
        </div>
      </nav>

      <AddProductDialog
        SetaddProductDialoagOpen={setaddProductDialoagOpen}
        addProductDialoagOpen={addProductDialoagOpen}
      />
    </>
  );
};

export default Navbar;
