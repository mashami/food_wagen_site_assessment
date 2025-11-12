"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import React, { Dispatch, SetStateAction, useState } from "react";
import { TextInput } from "../TextInput";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { useAppContext } from "@/context/AppContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface AddProductDialogProps {
  SetaddProductDialoagOpen: Dispatch<SetStateAction<boolean>>;
  addProductDialoagOpen: boolean;
}

interface frameworksTypes {
  value: string;
  label: string;
}

export const frameworks: frameworksTypes[] = [
  {
    value: "true",
    label: "Open"
  },
  {
    value: "false",
    label: "Closed"
  }
];

const AddProductDialog = ({
  SetaddProductDialoagOpen,
  addProductDialoagOpen
}: AddProductDialogProps) => {
  const [name, setName] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [logo, setLogo] = useState<string>("");
  const [selected, setSelected] = useState<"true" | "false" | "">("");
  const [rating, setRating] = useState<string>("");
  const [restaurantName, setRestaurantName] = useState<string>("");
  const { refetchProducts, isLoading, setIsLoading } = useAppContext();

  const createdAt = new Date().toISOString();

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selected) {
      toast({
        variant: "destructive",
        description: "Please select restaurant status."
      });
      return;
    }

    if (!avatar || !createdAt || !logo || !name || !rating || !restaurantName) {
      toast({
        variant: "destructive",
        description: "All fields are required......"
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/addProduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          avatar,
          createdAt,
          logo,
          name,
          open: selected,
          rating,
          restaurantName
        })
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        toast({
          variant: "destructive",
          description: result.message || "Failed to add product"
        });
        return;
      }

      toast({
        description: "Product added successfully!"
      });

      setName("");
      setAvatar("");
      setLogo("");
      setRating("");
      setRestaurantName("");
      setSelected("");

      SetaddProductDialoagOpen(false);
      refetchProducts();
    } catch (error) {
      toast({
        variant: "destructive",
        description: "An unexpected error occurred"
      });
      console.error("Add product error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      onOpenChange={SetaddProductDialoagOpen}
      open={addProductDialoagOpen}
    >
      <DialogContent className="bg-white md:px-16 px-6 py-12 md:min-w-[574px] min-w-full">
        <DialogHeader>
          <DialogTitle className="text-[#FF9A0E] text-[40px] font-bold text-center">
            Add a meal
          </DialogTitle>

          <form
            onSubmit={handleAddProduct}
            className="space-y-6 flex flex-col justify-center items-center"
          >
            <TextInput
              setValue={setName}
              value={name}
              name="food_name"
              placeholder="Food name"
              required
            />
            <TextInput
              setValue={setRating}
              value={rating}
              name="food_rating"
              placeholder="Food rating"
              required
            />
            <TextInput
              setValue={setAvatar}
              value={avatar}
              name="food_image"
              placeholder="Food image (link)"
              required
            />
            <TextInput
              setValue={setRestaurantName}
              value={restaurantName}
              name="restaurant_name"
              placeholder="Restaurant name"
              required
            />
            <TextInput
              setValue={setLogo}
              value={logo}
              name="restaurant_logo"
              placeholder="Restaurant logo (link)"
              required
            />

            <Select
              onValueChange={(value: "true" | "false") => {
                setSelected(value);
                //   toast({
                //     variant: "destructive",
                //     description: value
                //   });
              }}
            >
              <SelectTrigger className="bg-[#F5F5F5] border w-full px-4 py-6 border-black/10 rounded-[6px] overflow-hidden focus:outline-none focus:ring-2 focus:ring-orange-400 transition">
                <SelectValue placeholder="Restaurant status (open/close)" />
              </SelectTrigger>

              <SelectContent className="bg-white space-y-3">
                {frameworks.map((d) => (
                  <SelectItem
                    className="py-2 cursor-pointer"
                    key={d.value}
                    value={d.value}
                  >
                    {d.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex md:flex-row justify-between gap-2 w-full">
              <Button
                text={isLoading ? "Adding..." : "Add"}
                type="submit"
                disabled={isLoading}
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
                className="text-black rounded-[12px] text-[18px] w-full border border-[#FFBA26]"
                onClick={() => SetaddProductDialoagOpen(false)}
                type="button"
              />
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
