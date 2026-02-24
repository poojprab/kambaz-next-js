/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/navigation";
import * as db from "../../database";
import { FormControl, Button } from "react-bootstrap";
import { setCurrentUser } from "../reducer";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({ username: "", password: "" });
  const dispatch = useDispatch();
  const router = useRouter();

  const signin = () => {
    const user = db.users.find(
      (u: any) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );
    if (!user) return;
    dispatch(setCurrentUser(user));
    router.push("/dashboard");
  };

  return (
    <div id="wd-signin-screen" style={{ maxWidth: "400px" }}>
      <h3 className="mb-3">Sign In</h3>
      <FormControl
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        className="mb-2" placeholder="username" id="wd-username"
      />
      <FormControl
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        className="mb-2" placeholder="password" type="password" id="wd-password"
      />
      <Button onClick={signin} id="wd-signin-btn" className="w-100 mb-2">
        Sign In
      </Button>
      <Link id="wd-signup-link" href="/account/signup">
        Sign up
      </Link>
    </div>
  );
}