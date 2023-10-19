import React from "react";
import { Product } from "@/types";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";

interface ProductListProps {
  items: Product[];
  title: string;
}

const ProductList: React.FC<ProductListProps> = ({ items, title }) => {
  return (
    <div className="space-y-4">
      <p className="font-bold text-3xl">{title}</p>
      {items.length === 0 && <NoResults />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
