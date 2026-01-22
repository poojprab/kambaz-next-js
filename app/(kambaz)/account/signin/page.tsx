import Link from "next/link";

export default function Signin() {
  return (
    <div id="wd-signin-screen" style={{ maxWidth: "400px" }}>
      <h3 className="mb-3">Signin</h3>
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
      />
      <Link 
        id="wd-signin-btn"
        href="/dashboard"
        className="btn btn-primary w-100 mb-2"
      >
        Signin
      </Link>
      <Link 
        id="wd-signup-link" 
        href="/account/signup"
        className="text-primary"
      >
        Signup
      </Link>
    </div>
  );
}