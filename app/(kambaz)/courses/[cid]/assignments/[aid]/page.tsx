/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "../reducer";
import { RootState } from "../../../../store";
import { useState } from "react";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);

  const existingAssignment = assignments.find(
    (a: any) => a._id === aid && a.course === cid
  );

  const [assignment, setAssignment] = useState<any>(
    existingAssignment || {
      title: "New Assignment",
      description: "",
      points: 100,
      due: "2024-05-13T23:59",
      available: "2024-05-06T12:00",
      availableUntil: "2024-05-20T23:59",
      course: cid,
    }
  );

  const handleSave = () => {
    if (aid === "new") {
      dispatch(addAssignment(assignment));
    } else {
      dispatch(updateAssignment(assignment));
    }
    router.push(`/courses/${cid}/assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="p-3">
      <div className="mb-3">
        <label htmlFor="wd-name" className="form-label">Assignment Name</label>
        <input id="wd-name" className="form-control"
          value={assignment.title}
          onChange={(e) => setAssignment({ ...assignment, title: e.target.value })} />
      </div>

      <div className="mb-3">
        <textarea id="wd-description" className="form-control" rows={9}
          value={assignment.description}
          onChange={(e) => setAssignment({ ...assignment, description: e.target.value })} />
      </div>

      <div className="row mb-3">
        <label htmlFor="wd-points" className="col-sm-3 col-form-label text-end">Points</label>
        <div className="col-sm-9">
          <input id="wd-points" className="form-control" type="number"
            value={assignment.points}
            onChange={(e) => setAssignment({ ...assignment, points: parseInt(e.target.value) })} />
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="wd-group" className="col-sm-3 col-form-label text-end">Assignment Group</label>
        <div className="col-sm-9">
          <select id="wd-group" className="form-control">
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="QUIZZES">QUIZZES</option>
            <option value="EXAMS">EXAMS</option>
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="wd-display-grade-as" className="col-sm-3 col-form-label text-end">Display Grade as</label>
        <div className="col-sm-9">
          <select id="wd-display-grade-as" className="form-control">
            <option value="PERCENTAGE">Percentage</option>
            <option value="DECIMAL">Decimal</option>
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="wd-submission-type" className="col-sm-3 col-form-label text-end">Submission Type</label>
        <div className="col-sm-9">
          <div className="border rounded p-3">
            <select id="wd-submission-type" className="form-control mb-3">
              <option value="ONLINE">Online</option>
              <option value="INPERSON">In Person</option>
            </select>
            <div>
              <label className="form-label fw-bold">Online Entry Options</label>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="wd-chkbox-text-entry" />
                <label className="form-check-label" htmlFor="wd-chkbox-text-entry">Text Entry</label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="wd-chkbox-website-url" defaultChecked />
                <label className="form-check-label" htmlFor="wd-chkbox-website-url">Website URL</label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="wd-chkbox-media-recordings" />
                <label className="form-check-label" htmlFor="wd-chkbox-media-recordings">Media Recordings</label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="wd-chkbox-student-annotations" />
                <label className="form-check-label" htmlFor="wd-chkbox-student-annotations">Student Annotation</label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="wd-chkbox-file-uploads" />
                <label className="form-check-label" htmlFor="wd-chkbox-file-uploads">File Uploads</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <label className="col-sm-3 col-form-label text-end">Assign</label>
        <div className="col-sm-9">
          <div className="border rounded p-3">
            <div className="mb-3">
              <label htmlFor="wd-due-date" className="form-label fw-bold">Due</label>
              <input type="datetime-local" id="wd-due-date" className="form-control"
                value={assignment.due}
                onChange={(e) => setAssignment({ ...assignment, due: e.target.value })} />
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="wd-available-from" className="form-label fw-bold">Available from</label>
                <input type="datetime-local" id="wd-available-from" className="form-control"
                  value={assignment.available}
                  onChange={(e) => setAssignment({ ...assignment, available: e.target.value })} />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="wd-available-until" className="form-label fw-bold">Until</label>
                <input type="datetime-local" id="wd-available-until" className="form-control"
                  value={assignment.availableUntil}
                  onChange={(e) => setAssignment({ ...assignment, availableUntil: e.target.value })} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />
      <div className="d-flex justify-content-end">
        <button className="btn btn-secondary me-2"
          onClick={() => router.push(`/courses/${cid}/assignments`)}>
          Cancel
        </button>
        <button className="btn btn-danger" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}