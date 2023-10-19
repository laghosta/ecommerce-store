"use client";
import React from "react";
import useCart from "@/hooks/use-cart";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import axios from "axios";
import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import toast from "react-hot-toast";
import usePaymentModal from "@/hooks/use-payment-modal";

const Summary = () => {
  const payment = usePaymentModal();
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  const total = items.reduce((sum, el) => sum + Number(el.price), 0);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Success!");
    }
    if (searchParams.get("canceled")) {
      toast.error("Something went wrong!");
    }
  }, [searchParams, removeAll]);

  const onCheckout = () => {
    payment.onOpen(total);
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:p-8 lg:mt-0">
      <h2 className="text-gray-900 text-lg font-medium">Order Summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-300 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency value={total} />
        </div>
      </div>
      <Button onClick={onCheckout} className="w-full mt-6">
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
