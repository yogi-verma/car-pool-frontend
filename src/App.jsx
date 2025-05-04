import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/mainPage/MainPage";
import SignupMember from "./pages/signup/signupMember/SignupMember";
import LoginMember from "./pages/login/loginMember/LoginMember";
import DashboardMember from "./pages/dashboard/dashboardMember/DashboardMember";
import DashboardOwner from "./pages/dashboard/dashboardOwner/DashboardOwner";
import LoginOwner from "./pages/login/loginOwner/LoginOwner";
import SignupOwner from "./pages/signup/signupOwner/SignupOwner";
import Admin from "./pages/admin/Admin";
import Review from "./pages/help/Review";
import TermsAndServices from "./pages/help/TermsAndServices"


const App = () => {
    return (
        // <AvailableSeatsProvider>

        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />

                <Route path="/signupMember" element={<SignupMember />} />
                <Route path="/loginMember" element={<LoginMember />} />
                <Route path="/dashboardMember" element={<DashboardMember />} />

                <Route path="/signupOwner" element={<SignupOwner />} />
                <Route path="/loginOwner" element={<LoginOwner />} />
                <Route path="/dashboardOwner" element={<DashboardOwner />} />

                <Route path="/admin" element={<Admin />} />

                <Route path="/review" element={<Review />} />
                <Route path="/terms" element={<TermsAndServices />} />
            </Routes>
        </Router>
        // </AvailableSeatsProvider>
    );
};

export default App;
