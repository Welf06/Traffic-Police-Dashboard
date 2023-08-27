import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";

import logo from './Assets/logo.png'
import policeLogo from './Assets/police_logo.png'
import apmLogo from './Assets/apm_logo.png'
 
export default function NavbarComponent() {

 
  return (
    <Navbar className="mx-auto py-1.5 px-8 lg:px-12 lg:py-2 bg-gray-300">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
      <div className="flex-col gap-2">
         <img src={apmLogo} alt="logo" className="md:h-6 md:w-16 lg:h-8 lg:w-28" />
        </div>
        <Typography
          className="mr-4 cursor-pointer py-1 font-bold text-black md:text-lg lg:text-xl tracking-tighter leading-tight"
        >
          APM Traffic Assist System
        </Typography>
        <img src={policeLogo} alt="logo" className="md:h-10 md:w-10 lg:h-12 lg:w-12" />
      </div>
    </Navbar>
  );
}