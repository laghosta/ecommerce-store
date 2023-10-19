import React from "react";
import { Image as ImageType } from "@/types";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Tab } from "@headlessui/react";

interface GalleryTabProps {
  image: ImageType;
}

const GalleryTab: React.FC<GalleryTabProps> = ({ image }) => {
  return (
    <Tab className="relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white ">
      {({ selected }) => (
        <div>
          <span className="absolute h-full w-full inset-0 aspect-square overflow-hidden rounded-md">
            <Image
              src={image.url}
              fill
              className="object-cover object-center"
              alt="image"
            />
          </span>
          <span
            className={cn(
              "absolute inset-0 rounded-md ring-offset-2 ring-2",
              selected ? "ring-black" : "ring-transparent"
            )}
          />
        </div>
      )}
    </Tab>
  );
};

export default GalleryTab;
