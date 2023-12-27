import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../../style/Navbar.css";
//import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
function Navbar(props) {
    const link = props.links;

    return (
        <div>
            <div id="containerNav">
                <nav id="Navbar">
                    <div id="divLinkNav">
                        {/* <SportsSoccerIcon id="iconNavbar"/> */}
                        {link[0] &&
                            <Link to="/">Home</Link>
                        }
                        {link[1] &&
                            <Link to="/ranking">Ranking</Link>
                        }
                        {link[2] &&
                            <Link to="/teams">Teams</Link>
                        }
                    </div>
                    <div id="divLinkButton">
                        {link[3] &&
                            <Link to={"/logIn"}>
                                <button className="btn btn-outline-success my-2 my-sm-0" id="buttonLogIn">Log In</button>
                            </Link>
                        }
                        {link[4] &&
                            <button className="btn btn-outline-success my-2 my-sm-0" id="buttonSignUp">Sign Up</button>
                        }
                    </div>
                </nav>
            </div>            
            {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        {link[0] &&
                            <li className="nav-item">
                                <Link to="/">Home</Link>
                            </li>
                        }
                        {link[1] &&
                            <li className="nav-item">
                                <Link to="/ranking">Ranking</Link>
                            </li>
                        }
                        {link[2] &&
                            <li className="nav-item">
                                <Link to="/teams">Teams</Link>
                            </li>
                        }
                    </ul>

                    <div>
                    {link[3] &&
                        <Link to={"/logIn"}>
                        <button  className="btn btn-outline-success my-2 my-sm-0" id="buttonLogIn">Log In</button>
                        </Link>
                    }
                    {link[4] &&
                        <button className="btn btn-outline-success my-2 my-sm-0" id="buttonSignUp">Sign Up</button>
                    }
                    </div>
                </div>
            </nav> */}
        </div>
    );
}

export default Navbar;
