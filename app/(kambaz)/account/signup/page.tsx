"use client";
import Link from "next/link";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormControl, Button } from "react-bootstrap";
import * as client from "../client";
import type { User } from "../client";

export default function Signup() {
  const [user, setUser] = useState<Omit<User, "_id">>({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    role: "STUDENT",
    loginId: "",
    section: "",
    lastActivity: "",
    totalActivity: "",
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const signup = async () => {
    const currentUser = await client.signup(user);
    dispatch(setCurrentUser(currentUser));
    router.push("/account/profile");
  };

  return (
    <div id="wd-signup-screen" style={{ maxWidth: "400px" }}>
      <h3 className="mb-3">Sign up</h3>
      <FormControl
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="mb-2"
        placeholder="username"
        id="wd-username"
      />
      <FormControl
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="mb-2"
        placeholder="password"
        type="password"
        id="wd-password"
      />
      <Button
        onClick={signup}
        className="btn btn-primary w-100 mb-2"
        id="wd-signup-btn"
      >
        Sign up
      </Button>
      <Link id="wd-signin-link" href="/account/signin" className="text-primary">
        Sign in
      </Link>
    </div>
  );
}
