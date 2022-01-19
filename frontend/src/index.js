import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/style.css";

import VoirProposition from "./Components/Pages/VoirProposition";


import Navbar from "./Components/Navbar/Navbar";
import {Router} from "./Components/Router/Router";



/// Render the Navbar
Navbar();

// Render the HomePage
// HomePage();


// Call the router
Router();