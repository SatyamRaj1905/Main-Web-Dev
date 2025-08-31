// App.tsx
import { Dashboard } from "./components/pages/Dashboard";
import { Signin } from "./components/pages/Signin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from "./components/pages/Signup";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signup" element = {<Signup />} />
                <Route path="/signin" element = {<Signin />} />
                <Route path="/dashboard" element = {<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
