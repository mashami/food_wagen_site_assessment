"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import React, { Dispatch, SetStateAction } from "react";
import { TextInput } from "../TextInput";
import { ComboboxDemo } from "../Combobox/Combobox";
import { Button } from "../ui/button";

interface EditProductDialogProps {
  setEditProductDialoagOpen: Dispatch<SetStateAction<boolean>>;
  editProductDialoagOpen: boolean;
}

const EditProductDialog = ({
  setEditProductDialoagOpen,
  editProductDialoagOpen
}: EditProductDialogProps) => {
  return (
    <Dialog
      onOpenChange={setEditProductDialoagOpen}
      open={editProductDialoagOpen}
    >
      <DialogContent className="bg-white px-16 py-12 md:min-w-[574px]">
        <DialogHeader>
          <DialogTitle className="text-[#FF9A0E] text-[40px] font-bold text-center">
            Edit Meal
          </DialogTitle>

          {/* <DialogDescription> */}
          <form
            action=""
            className="space-y-6 flex flex-col justify-center items-center"
          >
            <TextInput
              name="food_name"
              placeholder="Food name"
              label="Food name"
              required
            />
            <TextInput
              name="food_rating"
              placeholder="Food rating"
              label="Food rating"
              required
            />
            <TextInput
              name="food_name"
              placeholder="Food image (link)"
              label="Food image (link)"
              required
            />
            <TextInput
              name="restaurant_name"
              placeholder="Restaurant name"
              label="Restaurant name"
              required
            />
            <TextInput
              name="restaurant_logo"
              placeholder="Restaurant logo (link)"
              label="Restaurant logo (link)"
              required
            />

            <ComboboxDemo />

            <div className="flex md:flex-row justify-between gap-2 w-full">
              <Button
                text="Edit"
                className="text-white rounded-[12px] w-full"
                style={{
                  background:
                    "linear-gradient(97.86deg, #FFBA26 -8.95%, #FF9A0E 109.24%)",
                  boxShadow:
                    "0px 20px 40px 0px #FFAE004A, 0px 5px 10px 0px #FFAE0042"
                }}
              />

              <Button
                text="Cancel"
                variant={"ghost"}
                className="text-black rounded-[12px] text-[10px] w-full border border-[#FFBA26]"
                onClick={() => setEditProductDialoagOpen(false)}
              />
            </div>
          </form>
          {/* </DialogDescription> */}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;
