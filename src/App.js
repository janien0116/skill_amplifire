import Home from "./pages/Home";
import Footer from "./components/Footer";
import Curriculum from "./pages/Curriculum";
import Courses from "./pages/Courses";
import DefaultNavbar from "./components/DefaultNavbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import InstructorPage from "./pages/Instructor/InstructorPage";
import InstructorAnalytics from "./pages/Instructor/InstructorAnalytics";
import InstructorClass from "./pages/Instructor/InstructorClass";
import StudentPage from "./pages/Student/StudentPage";
import StudentProfile from "./pages/Student/StudentProfile";
import InstructorProfile from "./pages/Instructor/InstructorProfile";
import StudentLessons from "./pages/Student/StudentLessons";
import { SignUpModalContextProvider } from "./contexts/SignUpModalContext";
import StudentCourses from "./pages/Student/StudentCourses";
import { EnrollCurriculumContextProvider } from "./contexts/EnrollCurriculumContext";
import StudentCustomCoursePlan from "./pages/Student/StudentCustomCoursePlan";
import StudentNavbar from "./components/StudentNavbar";
import InstructorNavbar from "./components/InstructorNavbar";
import ErrorHandlingModalContext, {
  ErrorHandlingModalContextProvider,
} from "./contexts/ErrorHandlingModalContext";

function App() {
  return (
    <Router>
      <ErrorHandlingModalContextProvider>
        <AppRoutes />
      </ErrorHandlingModalContextProvider>
    </Router>
  );
}

function AppRoutes() {
  const location = useLocation();
  const isOnInstructorPage = location.pathname.includes("/instructor");
  const isOnStudentPage = location.pathname.includes("/student");

  return (
    <SignUpModalContextProvider>
      {!isOnStudentPage && !isOnInstructorPage && <DefaultNavbar />}
      <EnrollCurriculumContextProvider>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/curriculums" element={<Curriculum />}></Route>
          <Route path="/courses" element={<Courses />}></Route>
          <Route path="/student/*" element={<StudentRoutes />}></Route>
          <Route path="/instructor/*" element={<InstructorRoutes />}></Route>
        </Routes>
      </EnrollCurriculumContextProvider>
      <Footer />
    </SignUpModalContextProvider>
  );
}

function StudentRoutes() {
  return (
    <>
      <StudentNavbar />
      <Routes>
        <Route path="/:studentId" element={<StudentPage />}></Route>
        <Route path="/:studentId/profile" element={<StudentProfile />}></Route>
        <Route
          path="/:studentId/mylessons"
          element={<StudentLessons />}
        ></Route>
        <Route path="/:studentId/courses" element={<StudentCourses />}></Route>
        <Route
          path="/:studentId/custom-courses"
          element={<StudentCustomCoursePlan />}
        ></Route>
      </Routes>
    </>
  );
}

function InstructorRoutes() {
  return (
    <div>
      <InstructorNavbar />
      <Routes>
        <Route path="/:instructorId" element={<InstructorPage />}></Route>
        <Route
          path="/:instructorId/analytics"
          element={<InstructorAnalytics />}
        ></Route>
        <Route
          path="/:instructorId/myclass"
          element={<InstructorClass />}
        ></Route>
        <Route
          path="/:instructorId/profile"
          element={<InstructorProfile />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
