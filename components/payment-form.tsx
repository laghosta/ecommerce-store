"use client";

import React, { useEffect, useRef, useState } from "react";
import valid from "card-validator";
import toast from "react-hot-toast";

interface Error {
  field: string;
  value: string;
}

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cvv, setCVV] = useState("");
  const [errors, setErrors] = useState<Error[]>([]);
  const cardYearRef = useRef(null);
  const cardCVVRef = useRef(null);
  const [cardType, setCardType] = useState<string | undefined>();

  const isCardNumberValid = () => {
    if (cardNumber.length >= 15) {
      const err = {
        field: "cardNumber",
        value: "Card number invalid",
      };
      if (!valid.number(cardNumber).isValid) {
        const curError = errors.find((el) => el.field === "cardNumber");
        if (!curError) {
          setErrors([...errors, err]);
        }
      }
      if (valid.number(cardNumber).isValid) {
        setCardType(valid.number(cardNumber).card?.niceType);
        const errs = errors.filter((el) => el.field !== "cardNumber");
        setErrors(errs);
      }
    } else {
      return 0;
    }
  };

  const throwError = (field: string, value: string) => {
    const err = {
      field: field,
      value: value,
    };
    const currError = errors.find((el) => el.field === field);
    if (!currError) {
      setErrors([...errors, err]);
    }
  };
  const removeErrors = (field: string) => {
    const errs = errors.filter((el) => el.field !== field);
    setErrors(errs);
  };

  const isCardNotExpired = () => {
    if (!valid.expirationDate(`${expMonth}/${expYear}`).isValid) {
      throwError("expDate", "Card Is Expired!");
    } else {
      removeErrors("expDate");
    }
  };

  useEffect(() => {
    if (expMonth.length >= 2) {
      //@ts-ignore
      cardYearRef.current?.focus();
    }
    if (expYear.length >= 2 && expMonth.length >= 2) {
      //@ts-ignore
      cardCVVRef.current?.focus();
    }
    isCardNotExpired();
  }, [expYear, expMonth]);

  useEffect(() => {
    console.log(valid.number("370030495588487"));
    isCardNumberValid();
  }, [cardNumber]);

  const onSubmit = (event: any) => {
    event.preventDefault();
    if (cardNumber.length < 15) {
      const err = {
        field: "cardNumber",
        value: "Invalid card number!",
      };
      setErrors([...errors, err]);
    }
    if (expMonth.length < 2 || expMonth.length > 2) {
      const err = {
        field: "expDate",
        value: "Invalid expiry date!",
      };
      setErrors([...errors, err]);
    }
    if (expYear.length < 2 || expYear.length > 2) {
      const err = {
        field: "expDate",
        value: "Invalid expiry date!",
      };
      const currError = errors.find((el) => el.field === "expDate");
      if (!currError) {
        setErrors([...errors, err]);
      }
    }
    if (errors.length) {
      return 0;
    }
    console.log({
      cardNumber,
      cardHolder,
      expDate: `${expMonth}/${expYear}`,
      CVV: cvv,
      cardType,
    });
  };

  return (
    <form className="flex flex-col w-3/4 gap-y-2 jus  tify-between items-center">
      <div className="flex flex-col w-full">
        <label htmlFor="cardNumber">Card Number</label>
        <input
          id="cardNumber"
          type="number"
          placeholder="0123 4567 8901 2345"
          className="w-full outline-0 border rounded-lg px-2 border-gray-700"
          maxLength={19}
          value={cardNumber}
          onInput={(event) => setCardNumber(event.currentTarget.value)}
        />
        <p className="text-xs">
          {errors.map((el) => (el.field === "cardNumber" ? el.value : ""))}
        </p>
      </div>
      <div>
        <label htmlFor="cardHolder">Card Holder</label>
        <input
          id="cardHolder"
          type="text"
          placeholder="ELON MUSK"
          className="w-full outline-0 border rounded-lg px-2 border-gray-700"
          minLength={2}
          maxLength={255}
          value={cardHolder}
          onInput={(event) => setCardHolder(event.currentTarget.value)}
        />
        <p className="text-xs">
          {errors.map((el) => (el.field === "cardHolder" ? el.value : ""))}
        </p>
      </div>
      <div className="flex items-center gap-x-2 justify-between">
        <div>
          <label htmlFor="expiryMonth">Expiry Date</label>
          <div className="flex flex-row items-center gap-x-2">
            <input
              id="expiryMonth"
              type="number"
              placeholder="MM"
              maxLength={2}
              className="w-1/2 text-center outline-0 border rounded-lg px-2 border-gray-700"
              value={expMonth}
              onInput={(event) => setExpMonth(event.currentTarget.value)}
            />
            <p className="text-3xl">/</p>
            <input
              placeholder="YY"
              type="number"
              className="w-1/2 text-center outline-0 border rounded-lg px-2 border-gray-700"
              maxLength={2}
              ref={cardYearRef}
              value={expYear}
              onInput={(event) => setExpYear(event.currentTarget.value)}
            />
            <p className="text-xs">
              {errors.map((el) => (el.field === "expDate" ? el.value : ""))}
            </p>
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="CVV">CVV/CVC</label>
          <input
            ref={cardCVVRef}
            id="CVV"
            placeholder="CVV/CVC"
            type="number"
            className="w-full text-center outline-0 border rounded-lg px-2 border-gray-700"
            maxLength={2}
            value={cvv}
            onInput={(event) => setCVV(event.currentTarget.value)}
          />
          <p className="text-xs">
            {errors.map((el) => (el.field === "cvvNumber" ? el.value : ""))}
          </p>
        </div>
      </div>
      <div>{!errors.find((el) => el.field === "cardNumber") && cardType}</div>
      <button
        className="px-6 mt-2 py-2 bg-gray-900 hover:bg-gray-700 text-white transition rounded-md"
        onClick={onSubmit}
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default PaymentForm;
