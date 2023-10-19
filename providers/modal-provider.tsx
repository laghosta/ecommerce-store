"use client";
import React, { useEffect, useState } from "react";
import PreviewModal from "@/components/preview-modal";
import usePreviewModal from "@/hooks/use-preview-modal";
import usePaymentModal from "@/hooks/use-payment-modal";
import PaymentModal from "@/components/payment-modal";

const ModalProvider = () => {
  const preview = usePreviewModal();
  const payment = usePaymentModal();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {preview.isOpen && <PreviewModal />}
      {payment.isOpen && <PaymentModal />}
    </>
  );
};

export default ModalProvider;
