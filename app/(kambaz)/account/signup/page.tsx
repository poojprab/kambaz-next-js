import Link from "next/link";

export default function Signup() {
  return (
    <div id="wd-signup-screen" style={{ maxWidth: "400px" }}>
      <h3 className="mb-3">Signup</h3>
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
      <input 
        id="wd-password-verify"
        type="password"
        placeholder="verify password"
        className="form-control mb-2"
      />
      <Link 
        id="wd-signup-btn"
        href="/account/profile"
        className="btn btn-primary w-100 mb-2"
      >
        Signup
      </Link>
      <Link 
        id="wd-signin-link" 
        href="/account/signin"
        className="text-primary"
      >
        Signin
      </Link>
    </div>
  );
}