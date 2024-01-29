import React from "react";
import DetailDoctor from "../pages/detailDoctor/DetailDoctor";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import SearchDoctor from "../pages/searchDoctor/SearchDoctor";
import Home from "../pages/home/Home";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/search" element={<SearchDoctor/>} />
        <Route path="/search/:id" element={<DetailDoctor/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/regdoctor" element={<RegisterDoctor />} />
        <Route path="/regpatient" element={<RegisterPatient />} />
        <Route element={<PrivateRouter />}>
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/doctor" element={<DoctorPanel />} />
          <Route path="/patient" element={<PatientPanel />} />
        </Route>
      </Routes>
    </Router>
  )

};

export default AppRouter;
