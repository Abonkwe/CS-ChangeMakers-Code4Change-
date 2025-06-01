
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Homepage from './Pages/Homepage';
import AboutPage from './Pages/About';
import MentorsPage from './Pages/Mentor';
import InternshipsPage from './Pages/Internship';
import ServicesPage from './Pages/Service';
import Job from './Pages/Job';
import JobForm from './Form/job'
import SignupPage from './Components/signupPage';
import LearnerDashboard from './Components/LearnerDashboard';
import Intern from './Form/intern';
import UsersDashboard from './Components/UsersDashboard';
import SendMoneyForm from './Components/SendMoneyForm';
import Project from './Pages/Project'; // Assuming you have a Project page


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/mentors" element={<MentorsPage />} />
        <Route path="/internships" element={<InternshipsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/jobform" element={<JobForm />} />
        <Route path="/jobs" element={<Job />} />
        <Route path="/internshipform" element={<Intern />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<SignupPage />} />
        <Route path="/usersdashboard" element={<LearnerDashboard />} />
        <Route path="/learnerdashboard" element={<UsersDashboard />} />
        <Route path="/payment" element={<SendMoneyForm />} />
      </Routes>
    </Router>
  );
};

export default App;
