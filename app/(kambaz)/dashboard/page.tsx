/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import Link from "next/link";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../courses/reducer"
import { RootState } from "../store";
import * as db from "../database";

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = db;
  const dispatch = useDispatch();
  const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.jpg", description: "New Description"
  });

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h5>New Course
        <button className="btn btn-primary float-end"
                onClick={() => dispatch(addNewCourse(course))}
                id="wd-add-new-course-click"> Add </button>
        <button className="btn btn-warning float-end me-2"
                onClick={() => dispatch(updateCourse(course))}
                id="wd-update-course-click"> Update </button>
      </h5> <br />
      <FormControl value={course.name} className="mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })} />
      <FormControl as="textarea" value={course.description} rows={3}
        onChange={(e) => setCourse({ ...course, description: e.target.value })} />
      <hr />
      <h2 id="wd-dashboard-published">
  Published Courses ({courses.filter((c: any) =>
    currentUser && enrollments.some(
      (enrollment: any) =>
        enrollment.user === currentUser._id &&
        enrollment.course === c._id
    )
  ).length})
</h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses
            .filter((c: any) =>
              currentUser && enrollments.some(
                (enrollment: any) =>
                  enrollment.user === currentUser._id &&
                  enrollment.course === c._id
              )
            )
            .map((c: any) => (
              <Col key={c._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>
                  <Link href={`/courses/${c._id}/home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                    <CardImg variant="top" src="/images/discrete.png" height={160} />
                    <CardBody>
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {c.name}
                      </CardTitle>
                      <CardText className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}>
                        {c.description}
                      </CardText>
                      <Button variant="primary"> Go </Button>
                      <button onClick={(event) => {
                                  event.preventDefault();
                                  dispatch(deleteCourse(c._id));
                                }}
                                className="btn btn-danger float-end"
                                id="wd-delete-course-click"> Delete </button>
                      <button onClick={(event) => {
                                  event.preventDefault();
                                  setCourse(c);
                                }}
                                className="btn btn-warning me-2 float-end"
                                id="wd-edit-course-click"> Edit </button>
                    </CardBody>
                  </Link>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
}
