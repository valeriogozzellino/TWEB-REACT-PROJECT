import React from "react";
import 'bootstrap'
import TopAppBar from "../components/atoms/TopAppBar";

function LogIn() {

    const links = [false, true, true, true, true, true, true];
    const pages = ['Home', 'News', 'Ranking', 'Teams', 'Player'];
    class User {
        constructor(name, surname, email, password) {
            this.name = name;
            this.surname = surname;
            this.email = email;
            this.password = password;
        }
    }
    const user = new User();

    function getUser() {
        user.name = document.getElementById("name").value;
        user.surname = document.getElementById("surname").value;
        user.email = document.getElementById("email").value;
        user.password = document.getElementById("password").value;
        console.log(user);
    }
    
    return (
        <div>
            <TopAppBar links={links} pages={pages} />
        <div id="containerHeader">
            <div className="headerDiv" id="headerDiv">
                {/*<img src="/images/logo.jpeg" alt="application logo" id="logo">*/}
            </div>
            <div><h3>insert your data to log in your account</h3></div>
        </div>
        <form id="form">
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" name="name"/>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="surname">Surname</label>
                    <input type="text" className="form-control" id="surname" name="surname"/>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" name="email"/>
                </div>
                <div className="form-group col-md-6">
                    <label for="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password"/>
                </div>
            </div>
            <button type="button" className="btn btn-primary" onClick={getUser}>Sign in</button>    
        </form>
    </div>
);
}
export default LogIn;