"use client";

import React from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  CalendarIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  UserIcon,
} from "lucide-react";

import {
  Sheet,
  SheetTrigger,
} from "./ui/sheet";
import SideMenu from "./side-menu";

const Header = () => {

  return (
    <Card>
      <CardContent className="p-5 justify-between flex flex-row items-center">
        <Image src="/logo.png" alt="Barber" height={22} width={120} />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"outline"} size={"icon"}>
              <MenuIcon size={18} />
            </Button>
          </SheetTrigger>

          <SideMenu/>
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default Header;
