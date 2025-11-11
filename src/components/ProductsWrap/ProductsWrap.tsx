"use client";

import React, { Suspense, useContext, useEffect, useState } from "react";
import { ProductCard } from "../ProductCard";
import { getAllProducts } from "@/services/products";
import { ProductTypes } from "@/utils/types";
import { Loader } from "@/components/Loader";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/context/AppContext";

function ProductsWrapContent() {
  const [visibleCount, setVisibleCount] = useState<number>(8);
  const { products, isLoading } = useAppContext();

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  const handleLess = () => {
    setVisibleCount((prev) => prev - 8);
  };
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loader />
      </div>
    );
  }

  const visibleProducts = products?.slice(0, visibleCount);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-12 w-full">
        {visibleProducts?.map((product) => (
          <ProductCard
            key={product.id}
            Price={product.Price}
            food_image={product.image}
            food_rating={product.rating}
            food_name={product.name}
            open={product.open}
            restaurant_image={product.avatar}
            restaurant_status={product.status}
            createdAt={product.createdAt}
          />
        ))}
      </div>

      {visibleCount < products.length && (
        <div className="flex justify-center mt-16">
          <div className="flex items-center gap-4">
            {visibleCount != 8 && (
              <Button
                text="Load less"
                className="text-white rounded-[12px]"
                style={{
                  background:
                    "linear-gradient(97.86deg, #FFBA26 -8.95%, #FF9A0E 109.24%)",
                  boxShadow:
                    "0px 20px 40px 0px #FFAE004A, 0px 5px 10px 0px #FFAE0042"
                }}
                onClick={handleLess}
              />
            )}
            <Button
              text="Load More"
              className="text-white rounded-[12px]"
              style={{
                background:
                  "linear-gradient(97.86deg, #FFBA26 -8.95%, #FF9A0E 109.24%)",
                boxShadow:
                  "0px 20px 40px 0px #FFAE004A, 0px 5px 10px 0px #FFAE0042"
              }}
              svg={
                <svg
                  width={8}
                  height={13}
                  viewBox="0 0 8 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.10938 6.48047L1.80469 11.8125C1.53125 12.0586 1.12109 12.0586 0.875 11.8125L0.246094 11.1836C0 10.9375 0 10.5273 0.246094 10.2539L4.45703 6.01562L0.246094 1.80469C0 1.53125 0 1.12109 0.246094 0.875L0.875 0.246094C1.12109 0 1.53125 0 1.80469 0.246094L7.10938 5.57812C7.35547 5.82422 7.35547 6.23438 7.10938 6.48047Z"
                    fill="white"
                  />
                </svg>
              }
              onClick={handleLoadMore}
            />
          </div>
        </div>
      )}
      {products.length > 0 && visibleCount > products.length && (
        <div>
          <div className="flex justify-center mt-16">
            <Button
              text="Load less"
              className="text-white rounded-[12px]"
              position={"left"}
              style={{
                background:
                  "linear-gradient(97.86deg, #FFBA26 -8.95%, #FF9A0E 109.24%)",
                boxShadow:
                  "0px 20px 40px 0px #FFAE004A, 0px 5px 10px 0px #FFAE0042"
              }}
              onClick={handleLess}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductsWrap() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-10">
          <Loader />
        </div>
      }
    >
      <ProductsWrapContent />
    </Suspense>
  );
}
