"use client";
import { usePathname } from "next/navigation";

export default function Breadcrumb({ course }: { course: { name: string } | undefined }) {
  const pathname = usePathname();
  const breadcrumbTitle = pathname.split("/").pop() || "";

  const formattedTitle = breadcrumbTitle.charAt(0).toUpperCase() + breadcrumbTitle.slice(1);

  return (
    <span>
      {course?.name} &gt; {formattedTitle}
    </span>
  );
}
