"use client";

import { useState } from "react";

import { LayoutDashboard, ChevronRight, Plus } from "lucide-react";

import { useWindowWidth } from "@react-hook/window-size";
import { Nav } from "./Nav";
import { Button } from "../ui/button";
import { Img } from "..";

export default function SideNavbar({}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div
      className={`relative border-r px-3 pb-10 pt-6 transition-all duration-300 ${
        isCollapsed ? "w-[80px]" : "w-auto"
      }`}
    >
      <a
        className={` md:flex tab:hidden items-center gap-2 py-3 my-auto text-lg whitespace-nowrap focus:outline-none flex-1`}
        href="/"
      >
        <Img
          src="img_group_1.svg"
          width={158}
          height={48}
          alt="Frame 1000008413"
          className="flex h-10 w-auto object-contain hover:opacity-80 transition-opacity duration-300 cursor-pointer"
          onClick={() => {
            window.open("/", "_self");
          }}
        />
      </a>
      {!mobileWidth && (
        <div className="absolute right-[-35px] top-7">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className=" rounded-full p-2"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
            variant: "default",
          },
          {
            title: "Add Blog",
            href: "/dashboard/add-blog",
            icon: Plus,
            variant: "ghost",
          },
        ]}
      />
    </div>
  );
}
