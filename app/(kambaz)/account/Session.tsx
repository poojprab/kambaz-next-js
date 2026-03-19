"use client";
import * as client from "./client";
import * as enrollmentsClient from "../enrollments/client";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";
import { setEnrollments } from "../enrollments/reducer";
import { useDispatch } from "react-redux";

export default function Session({ children }: { children: React.ReactNode }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const currentUser = await client.profile();
        dispatch(setCurrentUser(currentUser));
        try {
          const enrollments = await enrollmentsClient.fetchMyEnrollments();
          dispatch(setEnrollments(enrollments));
        } catch {
          // not enrolled in anything or not logged in
        }
      } catch {
        // not logged in, that's ok
      } finally {
        setPending(false);
      }
    };
    fetchProfile();
  }, [dispatch]);

  if (pending) return null;
  return children;
}
