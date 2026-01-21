import Link from "next/link";

export default function CourseNavigation() {
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      
      <Link
        href="/courses/1500/home"
        id="wd-course-home-link"
        className="list-group-item active border-0"
      >
        Home
      </Link><br />

      <Link
        href="/courses/1500/modules"
        id="wd-course-modules-link"
        className="list-group-item text-danger border-0"
      >
        Modules
      </Link><br />

      <Link
        href="/courses/1500/piazza"
        id="wd-course-piazza-link"
        className="list-group-item text-danger border-0"
      >
        Piazza
      </Link><br />

      <Link
        href="/courses/1500/zoom"
        id="wd-course-zoom-link"
        className="list-group-item text-danger border-0"
      >
        Zoom
      </Link><br />

      <Link
        href="/courses/1500/assignments"
        id="wd-course-assignments-link"
        className="list-group-item text-danger border-0"
      >
        Assignments
      </Link><br />

      <Link
        href="/courses/1500/quizzes"
        id="wd-course-quizzes-link"
        className="list-group-item text-danger border-0"
      >
        Quizzes
      </Link><br />

      <Link
        href="/courses/1500/people/table"
        id="wd-course-people-link"
        className="list-group-item text-danger border-0"
      >
        People
      </Link><br />

    </div>
  );
}
