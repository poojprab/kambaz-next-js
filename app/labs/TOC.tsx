"use client";

import { Nav, NavItem, NavLink } from "react-bootstrap";
import { usePathname } from "next/navigation";
import Link from "next/link";
export default function TOC() {
  const pathname = usePathname();
 return (
   <Nav variant="pills">
     <NavItem>
       <NavLink href="/labs" as={Link} className={`nav-link ${pathname.endsWith("labs") ? "active" : ""}`}>
         Labs </NavLink>
     </NavItem>
     <NavItem>
       <NavLink href="/labs/lab1" as={Link} className={`nav-link ${pathname.endsWith("lab1") ? "active" : ""}`}>
         Lab 1 </NavLink>
     </NavItem>
     <NavItem>
       <NavLink href="/labs/lab2" as={Link} className={`nav-link ${pathname.endsWith("lab2") ? "active" : ""}`}>
         Lab 2 </NavLink>
     </NavItem>
     <NavItem>
       <NavLink href="/labs/lab3" as={Link} className={`nav-link ${pathname.endsWith("lab3") ? "active" : ""}`}>
         Lab 3 </NavLink>
     </NavItem>
     <NavItem>
       <NavLink href="/" as={Link}>
         Kambaz </NavLink>
     </NavItem>
     <NavItem>
       <NavLink 
          href="https://github.com/poojprab" 
          target="_blank"
          rel="noopener noreferrer"
        >
          My Github
        </NavLink>
     </NavItem>
   </Nav>
);}

