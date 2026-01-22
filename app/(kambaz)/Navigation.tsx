"use client";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function KambazNavigation() {
  const pathname = usePathname();
  
  const linkClass = (path: string) =>
    pathname.startsWith(path)
      ? "bg-white text-center border-0"
      : "bg-black text-center border-0";
  
  const isDashboardActive = pathname === "/dashboard" || pathname.startsWith("/courses");
  
  return (
    <ListGroup
      id="wd-kambaz-navigation"
      style={{ width: 110 }}
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      <ListGroupItem
        className="bg-black border-0 text-center"
        as="a"
        target="_blank"
        href="https://www.northeastern.edu/"
        id="wd-neu-link"
      >
        <img src="/images/NEU.png" width="75px" alt="Northeastern University" />
      </ListGroupItem>

      <ListGroupItem className="bg-black text-center border-0">
        <Link href="/account" id="wd-account-link" className="text-white text-decoration-none">
          <FaRegCircleUser className="fs-1 text-white" />
          <br />
          Account
        </Link>
      </ListGroupItem>

      <ListGroupItem className={linkClass("/dashboard")}>
        <Link 
          href="/dashboard" 
          id="wd-dashboard-link" 
          className={isDashboardActive ? "text-danger text-decoration-none" : "text-white text-decoration-none"}
        >
          <AiOutlineDashboard className={`fs-1 ${isDashboardActive ? "text-danger" : "text-danger"}`} />
          <br />
          Dashboard
        </Link>
      </ListGroupItem>

      <ListGroupItem className="bg-black text-center border-0">
        <Link href="/dashboard" id="wd-course-link" className="text-white text-decoration-none">
          <LiaBookSolid className="fs-1 text-danger" />
          <br />
          Courses
        </Link>
      </ListGroupItem>

      <ListGroupItem className="bg-black text-center border-0">
        <Link href="/calendar" id="wd-calendar-link" className="text-white text-decoration-none">
          <IoCalendarOutline className="fs-1 text-danger" />
          <br />
          Calendar
        </Link>
      </ListGroupItem>

      <ListGroupItem className="bg-black text-center border-0">
        <Link href="/inbox" id="wd-inbox-link" className="text-white text-decoration-none">
          <FaInbox className="fs-1 text-danger" />
          <br />
          Inbox
        </Link>
      </ListGroupItem>

      <ListGroupItem className="bg-black text-center border-0">
        <Link href="/labs" id="wd-labs-link" className="text-white text-decoration-none">
          <LiaCogSolid className="fs-1 text-danger" />
          <br />
          Labs
        </Link>
      </ListGroupItem>
    </ListGroup>
  );
}