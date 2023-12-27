import TopAppBar from "../components/atoms/TopAppBar";
import React from "react";

const SignUp = () => {
    const links = [false, false, false, false, false, true, true];
    const pages = ['Home', 'News', 'Ranking', 'Teams', 'Players'];
    return (
    < div >
            <TopAppBar links={links} pages={pages} />
        <h1>SignUp</h1>
    </div>
        
    )
}
export default SignUp;