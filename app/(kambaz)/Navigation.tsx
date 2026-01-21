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
    pathname === path
      ? "bg-white text-danger text-center border-0"
      : "bg-black text-white text-center border-0";

  const textClass = (path: string) =>
    pathname === path
      ? "text-danger text-decoration-none"
      : "text-white text-decoration-none";

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

      <ListGroupItem className={linkClass("/account")}>
        <Link href="/account" id="wd-account-link" className={textClass("/account")}>
          <FaRegCircleUser className="fs-1" />
          <br />
          Account
        </Link>
      </ListGroupItem>

      <ListGroupItem className={linkClass("/dashboard")}>
        <Link href="/dashboard" id="wd-dashboard-link" className={textClass("/dashboard")}>
          <AiOutlineDashboard className="fs-1" />
          <br />
          Dashboard
        </Link>
      </ListGroupItem>

      <ListGroupItem className={linkClass("/courses")}>
        <Link href="/courses" id="wd-course-link" className={textClass("/courses")}>
          <LiaBookSolid className="fs-1" />
          <br />
          Courses
        </Link>
      </ListGroupItem>

      <ListGroupItem className={linkClass("/calendar")}>
        <Link href="/calendar" id="wd-calendar-link" className={textClass("/calendar")}>
          <IoCalendarOutline className="fs-1" />
          <br />
          Calendar
        </Link>
      </ListGroupItem>

      <ListGroupItem className={linkClass("/inbox")}>
        <Link href="/inbox" id="wd-inbox-link" className={textClass("/inbox")}>
          <FaInbox className="fs-1" />
          <br />
          Inbox
        </Link>
      </ListGroupItem>

      <ListGroupItem className={linkClass("/labs")}>
        <Link href="/labs" id="wd-labs-link" className={textClass("/labs")}>
          <LiaCogSolid className="fs-1" />
          <br />
          Labs
        </Link>
      </ListGroupItem>
    </ListGroup>
  );
}
