"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
interface BarbershopLink {
  href: string;
  name: string;
}

const BarbershopLink = ({ name, href }: BarbershopLink) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Button
      className="text-md"
      asChild
      variant={isActive ? "default" : "outline"}
    >
      <Link href={href} key={name}>
        {name}
      </Link>
    </Button>
  );
};

export default BarbershopLink;
