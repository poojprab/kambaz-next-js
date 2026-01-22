"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountNavigation() {
  const pathname = usePathname();
  
  return (
    <div id="wd-account-navigation" className="list-group wd fs-5 rounded-0">
      <Link 
        href="/account/signin" 
        id="wd-account-signin-link"
        className={`list-group-item border-0 ${
          pathname === "/account/signin" ? "active" : "text-danger"
        }`}
      >
        Signin
      </Link>
      <Link 
        href="/account/signup" 
        id="wd-account-signup-link"
        className={`list-group-item border-0 ${
          pathname === "/account/signup" ? "active" : "text-danger"
        }`}
      >
        Signup
      </Link>
      <Link 
        href="/account/profile" 
        id="wd-account-profile-link"
        className={`list-group-item border-0 ${
          pathname === "/account/profile" ? "active" : "text-danger"
        }`}
      >
        Profile
      </Link>
    </div>
  );
}