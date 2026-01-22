import Link from "next/link";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="p-3">
      
      <div className="mb-3">
        <label htmlFor="wd-name" className="form-label">Assignment Name</label>
        <input 
          id="wd-name" 
          className="form-control" 
          defaultValue="A1 - ENV + HTML" 
        />
      </div>

      <div className="mb-3">
        <textarea
          id="wd-description"
          className="form-control"
          rows={9}
          defaultValue={`The assignment is available online

Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:
• Your full name and section
• Links to each of the lab assignments
• Link to the Kanbas application
• Links to all relevant source code repositories

The Kanbas application should include a link to navigate back to the landing page.`}
        />
      </div>

      <div className="row mb-3">
        <label htmlFor="wd-points" className="col-sm-3 col-form-label text-end">Points</label>
        <div className="col-sm-9">
          <input 
            id="wd-points" 
            className="form-control" 
            defaultValue={100} 
            type="number"
          />
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="wd-group" className="col-sm-3 col-form-label text-end">Assignment Group</label>
        <div className="col-sm-9">
          <select id="wd-group" className="form-select">
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="QUIZZES">QUIZZES</option>
            <option value="EXAMS">EXAMS</option>
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="wd-display-grade-as" className="col-sm-3 col-form-label text-end">Display Grade as</label>
        <div className="col-sm-9">
          <select id="wd-display-grade-as" className="form-select">
            <option value="PERCENTAGE">Percentage</option>
            <option value="DECIMAL">Decimal</option>
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="wd-submission-type" className="col-sm-3 col-form-label text-end">Submission Type</label>
        <div className="col-sm-9">
          <div className="border rounded p-3">
            <select id="wd-submission-type" className="form-select mb-3">
              <option value="ONLINE">Online</option>
              <option value="INPERSON">In Person</option>
            </select>

            <div>
              <label className="form-label fw-bold">Online Entry Options</label>
              
              <div className="form-check">
                <input 
                  type="checkbox" 
                  className="form-check-input" 
                  id="wd-chkbox-text-entry" 
                />
                <label className="form-check-label" htmlFor="wd-chkbox-text-entry">
                  Text Entry
                </label>
              </div>

              <div className="form-check">
                <input 
                  type="checkbox" 
                  className="form-check-input" 
                  id="wd-chkbox-website-url"
                  defaultChecked 
                />
                <label className="form-check-label" htmlFor="wd-chkbox-website-url">
                  Website URL
                </label>
              </div>

              <div className="form-check">
                <input 
                  type="checkbox" 
                  className="form-check-input" 
                  id="wd-chkbox-media-recordings" 
                />
                <label className="form-check-label" htmlFor="wd-chkbox-media-recordings">
                  Media Recordings
                </label>
              </div>

              <div className="form-check">
                <input 
                  type="checkbox" 
                  className="form-check-input" 
                  id="wd-chkbox-student-annotations" 
                />
                <label className="form-check-label" htmlFor="wd-chkbox-student-annotations">
                  Student Annotation
                </label>
              </div>

              <div className="form-check">
                <input 
                  type="checkbox" 
                  className="form-check-input" 
                  id="wd-chkbox-file-uploads" 
                />
                <label className="form-check-label" htmlFor="wd-chkbox-file-uploads">
                  File Uploads
                </label>
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
              <label htmlFor="wd-assign-to" className="form-label fw-bold">Assign to</label>
              <div className="border rounded p-2 bg-white">
                <span className="badge bg-light text-dark border">
                  Everyone
                  <button 
                    type="button" 
                    className="btn-close btn-close-sm ms-2" 
                    aria-label="Close"
                  ></button>
                </span>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="wd-due-date" className="form-label fw-bold">Due</label>
              <input
                type="datetime-local"
                id="wd-due-date"
                className="form-control"
                defaultValue="2024-05-13T23:59"
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="wd-available-from" className="form-label fw-bold">Available from</label>
                <input
                  type="datetime-local"
                  id="wd-available-from"
                  className="form-control"
                  defaultValue="2024-05-06T12:00"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="wd-available-until" className="form-label fw-bold">Until</label>
                <input
                  type="datetime-local"
                  id="wd-available-until"
                  className="form-control"
                  defaultValue="2024-05-20T23:59"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      <hr />

      <div className="d-flex justify-content-end">
        <Link href="/courses/1234/assignments">
          <button className="btn btn-secondary me-2">Cancel</button>
        </Link>
        <button className="btn btn-danger">Save</button>
      </div>

    </div>
  );
}