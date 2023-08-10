import "./App.css";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";


import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import AddActivity from "./pages/AddActivity";
import EditActivity from "./pages/EditActivity";
import AllActivities from "./pages/AllActivities";
import ActivityDetails from "./pages/ActivityDetails";
import AllBooks from "./pages/AllBooks";
import BookDetails from "./pages/BookDetails";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import Navbar from "./components/Navbar";


 
function App() {

  const getToken = () => {
    return localStorage.getItem('authToken')
  }

  const LoggedIn = () => {
    return getToken() ? <Outlet /> : <Navigate to='/login' />
  }

  const NotLoggedIn = () => {
    return !getToken() ? <Outlet /> : <Navigate to='/' />
  }

  return (
    <div className="App">
      
      <Navbar />
 
      <Routes>      
        <Route path="/" element={ <HomePage /> } />
        <Route path='/all-activities' element={ <AllActivities /> } />
        <Route path='/activity-details/:activityId' element={ <ActivityDetails /> } />

        <Route path='/all-books' element={ <AllBooks /> } />
        <Route path='/book-details/:bookId' element={ <BookDetails /> } />

        <Route element={<LoggedIn />}>

          <Route path='/add-activity' element={ <AddActivity /> } />
          <Route path='/edit-activity/:activityId' element={ <EditActivity /> } />

          <Route path='/add-book' element={ <AddBook /> } />
          <Route path='/edit-book/:bookId' element={ <EditBook /> } />


        </Route>

        <Route element={<NotLoggedIn />}>

          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />

        </Route>

      </Routes>
      
    </div>
  );
}
export default App;