"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MaterialInput from "../home/MaterialInput";
import { Button, Image, Modal, Text } from "./index";
import HCard from "../materials/HCard";

const Materials = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <section className="mt-[40px]">
      <div className="flex md:px-[40px] flex-wrap justify-between md:flex-row md:items-center md:justify-between">
        <Text variant="h1">Learning Materials</Text>

        <Button
          onClick={() => setIsOpen(true)}
          variant="contained"
          className="h-[50px]"
        >
          ADD MATERIAL
        </Button>
      </div>

      {/* all materials */}
      <div className="mt-[20px] flex flex-wrap justify-center gap-[15px] md:ml-[60px] md:gap-[30px]">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <HCard
              key={i}
              onClick={() => router.push(`/dashboard/materials/dlk-${i}`)}
            />
          ))}
      </div>
      {/* add materials */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <MaterialInput />
      </Modal>
    </section>
  );
};

export default Materials;
