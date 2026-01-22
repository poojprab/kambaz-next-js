import Link from "next/link";

export default function Profile() {
  return (
    <div id="wd-profile-screen" style={{ maxWidth: "500px" }}>
      <h3 className="mb-3">Profile</h3>
      
      <input 
        id="wd-username"
        type="text"
        placeholder="username"
        className="form-control mb-2"
        defaultValue="alice"
      />
      
      <input 
        id="wd-password"
        type="password"
        placeholder="password"
        className="form-control mb-2"
        defaultValue="123"
      />
      
      <input 
        id="wd-firstname"
        type="text"
        placeholder="First Name"
        className="form-control mb-2"
        defaultValue="Alice"
      />
      
      <input 
        id="wd-lastname"
        type="text"
        placeholder="Last Name"
        className="form-control mb-2"
        defaultValue="Wonderland"
      />
      
      <input 
        id="wd-dob"
        type="date"
        className="form-control mb-2"
        defaultValue="2000-01-01"
      />
      
      <input 
        id="wd-email"
        type="email"
        placeholder="email"
        className="form-control mb-2"
        defaultValue="alice@wonderland.com"
      />
      
      <select 
        id="wd-role"
        className="form-select mb-2"
        defaultValue="USER"
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>
      
      <Link 
        id="wd-signout-btn"
        href="/account/signin"
        className="btn btn-danger w-100"
      >
        Signout
      </Link>
    </div>
  );
}
