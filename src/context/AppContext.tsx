"use client";

import { toast } from "@/components/ui/use-toast";
import { ProductTypes } from "@/utils/types";
import { useRouter } from "next/navigation";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from "react";

interface AppContextData {
  products: ProductTypes[] | [];
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setProducts: Dispatch<SetStateAction<ProductTypes[] | []>>;
  refetchProducts: () => void;
}

const AppContext = createContext<AppContextData | null>(null);

export const useAppContext = (): AppContextData => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }

  return context;
};

interface AppContextProviderProps {
  children: React.ReactNode;
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [products, setProducts] = useState<ProductTypes[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchProducts = async () => {
    setIsLoading(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
      // const baseUrl = "http://localhost:3000";

      const response = await fetch(`${baseUrl}/api/getAllProducts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) {
        toast({
          variant: "destructive",
          description: "Failed to fetch products"
        });
        return;
      }

      const result = await response.json();
      setProducts(result.data || []);
    } catch (err) {
      toast({
        variant: "destructive",
        description: `Failed to fetch products: ${err}`
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const refetchProducts = async () => {
    await fetchProducts();
  };

  // console.log(userInfo)

  const value: AppContextData = {
    isLoading,
    refetchProducts,
    setProducts,
    setIsLoading,
    products
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
