// import React from "react";
// import logo from "../assets/logo.png";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import { Fragment, useState } from "react";
// import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
// import {
//   ArrowPathIcon,
//   Bars3Icon,
//   ChartPieIcon,
//   CursorArrowRaysIcon,
//   FingerPrintIcon,
//   SquaresPlusIcon,
//   XMarkIcon,
// } from "@heroicons/react/24/outline";
// import {
//   ChevronDownIcon,
//   PhoneIcon,
//   PlayCircleIcon,
// } from "@heroicons/react/20/solid";
// import { Link } from "react-router-dom";

// const products = [
//   {
//     name: "Analytics",
//     description: "Get a better understanding of your traffic",
//     href: "#",
//     icon: ChartPieIcon,
//   },
//   {
//     name: "Engagement",
//     description: "Speak directly to your customers",
//     href: "#",
//     icon: CursorArrowRaysIcon,
//   },
//   {
//     name: "Security",
//     description: "Your customers’ data will be safe and secure",
//     href: "#",
//     icon: FingerPrintIcon,
//   },
//   {
//     name: "Integrations",
//     description: "Connect with third-party tools",
//     href: "#",
//     icon: SquaresPlusIcon,
//   },
//   {
//     name: "Automations",
//     description: "Build strategic funnels that will convert",
//     href: "#",
//     icon: ArrowPathIcon,
//   },
// ];
// const callsToAction = [
//   { name: "Watch demo", href: "#", icon: PlayCircleIcon },
//   { name: "Contact sales", href: "#", icon: PhoneIcon },
// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }
// export default function Header() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   return (
//     <>
//       <header className="bg-gray-800 fixed w-full">
//         <nav
//           className="mx-auto flex max-w-7xl items-center justify-items-end px-6 py-2 lg:px-8"
//           aria-label="Global"
//         >
//           <div className="flex lg:flex-1">
//             <a href="#" className="-m-1.5 p-1.5">
//               <span className="sr-only">Your Company</span>
//               <img className="h-16 w-auto" src={logo} alt="" />
//             </a>
//           </div>
//           <div className="flex lg:hidden">
//             <button
//               type="button"
//               className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700  btttn_kabbg"
//               onClick={() => setMobileMenuOpen(true)}
//             >
//               <span className="sr-only">Open main menu</span>
//               <Bars3Icon className="h-6 w-6" aria-hidden="true" />
//             </button>
//           </div>
//           <Popover.Group className="hidden lg:flex lg:gap-x-12">
//             <a href="#" className="text-sm font-semibold leading-6 text-white">
//               <Link to="/">Home</Link>
//             </a>
//             <a className="text-sm font-semibold leading-6 text-white">
//               <Link to="/AboutUS">About</Link>
//             </a>
//             <a href="#" className="text-sm font-semibold leading-6 text-white">
//               Features
//             </a>
//             <a href="#" className="text-sm font-semibold leading-6 text-white">
//               Roadmap
//             </a>
//           </Popover.Group>
//           <div className="hidden lg:flex lg:flex-1 lg:justify-end"></div>
//         </nav>
//         <Dialog
//           as="div"
//           className="lg:hidden"
//           open={mobileMenuOpen}
//           onClose={setMobileMenuOpen}
//         >
//           <div className="fixed inset-0 z-10" />
//           <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
//             <div className="flex items-center justify-between">
//               <a href="#" className="-m-1.5 p-1.5">
//                 <span className="sr-only">Your Company</span>
//                 <img className="h-8 w-auto" src={logo} alt="" />
//               </a>
//               <button
//                 type="button"
//                 className="-m-2.5 rounded-md p-2.5 text-gray-700"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 <span className="sr-only">Close menu</span>
//                 <XMarkIcon className="h-6 w-6" aria-hidden="true" />
//               </button>
//             </div>
//             <div className="mt-6 flow-root">
//               <div className="-my-6 divide-y divide-gray-500/10">
//                 <div className="space-y-2 py-6">
//                   <a
//                     href="#"
//                     className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
//                   >
//                     Home
//                   </a>
//                   <a
//                     href="#"
//                     className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
//                   >
//                     About
//                   </a>
//                   <a
//                     href="#"
//                     className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
//                   >
//                     Features
//                   </a>
//                   <a
//                     href="#"
//                     className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
//                   >
//                     Roadmap
//                   </a>
//                   <a
//                     href="#"
//                     className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
//                   >
//                     Company
//                   </a>
//                 </div>
//                 <div className="py-6"></div>
//               </div>
//             </div>
//           </Dialog.Panel>
//         </Dialog>
//       </header>
//     </>
//   );
// }


import React, { useEffect, useState } from 'react';
// import logo_web from "../../assets/logo_web.png";
// import ai_logo from "../../assets/ai_footer.svg";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "../assets/logo.png";
import { Link } from 'react-router-dom';

function Header() {

  const [first, setfirst] = useState(true);
  const [selectedValue, setSelectedValue] = useState("");

  const [navbarBg, setNavbarBg] = useState(false);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleResize = () => {
    if (window.innerWidth < 1100) {
      setfirst(false);
      console.log("Check");
    } else {
      setfirst(true);
    }
  };

  useEffect(() => {
    // window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
  });
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
       className="bg-black shadow-lg p-0 shadow-white border-bottom fixed w-100"
        id="navbar"
      >
        <Container>
        <Navbar.Brand href="#home">
        <Link to="/"><img className="img-fluid w-auto res_left" src={logo} alt="" /></Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="justify-content-end hxn_res flex-grow-1 pe-5 ps-5">
             <Link to="/"> <Nav.Link href="/" className="header_ka">
                Home
              </Nav.Link></Link>
              <Link to="/AboutUS"> <Nav.Link href="/AboutUS" className="header_ka">
                About
              </Nav.Link></Link>
              <Link to="/"> <Nav.Link href="#referral" className="header_ka">
              Referral
              </Nav.Link></Link>
              <Nav.Link href="#buy_now" className="header_ka">
                Buy Now
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header