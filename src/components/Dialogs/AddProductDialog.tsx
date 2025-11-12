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
    label: "Open Now"
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
  const [food_name, setFood_name] = useState<string>("");
  const [foodAvatar, setFoodAvatar] = useState<string>("");
  const [restaurant_logo, setRestaurant_logo] = useState<string>("");
  const [restaurant_status, setRestaurant_status] = useState<
    "true" | "false" | ""
  >("");
  const [food_rating, setFood_rating] = useState<string>("");
  const [restaurant_name, setRestaurant_name] = useState<string>("");
  const { refetchProducts, isLoading, setIsLoading } = useAppContext();
  const createdAt = new Date().toISOString();

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    const food_ratingConvert = parseInt(food_rating);

    if (!restaurant_logo.startsWith("http") || !foodAvatar.startsWith("http")) {
      toast({
        variant: "destructive",
        description: "Valid Image provided"
      });
      return;
    }

    if (!restaurant_status) {
      toast({
        variant: "destructive",
        description: "Please select restaurant status."
      });
      return;
    }

    if (
      !foodAvatar ||
      !createdAt ||
      !restaurant_logo ||
      !food_name ||
      !food_ratingConvert ||
      !restaurant_name
    ) {
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
          avatar: foodAvatar,
          createdAt,
          logo: restaurant_logo,
          name: food_name,
          open: restaurant_status,
          rating: food_ratingConvert,
          restaurantName: restaurant_name
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

      setFood_name("");
      setFoodAvatar("");
      setRestaurant_logo("");
      setFood_rating("");
      setRestaurant_name("");
      setRestaurant_status("");
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
              setValue={setFood_name}
              value={food_name}
              name="food_name"
              placeholder="Food name"
              required
            />
            <TextInput
              setValue={setFood_rating}
              value={food_rating}
              type="number"
              name="food_rating"
              placeholder="Food rating"
              required
            />
            <TextInput
              setValue={setFoodAvatar}
              value={foodAvatar}
              name="food_image"
              placeholder="Food image (link)"
              required
            />
            <TextInput
              setValue={setRestaurant_name}
              value={restaurant_name}
              name="restaurant_name"
              placeholder="Restaurant name"
              required
            />
            <TextInput
              setValue={setRestaurant_logo}
              value={restaurant_logo}
              name="restaurant_logo"
              placeholder="Restaurant logo (link)"
              required
            />

            <Select
              onValueChange={(value: "true" | "false") => {
                setRestaurant_status(value);
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
