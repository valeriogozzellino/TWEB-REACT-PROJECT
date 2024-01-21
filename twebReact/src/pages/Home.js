import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import TopAppBar from "../components/atoms/TopAppBar";
import CardNews from "../components/atoms/CardNews";
import "../style/Home.css";
import axios from "axios";
import { useState, useEffect } from "react";
import AppBarUser from "../components/atoms/AppBarUser";
import { useAuth } from '../components/atoms/AuthContext';
import Footer from "../components/atoms/Footer";
import '../style/global.css';
import ChatIcon from '../components/atoms/ChatIcon';

function Home() {
    const links = [true, false, false, false, false, false,false, false, true, true];
    const pages = ['Competitions','Teams', 'Games' ];
    const { checkCredentials, user } = useAuth();
    console.log("isUserLogged Home--->" , checkCredentials);
    const [arrayNewsApi, setNewsApi] = useState([]);
    const [arrayNewsFavouriteTeam, setNewsFavouriteTeam] = useState([]);
    const [arrayNewsFavouritePlayer, setNewsFavouritePlayer] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getApiNews = () => {
            const apiKey = "62563bbc4e9e5b4871a03be615443210";
            const apiUrl = "https://gnews.io/api/v4/search?country=it&max=10&category=sport&q=soccer&apikey=" + apiKey;
            axios.get(apiUrl)
                .then(response => {
                    setNewsApi(response.data.articles);
                    setLoading(false); // Imposta lo stato di caricamento su false quando la chiamata API è completata
                })
                .catch(error => {
                    setLoading(false); // Assicurati di gestire anche gli errori
                });
        };
        getApiNews();

    }, []); // L'array vuoto come dipendenza fa sì che l'effetto venga eseguito solo al montaggio
    
    if (checkCredentials) {
       
        const getFavouriteNews = () => {
            // const apiKey = "62563bbc4e9e5b4871a03be615443210";
            // const apiUrlTeamNews = "https://gnews.io/api/v4/search?lang=it&category=sport&max=4&q="+ user.favouriteClub +"&apikey=" + apiKey;
            // axios.get(apiUrlTeamNews)
            //     .then(response => {
            //         setNewsFavouriteTeam(response.data.articles);
            //         setLoading(false); // Imposta lo stato di caricamento su false quando la chiamata API è completata
            //     })
            //     .catch(error => {
            //         setLoading(false); // Assicurati di gestire anche gli errori
            //     });
            //const apiUrlPlayerNews = "https://gnews.io/api/v4/search?lang=it&category=sport&max=3&q=soccer+"+ user.favouriteClub +"&apikey=" + apiKey;
            // axios.get(apiUrlPlayerNews)
            //     .then(response => {
            //         setNewsFavouritePlayer(response.data.articles);
            //         setLoading(false); // Imposta lo stato di caricamento su false quando la chiamata API è completata
            //     })
            //     .catch(error => {
            //         setLoading(false); // Assicurati di gestire anche gli errori
            //     });
            
        };
        getFavouriteNews();

     // L'array vuoto come dipendenza fa sì che l'effetto venga eseguito solo al montaggio
    }

    return (
        <div id='container'>
            <div id="topContainer">
                {checkCredentials ? (
                    <AppBarUser pages={pages} />
                ) : (     
                    <TopAppBar links={links} pages={pages} />
                )}
            </div>
            <div id="containerBoxNews" className='container-background-color'>
                <div id="boxTitleHome">
                    <h1 id="titleHome"><em>Welcome to FootGoal!</em></h1>
                </div>
                <div className='middle-title'>
                    <h4 id="titleNewsFavourite">News about  Footbal</h4>
                </div>
                {checkCredentials && (
                    <div id="boxNewsFavourite">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                                arrayNewsFavouriteTeam.map((newsApi, index) => (
                                    <CardNews key={index} newsApi={newsApi} />
                                ))
                            )}
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                                
                                arrayNewsFavouritePlayer.map((newsApi, index) => (
                                    <CardNews key={index} newsApi={newsApi} />
                                ))
                                
                            )}
                    </div>
                
                )}
                <div className='middle-title'>
                    <h4>Most popular news</h4>
                </div>
                <div id="boxNews">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                        arrayNewsApi.map((newsApi, index) => (
                             <CardNews key={index} newsApi={newsApi} />
                        ))
                    )}
                </div>
            </div>
            <div id="bottomContainer">
                
                <ChatIcon/>
                <Footer />
            </div>
        </div>
    );
}
export default Home;