import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "../pages/home/Home";
import RegisterDoctor from "../pages/auth/RegisterDoctor";
import RegisterPatient from "../pages/auth/RegisterPatient";
import DetailDoctor from "../pages/detailDoctor/DetailDoctor";
import SearchDoctor from "../pages/searchDoctor/SearchDoctor";
import Login from "../pages/auth/Login";
import PrivateRouter from "./PrivateRouter";
import AdminPanel from "../pages/panels/AdminPanel";
import DoctorPanel from "../pages/panels/DoctorPanel";
import PatientPanel from "../pages/panels/PatientPanel";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchDoctor/>} />
        <Route path="/search/:id" element={<DetailDoctor />} />
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
