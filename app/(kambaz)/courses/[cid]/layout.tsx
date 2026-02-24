"use client";
import { ReactNode, useState } from "react";
import CourseNavigation from "./Navigation";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { RootState } from "../../store";
import { FaAlignJustify } from "react-icons/fa";
import { useEffect } from "react";

interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  department: string;
  credits: number;
  description: string;
  image?: string;
  author?: string;
}

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const router = useRouter();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const course = courses.find((course: Course) => course._id === cid);
  const [showNav, setShowNav] = useState(true);

  const isEnrolled = enrollments.some(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: any) => e.user === currentUser?._id && e.course === cid
  );

  useEffect(() => {
    if (!isEnrolled) {
      router.push("/dashboard");
    }
  }, [isEnrolled, router]);

  if (!isEnrolled) return null;

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify
          className="me-4 fs-4 mb-1"
          onClick={() => setShowNav(!showNav)}
          style={{ cursor: "pointer" }}
        />
        {course?.name}
      </h2>
      <hr />
      <div className="d-flex">
        {showNav && (
          <div>
            <CourseNavigation />
          </div>
        )}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}