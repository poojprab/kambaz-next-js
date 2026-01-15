export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" defaultValue="A1 - ENV + HTML" />
      <br /><br />

      <textarea
        id="wd-description"
        defaultValue="The assignment is available online Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section Links to each of the lab assignments Link to the Kanbas application Links to all relevant source code repositories The Kanbas application should include a link to navigate back to the landing page."
      />

      <br />

      <table>
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" defaultValue={100} />
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-group">
                <option value="QUIZZES">QUIZZES</option>
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="EXAMS">EXAMS</option>
              </select>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td>
              <select id="wd-display-grade-as">
                <option value="DECIMAL">Decimal</option>
                <option value="PERCENTAGE">Percentage</option>
              </select>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Submission Type</label>
            </td>
            <td>
              <select id="wd-display-grade-as">
                <option value="ONLINE">Online</option>
                <option value="INPERSON">In Persion</option>
              </select>
            </td>
          </tr>

          <tr>
            <td />
            <td align="left" valign="top">
              <label>Online Entry Options</label><br />

              <input type="checkbox" id="wd-chkbox-text-entry" />
              <label htmlFor="wd-chkbox-text-entry">Text Entry</label><br />

              <input type="checkbox" id="wd-chkbox-website-url" />
              <label htmlFor="wd-chkbox-website-url">Website URL</label><br />

              <input type="checkbox" id="wd-chkbox-media-recordings" />
              <label htmlFor="wd-chkbox-media-recordings">Media Recordings</label><br />

              <input type="checkbox" id="wd-chkbox-student-annotations" />
              <label htmlFor="wd-chkbox-student-annotations">Student Annotations</label><br />

              <input type="checkbox" id="wd-chkbox-file-uploads" />
              <label htmlFor="wd-chkbox-file-uploads">File Uploads</label>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assign-to">Assign</label>
            </td>
            <td align="left" valign="top">
              <label htmlFor="wd-assign-to">Assign to</label><br />
              <input id="wd-assign-to" defaultValue="Everyone" />
            </td>
          </tr>

          <tr>
            <td />
            <td align="left" valign="top">
              <label htmlFor="wd-due-date">Due</label><br />
              <input
                type="date"
                id="wd-due-date"
                defaultValue="2024-05-13"
              />
            </td>
          </tr>

          <tr>
            <td />
            <td align="left" valign="top">
              <label htmlFor="wd-available-from">Available from</label><br />
              <input
                type="date"
                id="wd-available-from"
                defaultValue="2024-05-06"
              />
            </td>
            <td align="left" valign="top">
              <label htmlFor="wd-available-to">Until</label><br />
              <input
                type="date"
                id="wd-available-to"
                defaultValue="2024-05-20"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
