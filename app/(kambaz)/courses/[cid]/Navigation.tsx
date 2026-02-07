'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CourseNavigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path ? "active" : "text-danger";

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      
      <Link
        href="/courses/1500/home"
        id="wd-course-home-link"
        className={`list-group-item border-0 ${isActive("/courses/1500/home")}`}
      >
        Home
      </Link><br />

      <Link
        href="/courses/1500/modules"
        id="wd-course-modules-link"
        className={`list-group-item border-0 ${isActive("/courses/1500/modules")}`}
      >
        Modules
      </Link><br />

      <Link
        href="/courses/1500/piazza"
        id="wd-course-piazza-link"
        className={`list-group-item border-0 ${isActive("/courses/1500/piazza")}`}
      >
        Piazza
      </Link><br />

      <Link
        href="/courses/1500/zoom"
        id="wd-course-zoom-link"
        className={`list-group-item border-0 ${isActive("/courses/1500/zoom")}`}
      >
        Zoom
      </Link><br />

      <Link
        href="/courses/1500/assignments"
        id="wd-course-assignments-link"
        className={`list-group-item border-0 ${isActive("/courses/1500/assignments")}`}
      >
        Assignments
      </Link><br />

      <Link
        href="/courses/1500/quizzes"
        id="wd-course-quizzes-link"
        className={`list-group-item border-0 ${isActive("/courses/1500/quizzes")}`}
      >
        Quizzes
      </Link><br />

      <Link
        href="/courses/1500/grades"
        id="wd-course-grades-link"
        className={`list-group-item border-0 ${isActive("/courses/1500/grades")}`}
      >
        Grades
      </Link><br />

      <Link
        href="/courses/1500/people/table"
        id="wd-course-people-link"
        className={`list-group-item border-0 ${isActive("/courses/1500/people/table")}`}
      >
        People
      </Link><br />
    </div>
  );
}
