"use client";
import React, { MouseEventHandler } from "react";
import { Product } from "@/types";
import Image from "next/image";
import IconButton from "@/components/ui/icon-button";
import { Expand, ShoppingCart } from "lucide-react";
import Currency from "@/components/ui/currency";
import { useRouter } from "next/navigation";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";

interface ProductCardProps {
  data: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();
  const cart = useCart();
  const { onOpen } = usePreviewModal();

  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
    router.push(`/product/${data?.id}`);
  };

  const onPreview: MouseEventHandler<SVGSVGElement> = (event) => {
    event.stopPropagation();
    onOpen(data);
  };

  const onAddToCart: MouseEventHandler<SVGSVGElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white cursor-pointer group rounded-xl border p-3 space-y-4 hover:scale-[102%] transition "
    >
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          className="aspect-square rounded-md object-cover"
          src={data?.images[0]?.url}
          fill
          alt="product image"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5 ">
          <div className="flex flex-row gap-x-6 justify-center">
            <IconButton
              icon={
                <Expand
                  size={20}
                  className="text-gray-600"
                  onClick={onPreview}
                />
              }
            />
            <IconButton
              icon={
                <ShoppingCart
                  size={20}
                  className="text-gray-600"
                  onClick={onAddToCart}
                />
              }
            />
          </div>
        </div>
      </div>
      {/*  Description  */}
      <div>
        <p className="font-semibold text-lg ">{data.name}</p>
        <p className="text-sm text-gray-500">{data.category?.name}</p>
      </div>
      {/*    Price*/}
      <div className="flex items-center justify-between">
        <Currency value={data.price} />
      </div>
    </div>
  );
};

export default ProductCard;
