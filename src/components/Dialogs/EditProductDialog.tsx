"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import React, { Dispatch, SetStateAction, useState } from "react";
import { TextInput } from "../TextInput";
import { ComboboxDemo } from "../Combobox/Combobox";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { frameworks } from "./AddProductDialog";
import { useAppContext } from "@/context/AppContext";
import { updateProduct } from "@/services/products";

interface EditProductDialogProps {
  setEditProductDialoagOpen: Dispatch<SetStateAction<boolean>>;
  editProductDialoagOpen: boolean;
  id: string;
  name: string;
  avatar: string;
  logo: string;
  open: boolean | string;
  rating: number;
  restaurantName: string;
}

const EditProductDialog = ({
  id,
  setEditProductDialoagOpen,
  editProductDialoagOpen,
  name: names,
  avatar: avatars,
  logo: logos,
  open: opens,
  rating: ratings,
  restaurantName: restaurant_name
}: EditProductDialogProps) => {
  const [name, setName] = useState<string>(names);
  const [avatar, setAvatar] = useState<string>(avatars);
  const [logo, setLogo] = useState<string>(logos);
  const [selected, setSelected] = useState<"true" | "false" | "">("");
  const [rating, setRating] = useState<string>(ratings.toString());
  const [restaurantName, setRestaurantName] = useState<string>(restaurant_name);
  const currentYear = new Date().toISOString();
  const { refetchProducts, isLoading, setIsLoading } = useAppContext();

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!selected) {
        toast({
          variant: "destructive",
          description: "Please select restaurant status."
        });
        setIsLoading(false);
        return;
      }

      if (
        !avatar ||
        !currentYear ||
        !logo ||
        !name ||
        !rating ||
        !restaurantName
      ) {
        toast({
          variant: "destructive",
          description: "All fields are required."
        });
        setIsLoading(false);
        return;
      }

      const ratingConvert = parseInt(rating);

      const response = await updateProduct({
        id,
        avatar,
        createdAt: currentYear,
        name,
        open: selected,
        rating: ratingConvert,
        restaurantName,
        logo
      });

      if (!response.ok) {
        toast({
          variant: "destructive",
          description: response.message || "Failed to update product."
        });
        setIsLoading(false);
        return;
      }

      toast({
        variant: "default",
        description: response.message || "Product updated successfully!"
      });

      refetchProducts();
      setEditProductDialoagOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        description: "An unexpected error occurred."
      });
      console.error("Update product error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      onOpenChange={setEditProductDialoagOpen}
      open={editProductDialoagOpen}
    >
      <DialogContent className="bg-white md:px-16 px-6 py-12 md:min-w-[574px] min-w-full">
        <DialogHeader>
          <DialogTitle className="text-[#FF9A0E] text-[40px] font-bold text-center">
            Edit Meal
          </DialogTitle>

          {/* <DialogDescription> */}
          <form
            action=""
            onSubmit={handleEdit}
            className="space-y-6 flex flex-col justify-center items-center"
          >
            <TextInput
              setValue={setName}
              value={name}
              name="food_name"
              placeholder="Food name"
              label="Food name"
              required
            />
            <TextInput
              setValue={setRating}
              value={rating}
              type="number"
              name="food_rating"
              placeholder="Food rating"
              label="Food rating"
              required
            />
            <TextInput
              setValue={setAvatar}
              value={avatar}
              name="food_name"
              placeholder="Food image (link)"
              label="Food image (link)"
              required
            />
            <TextInput
              setValue={setRestaurantName}
              value={restaurantName}
              name="restaurant_name"
              placeholder="Restaurant name"
              label="Restaurant name"
              required
            />
            <TextInput
              setValue={setLogo}
              value={logo}
              name="restaurant_logo"
              placeholder="Restaurant logo (link)"
              label="Restaurant logo (link)"
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
                text={isLoading ? "Edit...." : "Edit"}
                type="submit"
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
                type="reset"
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
