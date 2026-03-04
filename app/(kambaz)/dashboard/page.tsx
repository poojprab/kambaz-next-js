/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import Link from "next/link";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../courses/reducer";
import { enroll, unenroll } from "../enrollments/reducer";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../store";

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const dispatch = useDispatch();
  const [showAllCourses, setShowAllCourses] = useState(false);

  const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.jpg", description: "New Description"
  });

  const isEnrolled = (courseId: string) =>
    enrollments.some(
      (e: any) => e.user === currentUser?._id && e.course === courseId
    );

  const displayedCourses = showAllCourses
    ? courses
    : courses.filter((c: any) => isEnrolled(c._id));
  return (
    
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard
        {console.log("RENDER", currentUser, courses, enrollments) as any}
        <button className="btn btn-primary float-end"
                onClick={() => setShowAllCourses(!showAllCourses)}
                id="wd-enrollments-btn">
          Enrollments
        </button>
      </h1> <hr />

      {currentUser?.role === "FACULTY" && (
        <>
          <h5>New Course
            <button className="btn btn-primary float-end"
                onClick={() => {
                  const newId = uuidv4();
                  dispatch(addNewCourse({ ...course, _id: newId }));
                  dispatch(enroll({ userId: currentUser._id, courseId: newId }));
                }}
            id="wd-add-new-course-click"> Add </button>
            <button className="btn btn-warning float-end me-2"
                    onClick={() =>  dispatch(updateCourse(course))}
                    id="wd-update-course-click"> Update </button>
          </h5> <br />
          <FormControl value={course.name} className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })} />
          <FormControl as="textarea" value={course.description} rows={3}
            onChange={(e) => setCourse({ ...course, description: e.target.value })} />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        Published Courses ({displayedCourses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {displayedCourses.map((c: any) => (
            <Col key={c._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <CardImg variant="top" src="/images/discrete.png" height={160} />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    {c.name}
                  </CardTitle>
                  <CardText className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}>
                    {c.description}
                  </CardText>

                  <div className="d-flex justify-content-between align-items-center">
                    {isEnrolled(c._id) ? (
                      <Link href={`/courses/${c._id}/home`}
                        className="btn btn-primary"> Go </Link>
                    ) : (
                      <span />
                    )}

                    <div>
                      {isEnrolled(c._id) ? (
                        <button className="btn btn-danger btn-sm"
                          onClick={() => dispatch(unenroll({
                            userId: currentUser?._id,
                            courseId: c._id
                          }))}>
                          Unenroll
                        </button>
                      ) : (
                        <button className="btn btn-success btn-sm"
                          onClick={() => dispatch(enroll({
                            userId: currentUser?._id,
                            courseId: c._id
                          }))}>
                          Enroll
                        </button>
                      )}

                      {currentUser?.role === "FACULTY" && (
                        <>
                          <button onClick={(event) => {
                                      event.preventDefault();
                                      dispatch(deleteCourse(c._id));
                                    }}
                                    className="btn btn-danger btn-sm ms-1"
                                    id="wd-delete-course-click"> Delete </button>
                          <button onClick={(event) => {
                                      event.preventDefault();
                                      setCourse(c);
                                    }}
                                    className="btn btn-warning btn-sm ms-1"
                                    id="wd-edit-course-click"> Edit </button>
                        </>
                      )}
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}