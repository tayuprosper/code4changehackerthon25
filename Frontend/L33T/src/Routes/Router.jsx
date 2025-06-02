// src/router/index.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "../Pages/Home";
// import SignupForm from "../components/SignupForm";
import LoginPage from "../components/LoginPage"
import SignupPage from "../Pages/SignupPage"
import StudentDashboard from "../components/StudentDashboard";
import DashBoard from "../Pages/Dashboard"
import TutorDashboard from "../components/TutorDashboard";
import CreateCoursePage from "../Pages/CreateCoursePage";
// import FeaturesPage from "../pages/FeaturesPage";
// import JobsPage from "../pages/JobsPage";
// import InternshipsPage from "../pages/InternshipsPage";
// import ProjectsPage from "../pages/ProjectsPage";
import CourseListing from "../Pages/CourseListing";
import CourseDetails from "../components/CourseDetails";
// import GetMentorPage from "../pages/GetMentorPage";
// import ContactPage from "../pages/ContactPage";

// import LoginPage from "../components/LoginPage";
// import SignupPage from "../pages/SignupPage";

// import StudentDashboard from "../dashboard/StudentDashboard";
// import MentorDashboard from "../dashboard/MentorDashboard";
import EmployerDashboard from "../components/TutorDashboard";
// import NgoDashboard from "../dashboard/NgoDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },{
    path: "/course/:id",
    element: <CourseDetails/>
  },
//   {
//     path: "/features",
//     element: <FeaturesPage />,
//   },
//   {
//     path: "/jobs",
//     element: <JobsPage />,
//   },
  {
    path: "/tutor-dashboard",
    element: <TutorDashboard />,
  },
//   {
//     path: "/projects",
//     element: <ProjectsPage />,
//   },
  {
    path: "/courses",
    element: <CourseListing />,
  },
//   {
//     path: "/get-mentor",
//     element: <GetMentorPage />,
//   },
//   {
//     path: "/contact",
//     element: <ContactPage />,
//   },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },

  //   // Optional: Dashboard Routes
    {
      path: "/dashboard",
      element: <DashBoard />,
    },
    {
      path: "/create-course",
      element: <CreateCoursePage />,
    },
  //   {
  //     path: "/employer-dashboard",
  //     element: <EmployerDashboard />,
  //   },
  //   {
  //     path: "/ngo-dashboard",
  //     element: <NgoDashboard />,
  //   },
  {
    path: "/student-dashboard",
    element : <StudentDashboard/>
  }
]);

export function Router() {
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}
