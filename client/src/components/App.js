import React from 'react';
import { 
  BrowserRouter,
  Route,
  Switch 
} from 'react-router-dom';
import Courses from './Courses';
import Header from './Header';
import CourseDetail from './CourseDetail';
import UserSignIn from './UserSignIn';
import UserSignUp from './UserSignUp';
import CreateCourse from './CreateCourse';
import UpdateCourse from './UpdateCourse';
import UserSignOut from './UserSignOut';
import withContext from './Context';
import NotFound from './NotFound';

const CoursesWithContext = withContext(Courses);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const HeaderWithContext = withContext(Header);
const UserSignOutWithContext = withContext(UserSignOut);

function App() {

  return (
    <BrowserRouter>
      <HeaderWithContext />

      <Switch>
        <Route exact path="/" component={CoursesWithContext} />
        <Route path="/courses/create-course" component={CreateCourseWithContext} />
        <Route path='/courses/:id/update' component={UpdateCourseWithContext} />
        <Route path='/courses/:id' component={CourseDetailWithContext} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;