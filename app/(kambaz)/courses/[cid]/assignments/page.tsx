import Link from "next/link";
import { FaPlus, FaSearch, FaEllipsisV, FaCheckCircle } from "react-icons/fa";
import { BsGripVertical, BsPencil } from "react-icons/bs";

export default function Assignments() {
  return (
    <div id="wd-assignments" className="p-3">

      {/* Search + Buttons */}
      <div className="d-flex justify-content-between align-items-center mb-4">

        <div className="input-group" style={{ maxWidth: "400px" }}>
          <span className="input-group-text bg-white">
            <FaSearch />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search for Assignments"
            id="wd-search-assignment"
          />
        </div>

        <div className="text-end">
          <button className="btn btn-secondary me-2" id="wd-add-assignment-group">
            <FaPlus className="me-1" /> Group
          </button>

          <button className="btn btn-danger" id="wd-add-assignment">
            <FaPlus className="me-1" /> Assignment
          </button>
        </div>

      </div>

      {/* Header */}
      <div className="p-3 d-flex justify-content-between align-items-center" style={{ backgroundColor: "#f0f0f0", borderTop: "1px solid #dee2e6", borderLeft: "1px solid #dee2e6", borderRight: "1px solid #dee2e6" }}>

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

      {/* Assignment List */}
      <ul id="wd-assignment-list" className="list-group list-group-flush">

        <li className="list-group-item" style={{ borderLeft: "4px solid green", borderTop: "1px solid #dee2e6", borderRight: "1px solid #dee2e6", borderBottom: "1px solid #dee2e6" }}>
          <div className="d-flex justify-content-between align-items-start">

            <div className="d-flex">
              <BsGripVertical className="me-2 fs-4 text-muted" />
              <BsPencil className="me-2 fs-5 text-success" />

              <div>
                <Link
                  href="/courses/1500/assignments/1"
                  className="fw-bold text-decoration-none text-dark"
                >
                  A1 - ENV + HTML
                </Link>

                <div className="small text-muted">
                  <span className="text-danger">Multiple Modules</span> |{" "}
                  <b>Not available until</b> May 6 at 12:00am |
                </div>
                <div className="small text-muted">
                  <b>Due</b> May 13 at 11:59pm | 100 pts
                </div>
              </div>
            </div>

            <div>
              <FaCheckCircle className="text-success me-2" />
              <FaEllipsisV />
            </div>

          </div>
        </li>

        <li className="list-group-item" style={{ borderLeft: "4px solid green", borderRight: "1px solid #dee2e6", borderBottom: "1px solid #dee2e6" }}>
          <div className="d-flex justify-content-between align-items-start">

            <div className="d-flex">
              <BsGripVertical className="me-2 fs-4 text-muted" />
              <BsPencil className="me-2 fs-5 text-success" />

              <div>
                <Link
                  href="/courses/1500/assignments/2"
                  className="fw-bold text-decoration-none text-dark"
                >
                  A2 - CSS + BOOTSTRAP
                </Link>

                <div className="small text-muted">
                  <span className="text-danger">Multiple Modules</span> |{" "}
                  <b>Not available until</b> May 13 at 12:00am |
                </div>
                <div className="small text-muted">
                  <b>Due</b> May 20 at 11:59pm | 100 pts
                </div>
              </div>
            </div>

            <div>
              <FaCheckCircle className="text-success me-2" />
              <FaEllipsisV />
            </div>

          </div>
        </li>

        <li className="list-group-item" style={{ borderLeft: "4px solid green", borderRight: "1px solid #dee2e6", borderBottom: "1px solid #dee2e6" }}>
          <div className="d-flex justify-content-between align-items-start">

            <div className="d-flex">
              <BsGripVertical className="me-2 fs-4 text-muted" />
              <BsPencil className="me-2 fs-5 text-success" />

              <div>
                <Link
                  href="/courses/1500/assignments/3"
                  className="fw-bold text-decoration-none text-dark"
                >
                  A3 - JAVASCRIPT + REACT
                </Link>

                <div className="small text-muted">
                  <span className="text-danger">Multiple Modules</span> |{" "}
                  <b>Not available until</b> May 20 at 12:00am |
                </div>
                <div className="small text-muted">
                  <b>Due</b> May 27 at 11:59pm | 100 pts
                </div>
              </div>
            </div>

            <div>
              <FaCheckCircle className="text-success me-2" />
              <FaEllipsisV />
            </div>

          </div>
        </li>

      </ul>

    </div>
  );
}