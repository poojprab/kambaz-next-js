/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormControl, Button } from "react-bootstrap";
import { setCurrentUser } from "../reducer";
import * as client from "../client";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const signin = async () => {
    const user = await client.signin(credentials);
    if (!user) return;
    dispatch(setCurrentUser(user));
    router.push("/dashboard");
  };

  return (
    <div className="d-flex gap-5">
      <div id="wd-signin-screen" style={{ maxWidth: "400px" }}>
        <h3 className="mb-3">Sign In</h3>
        <FormControl
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
          className="mb-2"
          placeholder="username"
          id="wd-username"
        />
        <FormControl
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          className="mb-2"
          placeholder="password"
          type="password"
          id="wd-password"
        />
        <Button onClick={signin} id="wd-signin-btn" className="w-100 mb-2">
          Sign In
        </Button>
        <Link id="wd-signup-link" href="/account/signup">
          Sign up
        </Link>
      </div>

      <div style={{ maxWidth: "400px" }}>
        <h3 className="mb-3">Project Info</h3>
        <div className="mb-3">
          <strong>Team Members</strong>
          <ul className="mt-1">
            <li>Pooja Prabu (Section 2)</li>
          </ul>
        </div>
        <div className="mb-3">
          <strong>Frontend Repository</strong>
          <div className="mt-1">
            <a
              href="https://github.com/poojprab/kambaz-next-js"
              target="_blank"
            >
              Frontend GitHub
            </a>
          </div>
        </div>
        <div className="mb-3">
          <strong>Backend Repository</strong>
          <div className="mt-1">
            <a
              href="https://github.com/prabup-cs/kambaz-node-server-app"
              target="_blank"
            >
              Backend GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
