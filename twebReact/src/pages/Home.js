import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import TopAppBar from "../components/atoms/TopAppBar";
import CardNews from "../components/atoms/CardNews";
import "../style/Home.css";
import ChatWindow from "../components/atoms/ChatWindow";
import axios from "axios";
import { useState, useEffect } from "react";

function Home(){
    const links = [true, false, false, false, false, false, true, true];
    const pages = ['News', 'Ranking', 'Teams', 'Players', 'Games', 'Competitions'];
    const [arrayNewsApi, setNewsApi] = useState([]);
   const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getApiNews = () => {
            const apiKey = "62563bbc4e9e5b4871a03be615443210";
            const apiUrl = "https://gnews.io/api/v4/search?country=it&category=sport&q=football&apikey=" + apiKey;
            axios.get(apiUrl)
                .then(response => {
                    setNewsApi(response.data.articles);
                    console.log(response.data.articles);
                    console.log(arrayNewsApi);
                    setLoading(false); // Imposta lo stato di caricamento su false quando la chiamata API è completata
                })
                .catch(error => {
                    console.log(error);
                    setLoading(false); // Assicurati di gestire anche gli errori
                });
        };
        getApiNews();
    }, []); // L'array vuoto come dipendenza fa sì che l'effetto venga eseguito solo al montaggio

    return (
        <div>
            <TopAppBar links={links} pages={pages} />
            <div id="boxTitleHome">
                <h1 id="titleHome"><em>Welcome to FootGoal!</em></h1>
            </div>
            <div id="topNews">
            </div>
            <div id="containerBoxNews">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                        arrayNewsApi.map((newsApi, index) => (
                            <CardNews key={index} newsApi={newsApi} />
                        ))
                )}

            </div>
            <button>More News</button>
            <ChatWindow/>
        </div>
    );
}
export default Home;