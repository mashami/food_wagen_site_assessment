"use client";
import React, { useState } from "react";
import { Dots, PriceIcon, StarIcon } from "../Icons/Icons";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { DeleteProductDialog, EditProductDialog } from "../Dialogs";
import { getProduct } from "@/services/products";
import { toast } from "../ui/use-toast";
import { useAppContext } from "@/context/AppContext";
import { ProductTypes } from "@/utils/types";

interface ProductCardProps {
  id: string;
  Price: string;
  food_name: string;
  food_image: string;
  open: boolean | string;
  food_rating: number;
  restaurant_image: string;
  restaurant_status: string;
  createdAt?: string;
}

function ProductCard({
  open = false,
  Price,
  createdAt,
  food_image,
  food_rating,
  food_name,
  restaurant_image,
  id,
  restaurant_status
}: ProductCardProps) {
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [deletOpen, setDeleteOpen] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductTypes>();
  const foodValidImage = food_image?.startsWith("http")
    ? food_image
    : "/food.svg";

  const avatorValidImage = restaurant_image?.startsWith("http")
    ? restaurant_image
    : "/avator.svg";
  const { setIsLoading, isLoading, refetchProducts } = useAppContext();

  const getproduct = async (id: string) => {
    try {
      const response = await getProduct(id);

      if (!response || response.error) {
        toast({
          variant: "destructive",
          description: response?.message || "Failed to delete product"
        });
        setIsLoading(false);
        refetchProducts();
        return;
      }

      const result = (await response.data) as ProductTypes;
      setProduct(result);
      return;
    } catch (error) {
      toast({
        variant: "destructive",
        description: "An unexpected error occurred"
      });
      setIsLoading(false);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-[30px] w-full">
        <div className="h-[250px] w-full overflow-hidden rounded-xl relative">
          <img
            src={foodValidImage ? foodValidImage : "/Imagetest.png"}
            alt={food_name || "food"}
            className="w-full h-full object-cover rounded-xl"
          />

          <div className="flex items-center gap-2 absolute top-6 left-6 px-[10px] py-[5px] bg-[#F17228] rounded-[8px]">
            <PriceIcon />
            <p className="text-white font-bold text-[22px]">${Price}</p>
          </div>
        </div>

        <div className="flex justify-between gap-2">
          <div className="flex space-x-2">
            <div className="h-[54px] w-[54px] overflow-hidden rounded-xl relative flex-shrink-0">
              <img
                src={avatorValidImage ? avatorValidImage : "/Imagetest.png"}
                alt={food_name || "restaurant"}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            <div className="text-[16px]">
              <p className="text-[#424242] font-bold line-clamp-1">
                {food_name}
              </p>
              <span className="flex items-center space-x-2">
                <StarIcon />
                <p className="text-[#FFB30E]">{food_rating}</p>
              </span>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="select-none">
              <Dots />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white">
              <DropdownMenuItem
                className="cursor-pointer select-none"
                onClick={() => {
                  setEditOpen(true), getproduct(id);
                }}
              >
                {isLoading ? "Editing..." : "Edit"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setDeleteOpen(true)}
              >
                <p className="text-red-500 hover:text-red-500 ease-in-out duration-150">
                  Delete
                </p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div>
          <p
            className={cn(
              "font-bold text-[16px] rounded-[10px] px-5 py-1.5 w-fit",
              open == "true" || open == true
                ? "bg-[#79B93C33] text-[#79B93C] hover:bg-[#79B93C33]"
                : "bg-[#F1722833] text-[#F17228] hover:bg-[#F1722833]"
            )}
          >
            {open == "true" || open == true ? "Open Now" : "Closed"}
          </p>
        </div>
      </div>
      {product && (
        <EditProductDialog
          foodAvatar={product.avatar}
          id={product.id}
          restaurant_logo={product.logo}
          food_name={product.name}
          food_rating={product.rating.toString()}
          restaurant_status={product.open}
          restaurantName={product.restaurantName}
          editProductDialoagOpen={editOpen}
          setEditProductDialoagOpen={setEditOpen}
        />
      )}
      <DeleteProductDialog
        id={id}
        deleteProductDialoagOpen={deletOpen}
        setDeleteProductDialoagOpen={setDeleteOpen}
      />
    </>
  );
}

export default ProductCard;
