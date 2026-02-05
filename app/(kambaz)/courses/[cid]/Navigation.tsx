"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CourseNavigation({
  params,
}: {
  params: { cid: string };
}) {
  const { cid } = params;
  const pathname = usePathname();

  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const route = link.toLowerCase();
        const href =
          link === "People"
            ? `/courses/${cid}/people/table`
            : `/courses/${cid}/${route}`;

        const isActive = pathname === href;

        return (
          <Link
            key={link}
            href={href}
            id={`wd-course-${route}-link`}
            className={`list-group-item border-0 ${
              isActive ? "active" : "text-danger"
            }`}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}
