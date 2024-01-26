import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import TopAppBar from '../components/TopAppBar';
import CardNews from '../components/atoms/card/CardNews';
import '../style/Home.css';
import axios from 'axios';
import React, { useState, useEffect, useMemo } from 'react';
import Footer from '../components/Footer';
import '../style/global.css';
import ChatIcon from '../components/atoms/ChatIcon';
import TeamsImage from '../Images/TeamsImage.png';
import CompetitionsImage from '../Images/CompetitionsImage.jpg';
import GamesImage from '../Images/img-link-games.jpg';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';

// import ArrowBack from '../components/atoms/ArrowBack';

function Home() {
  const links = [true, true, true];
  const [arrayNewsApi, setNewsApi] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
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
  }, []); // L'array vuoto come dipendenza fa sì che l'effetto venga eseguito solo al montaggio

  console.log('elemento 0 nell array', arrayNewsApi[0]);
  const handleClickImage = (param) => {
    if (param === 1) {
      navigate('/teams');
    } else if (param === 2) {
      navigate('/competitions');
    } else {
      navigate('/games');
    }
  };

  //memoizedNewsApi and arrayNewsApi are the same thing
  const memoizedNewsApi = useMemo(() => arrayNewsApi, [arrayNewsApi]);
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
        <div className="middle-box-home">
          {memoizedNewsApi[0] === undefined ? (
            <p>Loading...</p>
          ) : (
            <div id="box-imp-news">
              <img
                src={memoizedNewsApi[0].image}
                alt={memoizedNewsApi[0].title}
                style={{ width: '40%', height: '40vh', borderRadius: '10px' }}
              />
              <div id="box-description-news">
                <h4>{memoizedNewsApi[0].title}</h4>
                <p>{memoizedNewsApi[0].description}</p>
                <a
                  href={memoizedNewsApi[0].url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button className="btn btn-primary">Read more</button>
                </a>
              </div>
            </div>
          )}
          {memoizedNewsApi[1] === undefined ? (
            <p>Loading...</p>
          ) : (
            <div id="box-imp-news">
              <div id="box-description-news">
                <h4>{memoizedNewsApi[1].title}</h4>
                <p>{memoizedNewsApi[1].description}</p>
                <a
                  href={memoizedNewsApi[1].url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button className="btn btn-primary">Read more</button>
                </a>
              </div>
              <img
                src={memoizedNewsApi[1].image}
                alt={memoizedNewsApi[1].title}
                style={{ width: '40%', height: '40vh', borderRadius: '10px' }}
              />
            </div>
          )}
          <div className="middle-title">
            <h3 id="titleNewsFavourite">Choose category</h3>
          </div>
          <div id="container-img-link">
            <div className="img-category">
              <h5>Games</h5>
              <img
                src={GamesImage}
                alt="games"
                className="image-link"
                onClick={() => handleClickImage(0)}
              />
            </div>
            <div className="img-category">
              <h5>Teams</h5>
              <img
                src={TeamsImage}
                alt="teams"
                onClick={() => handleClickImage(1)}
                className="image-link"
              />
            </div>
            <div className="img-category">
              <h5>Competitions</h5>
              <img
                src={CompetitionsImage}
                alt="competitions"
                onClick={() => handleClickImage(2)}
                className="image-link"
              />
            </div>
          </div>

          <div className="middle-title">
            <h4>Most popular news</h4>
          </div>
          <div id="boxNews">
            {loading ? (
              <p>Loading...</p>
            ) : (
              memoizedNewsApi
                .slice(2)
                .map((newsApi, index) => (
                  <CardNews key={index} newsApi={newsApi} />
                ))
            )}
          </div>
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
