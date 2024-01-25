import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import TopAppBar from '../components/atoms/TopAppBar';
import CardNews from '../components/atoms/CardNews';
import '../style/Home.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useAuth } from '../components/atoms/AuthContext';
import Footer from '../components/atoms/Footer';
import '../style/global.css';
import ChatIcon from '../components/atoms/ChatIcon';
import TeamsImage from '../Images/TeamsImage.png';
import CompetitionsImage from '../Images/CompetitionsImage.jpg';
import PlayersImage from '../Images/PlayersImage.jpg';
import { useNavigate } from 'react-router-dom';

function Home() {
  const links = [
    false,
    true,
    true,
    true,
    true,
    false,
    false,
    false,
    true,
    true,
  ];
  const { checkCredentials, user, getUser } = useAuth();
  console.log('isUserLogged Home--->', checkCredentials);
  const [arrayNewsApi, setNewsApi] = useState([]);
  const [arrayNewsFavouriteTeam, setNewsFavouriteTeam] = useState([]);
  const [arrayNewsFavouritePlayer, setNewsFavouritePlayer] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getApiNews = () => {
      const apiKey = '62563bbc4e9e5b4871a03be615443210';
      const apiUrl =
        'https://gnews.io/api/v4/search?country=it&max=10&category=sport&q=soccer&apikey=' +
        apiKey;
      axios
        .get(apiUrl)
        .then((response) => {
          setNewsApi(response.data.articles);
          setLoading(false); // Imposta lo stato di caricamento su false quando la chiamata API è completata
        })
        .catch((error) => {
          setLoading(false); // Assicurati di gestire anche gli errori
        });
    };
    getApiNews();
  }, []); // L'array vuoto come dipendenza fa sì che l'effetto venga eseguito solo al montaggio

  const handleClickImage = (param) => {
    if (param === 1) {
      navigate('/teams');
    } else if (param === 2) {
      navigate('/competitions');
    }
  };

  return (
    <div id="container">
      <div id="topContainer">
        <TopAppBar links={links} />
      </div>
      <div id="containerBoxNews" className="container-background-color">
        <div id="boxTitleHome">
          <h1 className="titleHome">
            <b>
              <em>Welcome to FootGoal!</em>
            </b>
          </h1>
        </div>
        <div className="middle-title">
          <h4 id="titleNewsFavourite">Choose category</h4>
        </div>
        <div id="container-img-link">
          <img src={PlayersImage} alt="players" className="image-link" />
          <img
            src={TeamsImage}
            alt="teams"
            onClick={() => handleClickImage(1)}
            className="image-link"
          />
          <img
            src={CompetitionsImage}
            alt="competitions"
            onClick={() => handleClickImage(2)}
            className="image-link"
          />
        </div>
        <div id="boxNewsFavourite">
          {loading ? (
            <p>Loading...</p>
          ) : (
            arrayNewsFavouriteTeam.map((newsApi, index) => (
              <CardNews key={index} newsApi={newsApi} />
            ))
          )}
        </div>

        <div className="middle-title">
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
        <Footer />
      </div>
      <ChatIcon />
    </div>
  );
}
export default Home;
