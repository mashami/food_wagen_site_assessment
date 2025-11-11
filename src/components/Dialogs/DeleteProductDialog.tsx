"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import React, { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { deleteProduct } from "@/services/products";
import { toast } from "../ui/use-toast";
import { useAppContext } from "@/context/AppContext";

interface DeleteProductDialogProps {
  id: string;
  setDeleteProductDialoagOpen: Dispatch<SetStateAction<boolean>>;
  deleteProductDialoagOpen: boolean;
}

const DeleteProductDialog = ({
  setDeleteProductDialoagOpen,
  id,
  deleteProductDialoagOpen
}: DeleteProductDialogProps) => {
  const { isLoading, setIsLoading } = useAppContext();

  const handleDelete = async (id: string) => {
    setIsLoading(true);

    try {
      const result = await deleteProduct(id);
      if (!result.ok) {
        toast({
          variant: "destructive",
          description: result.message || "Failed to add product"
        });
        setIsLoading(false);
        return;
      }
      toast({
        variant: "default",
        description: result.message || "Delete successfully"
      });
      setIsLoading(false);
      return;
    } catch (error) {
      toast({
        variant: "destructive",
        description: "An unexpected error occurred"
      });
      setIsLoading(false);
      return;
    }
  };

  return (
    <Dialog
      onOpenChange={setDeleteProductDialoagOpen}
      open={deleteProductDialoagOpen}
    >
      <DialogContent className="bg-white px-10 py-12 md:min-w-[574px]">
        <DialogHeader>
          <DialogTitle className="text-[#FF9A0E] text-[40px] font-bold text-center">
            Delete Meal
          </DialogTitle>

          {/* <DialogDescription> */}
          <div className="space-y-6 flex flex-col justify-center items-center">
            <p className="text-[#9E9E9E] text-[15px]">
              Are you sure you want to delete this meal? Actions cannot be
              reversed.
            </p>
            <div className="flex md:flex-row justify-between gap-2 w-full">
              <Button
                text={isLoading ? "Deleting...." : "Yes"}
                className="text-white rounded-[12px] w-full py-6"
                style={{
                  background:
                    "linear-gradient(97.86deg, #FFBA26 -8.95%, #FF9A0E 109.24%)",
                  boxShadow:
                    "0px 20px 40px 0px #FFAE004A, 0px 5px 10px 0px #FFAE0042"
                }}
                onClick={() => handleDelete(id)}
              />

              <Button
                text="Cancel"
                variant={"ghost"}
                className="text-black rounded-[12px] text-[10px] w-full border border-[#FFBA26] py-6"
                onClick={() => setDeleteProductDialoagOpen(false)}
              />
            </div>
          </div>
          {/* </DialogDescription> */}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProductDialog;
