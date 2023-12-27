import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import TopAppBar from "../components/atoms/TopAppBar";
import CardTemplate from "../components/atoms/Card";
import "../style/Home.css";
import ChatWindow from "../components/atoms/ChatWindow";
import axios from "axios";
import { useState } from "react";
function Home(){
    const links = [true, false, false, false, false, true, true];
    const pages = ['News', 'Ranking', 'Teams', 'Players'];
    const [newsApi, setNewsApi] = useState([]);
    useEffect(() => {
        const getApiNews = () => {
            console.log("getApineas i'm inside")
            const apiKey = "62563bbc4e9e5b4871a03be615443210";
            const apiUrl = "https://gnews.io/api/v4/search?country=it&category=sport&q=football&apikey=" + apiKey;
            axios.get(apiUrl)
                .then(response => {
                    console.log(response.data);
                    setNewsApi(newsApi = response.data.articles.slice(0, 5));
                    console.log(newsApi[0].title);
                    console.log(newsApi[0].image);
                })
                .catch(error => {
                    console.log(error);
                })
        };
        getApiNews();
    }, []);
    return (
        <div >
            
            <TopAppBar links={links} pages={pages} />
            <div id="boxTitleHome">
                <h1 id="titleHome"><em>Welcome to FootBall GOAL</em></h1>
            </div>
            <div id="topNews">
            </div>
            <div id="containerBoxNews">
    
            { newsApi.map((newsItem, index)  => (
                <CardTemplate key={index} newsApi={newsItem} />
            ))}
            
            </div>
            <button>More News</button>
            <ChatWindow />
        </div>
    );
}
export default Home;