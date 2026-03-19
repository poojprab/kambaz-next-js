/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setAssignments } from "./reducer";
import { RootState } from "../../../store";
import { useEffect } from "react";
import * as client from "./client";
import {
  FaPlus,
  FaSearch,
  FaEllipsisV,
  FaCheckCircle,
  FaTrash,
} from "react-icons/fa";
import { BsGripVertical, BsPencil } from "react-icons/bs";

export default function Assignments() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer,
  );

  useEffect(() => {
    const fetchAssignments = async () => {
      const data = await client.findAssignmentsForCourse(cid as string);
      dispatch(setAssignments(data));
    };
    fetchAssignments();
  }, [cid, dispatch]);

  const handleDelete = async (assignmentId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this assignment?",
    );
    if (confirmed) {
      await client.deleteAssignment(assignmentId);
      dispatch(
        setAssignments(assignments.filter((a) => a._id !== assignmentId)),
      );
    }
  };

  return (
    <div id="wd-assignments" className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="input-group w-50">
          <span className="input-group-text bg-white">
            <FaSearch />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            id="wd-search-assignment"
          />
        </div>
        <div className="text-end">
          <button
            className="btn btn-secondary me-2"
            id="wd-add-assignment-group"
          >
            <FaPlus className="me-1" /> Group
          </button>
          <button
            className="btn btn-danger"
            id="wd-add-assignment"
            onClick={() => router.push(`/courses/${cid}/assignments/new`)}
          >
            <FaPlus className="me-1" /> Assignment
          </button>
        </div>
      </div>

      <div className="p-3 d-flex justify-content-between align-items-center bg-light border border-bottom-0">
        <div className="d-flex align-items-center">
          <BsGripVertical className="me-2 fs-4" />
          <strong>ASSIGNMENTS</strong>
        </div>
        <div className="d-flex align-items-center">
          <span className="me-2">40% of Total</span>
          <FaPlus className="me-2" />
          <FaEllipsisV />
        </div>
      </div>

      <ul
        id="wd-assignment-list"
        className="list-group list-group-flush border border-top-0"
      >
        {assignments.map((assignment: any) => (
          <li
            key={assignment._id}
            className="list-group-item"
            style={{ borderLeft: "4px solid green" }}
          >
            <div className="d-flex justify-content-between align-items-start">
              <div className="d-flex">
                <BsGripVertical className="me-2 fs-4 text-muted" />
                <BsPencil className="me-2 fs-5 text-success" />
                <div>
                  <Link
                    href={`/courses/${cid}/assignments/${assignment._id}`}
                    className="fw-bold text-decoration-none text-dark"
                  >
                    {assignment.title}
                  </Link>
                  <div className="small text-muted">
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    <b>Not available until</b> {assignment.available} |
                  </div>
                  <div className="small text-muted">
                    <b>Due</b> {assignment.due} | {assignment.points} pts
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <FaCheckCircle className="text-success me-2" />
                <FaTrash
                  className="text-danger me-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(assignment._id)}
                />
                <FaEllipsisV />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
