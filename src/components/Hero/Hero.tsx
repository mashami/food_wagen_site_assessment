"use client";

import React from "react";
import { ProductsWrap } from "../ProductsWrap";

function Hero() {
  return (
    <section className="xl:px-32 md:px-12 px-6 pt-12 pb-20 space-y-12">
      <h1 className="text-[43px] font-bold text-center w-full">
        Featured Meals
      </h1>

      <div>
        <ProductsWrap />
      </div>
    </section>
  );
}

export default Hero;
