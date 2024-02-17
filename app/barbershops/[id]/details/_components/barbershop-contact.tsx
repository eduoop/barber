"use client";
import { Button } from "@/app/_components/ui/button";
import { Smartphone } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface BarbershopContactProps {
    phone: string;
}

const BarbershopContact = ({ phone }: BarbershopContactProps) => {

  const handleCopyPhoneClick = () => {
    toast.success("Telefone copiado!");
    navigator.clipboard.writeText("(31) 98262-3783");
  };

  return (
    <div className="py-5 px-5 w-full">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Smartphone />
          <span className="text-white font-[400]">{phone}</span>
        </div>

        <Button
          onClick={handleCopyPhoneClick}
          variant={"secondary"}
          className="font-bold"
        >
          Copiar
        </Button>
      </div>
    </div>
  );
};

export default BarbershopContact;
