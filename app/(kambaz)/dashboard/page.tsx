import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/courses/1800" className="wd-dashboard-course-link">
            <Image src="/images/discrete.png" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CS1800 </h5>
              <p className="wd-dashboard-course-title">
                Discrete Structures
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course"> 
          <Link href="/courses/1500" className="wd-dashboard-course-link">
            <Image src="/images/fundies.png" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CS1500 </h5>
              <p className="wd-dashboard-course-title">
                Fundamentals of Computer Science I
              </p>
              <button> Go </button>
            </div>
          </Link> </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/2800" className="wd-dashboard-course-link">
            <Image src="/images/logicandcomp.jpeg" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CS2800 </h5>
              <p className="wd-dashboard-course-title">
                Logic and Computation
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/3000" className="wd-dashboard-course-link">
            <Image src="/images/algo.webp" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CS3000 </h5>
              <p className="wd-dashboard-course-title">
                Algorithms and Data
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/3200" className="wd-dashboard-course-link">
            <Image src="/images/databasedesign.jpeg" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CS3200 </h5>
              <p className="wd-dashboard-course-title">
                Introduction to Database Design
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/3520" className="wd-dashboard-course-link">
            <Image src="/images/c++.png" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CS3520 </h5>
              <p className="wd-dashboard-course-title">
                Programming in C++
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/3650" className="wd-dashboard-course-link">
            <Image src="/images/computersystems.jpeg" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CS3650 </h5>
              <p className="wd-dashboard-course-title">
                Computer Systems
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
);}
