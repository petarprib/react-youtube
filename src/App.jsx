import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoDetails from './components/VideoDetails';
import LikedVideosList from './components/LikedVideosList';
import SearchHistoryList from './components/SearchHistoryList';
import RecommVideosList from './components/RecommVideosList';
import videos from './videos.json';
import recommVideosDeploy from './recommVideosDeploy.json';
import { Container, Row, Col } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import moment from 'moment';
import 'moment-timezone';

// M19: 1h/dia LO MÁS IMPORTANTE
// M10: clone de evernote después de youtube 1-2 dias
// Repaso general al temario: 5-7 días (TODO: testing, debugar, librerías UI, HTTP, sin redux…) REPASA PUNTOS IMPORTANTES CURSO SCRIMBA DEL M10
// REPASO HOOKS Y LUEGO CONVERTIR EL PROYECTO
// M18: ejemplo app pizzas

// ROUTING, SIDEBAR, HOOKS

// zašto na recommVideos ne radi space-evenly, ellipsis opis videa, kako napravit sidebar

const DEPLOYMENT = true;

const API_KEY = 'AIzaSyDFAIjZGo9iGwkwW1x1mSQCQtw7EWS9fQI';
// const API_KEY2 = 'AIzaSyDB8iXT-06-yEWVcXaDkRZ_LWQ4nbsvg24';

// HIDE THE API KEY

const App = () => {
  const [videosData, setVideosData] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [likedVideos, setLikedVideos] = useState(JSON.parse(localStorage.getItem("likedVideos") || "[]"));
  const [dislikedVideos, setDislikedVideos] = useState(JSON.parse(localStorage.getItem("dislikedVideos") || "[]"));
  const [searchHistory, setSearchHistory] = useState(JSON.parse(localStorage.getItem("searchHistory") || "[]"));
  const [recommendedVideos, setRecommendedVideos] = useState([]);

  useEffect(() => {
    if (DEPLOYMENT === true) {
      setVideosData(videos.videos);
      setRecommendedVideos(recommVideosDeploy.recommVideosDeploy);
    } else {
      let newRecommendedVideos = JSON.parse(localStorage.getItem("recommendedVideos") || "[]");
      if (newRecommendedVideos.length === 12) {
        setRecommendedVideos(newRecommendedVideos);
      }
    }
  }, []);

  let handleSearch = (searchTerm) => {
    let newSearchHistory = searchHistory;
    newSearchHistory.push({
      searchTerm,
      time: moment().format()
    });
    localStorage.setItem("searchHistory", JSON.stringify(newSearchHistory));
    setSearchHistory(newSearchHistory);

    setSelectedVideo(null);

    // HAVE CHANGED MAX RESULTS FROM 20 TO 3
    const MODIFIED_SEARCH = searchTerm.replace(/ /g, "+");
    const SEARCH_URL = `https://www.googleapis.com/youtube/v3/search?q=${MODIFIED_SEARCH}&type=video&order=relevance&maxResults=3&part=snippet&key=${API_KEY}`;

    fetch(SEARCH_URL)
      .then(response => response.json())
      .then(data => {
        fetchVideosStats(data.items);
      });
  }

  let fetchVideosStats = (videos) => {
    let newVideosData = [];

    videos.forEach(video => {
      const STATS_URL = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${video.id.videoId}&key=${API_KEY}`;

      fetch(STATS_URL)
        .then(response => response.json())
        .then(data => {
          newVideosData.push({
            id: video.id.videoId,
            title: video.snippet.title,
            //Description provided by the Youtube API is just a shortened string without the entire content or paragraphs
            description: [
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut nulla venenatis nunc rutrum finibus vel quis sapien. Proin blandit est quis vestibulum imperdiet. Vivamus vitae enim placerat, tempor libero sed, commodo velit. Mauris tempor enim at nibh finibus, efficitur ultrices est vestibulum. Donec facilisis vel tellus at molestie. Mauris et mi ligula. In erat purus, scelerisque quis ex sed, consequat posuere justo.",
              "Nulla luctus est non molestie convallis. Curabitur sed nulla massa. Sed elementum, diam id tempus ornare, ipsum libero placerat urna, quis finibus elit metus vitae tellus. Suspendisse mattis volutpat lacus auctor sodales. Proin eget quam quis nunc suscipit elementum. Quisque porta eget ligula convallis consequat. Vestibulum commodo, sem ac hendrerit rhoncus, eros diam cursus orci, at pellentesque leo magna non ex. Mauris vel suscipit erat. Praesent facilisis leo volutpat, tincidunt nulla id, maximus eros.",
              "Aenean rutrum eu enim a ullamcorper. Sed quis felis eu lacus ultrices commodo quis vitae eros. Etiam dapibus venenatis justo, id sodales elit molestie ac. Maecenas blandit tincidunt rutrum. Phasellus interdum erat vel elit dictum pellentesque. Praesent consectetur velit non arcu dignissim, ut hendrerit sem malesuada. Aenean vulputate augue et mi tempus vehicula. Donec in mollis felis. In pellentesque ullamcorper magna, sed condimentum."
            ],
            publishedAt: video.snippet.publishedAt,
            thumbnailDefault: video.snippet.thumbnails.default.url,
            thumbnailHigh: video.snippet.thumbnails.high.url,
            thumbnailMedium: video.snippet.thumbnails.medium.url,
            duration: data.items[0].contentDetails.duration,
            viewCount: data.items[0].statistics.viewCount,
            likeCount: data.items[0].statistics.likeCount,
            dislikeCount: data.items[0].statistics.dislikeCount
          });

          if (newVideosData.length === 2) {
            let recommendedVideos = JSON.parse(localStorage.getItem("recommendedVideos") || "[]");

            let match = false;
            for (let i = 0; i < recommendedVideos.length; i++) {
              for (let j = 0; j < newVideosData.length; j++) {
                if (recommendedVideos[i].id === newVideosData[j].id) {
                  match = true;
                  break;
                }
              }
              if (match) break;
            }

            if (!match) {
              if (recommendedVideos.length === 12) {
                recommendedVideos.splice(0, 2);
              }
              recommendedVideos.push(...newVideosData);
              localStorage.setItem("recommendedVideos", JSON.stringify(recommendedVideos));
            }
          }
          // PROMISES
          if (newVideosData.length === videos.length) {
            setVideosData(newVideosData);
          }
        });
    });
  }

  let handleVideoSelect = (video) => {
    // HAVE CHANGED MAX RESULTS FROM 20 TO 3
    if (DEPLOYMENT === false) {
      const RELATED_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${video.id}&type=video&order=relevance&maxResults=3&key=${API_KEY}`;

      fetch(RELATED_URL)
        .then(response => response.json())
        .then(data => {
          fetchVideosStats(data.items);
        });
    }

    setSelectedVideo(video);
  }

  let handleLike = (selectedVideo) => {
    let newLikedVideos = likedVideos;

    if (!likedVideos.length) {
      newLikedVideos.push(selectedVideo);
      localStorage.setItem("likedVideos", JSON.stringify(newLikedVideos));
      setLikedVideos(newLikedVideos);

      if (dislikedVideos.length) {
        removeDislike(selectedVideo);
      }
    } else {
      let likedIndex;

      for (let i = 0; i < likedVideos.length; i++) {
        if (likedVideos[i].id === selectedVideo.id) {
          likedIndex = i;
          break;
        }
      }

      if (likedIndex !== undefined) {
        removeLike(selectedVideo);
      } else {
        newLikedVideos.push(selectedVideo);
        localStorage.setItem("likedVideos", JSON.stringify(newLikedVideos));
        setLikedVideos(newLikedVideos);

        if (dislikedVideos.length) {
          removeDislike(selectedVideo);
        }
      }
    }
  }

  let handleDislike = (selectedVideo) => {
    // let { dislikedVideos, likedVideos } = this.state;
    let newDislikedVideos = dislikedVideos;

    if (!dislikedVideos.length) {
      newDislikedVideos.push(selectedVideo);
      localStorage.setItem("dislikedVideos", JSON.stringify(newDislikedVideos));
      setDislikedVideos(newDislikedVideos);

      if (likedVideos.length) {
        removeLike(selectedVideo);
      }
    } else {
      let dislikedIndex;

      for (let i = 0; i < dislikedVideos.length; i++) {
        if (dislikedVideos[i].id === selectedVideo.id) {
          dislikedIndex = i;
          break;
        }
      }

      if (dislikedIndex !== undefined) {
        removeDislike(selectedVideo);
      } else {
        newDislikedVideos.push(selectedVideo);
        localStorage.setItem("dislikedVideos", JSON.stringify(newDislikedVideos));
        setDislikedVideos(newDislikedVideos);

        if (likedVideos.length) {
          removeLike(selectedVideo);
        }
      }
    }
  }

  let removeLike = (selectedVideo) => {
    // let { likedVideos } = this.state;
    let newLikedVideos = likedVideos;

    for (let i = 0; i < likedVideos.length; i++) {
      if (likedVideos[i].id === selectedVideo.id) {
        newLikedVideos.splice(i, 1);
        localStorage.setItem("likedVideos", JSON.stringify(newLikedVideos));
        setLikedVideos(newLikedVideos);
      }
    }
  }

  let removeDislike = (selectedVideo) => {
    // let { dislikedVideos } = this.state;
    let newDislikedVideos = dislikedVideos;

    for (let i = 0; i < dislikedVideos.length; i++) {
      if (dislikedVideos[i].id === selectedVideo.id) {
        newDislikedVideos.splice(i, 1);
        localStorage.setItem("dislikedVideos", JSON.stringify(newDislikedVideos));
        setDislikedVideos(newDislikedVideos);
      }
    }
  }

  let recommVideos;
  let videoList;
  let nowPlaying;

  // SEARCH FROM SEARCH-HISTORY WON'T WORK WHILE window.location.href IS PRESENT

  if (selectedVideo === null && !videosData.length && window.location.href !== "http://localhost:3000/liked-videos" && window.location.href !== "http://localhost:3000/search-history") {
    recommVideos =
      <RecommVideosList
        recommVideos={recommendedVideos}
        handleVideoSelect={(video) => handleVideoSelect(video)}
      />
  }

  if (selectedVideo && window.location.href !== "http://localhost:3000/liked-videos" && window.location.href !== "http://localhost:3000/search-history") {
    nowPlaying =
      <Row>
        <Col xs={12} lg={8}>
          <VideoDetails
            selectVideo={selectedVideo}
            likedVids={likedVideos}
            dislikedVids={dislikedVideos}
            handleVideoSelect={(video) => handleVideoSelect(video)}
            handleLike={(selectVideo) => handleLike(selectVideo)}
            handleDislike={(selectVideo) => handleDislike(selectVideo)}
          />
        </Col>
        <Col lg={4} className="pl-lg-0">
          <VideoList
            videosData={videosData}
            selectVideo={selectedVideo}
            handleVideoSelect={(video) => handleVideoSelect(video)}
          />
        </Col>
      </Row>
  }

  if (videosData.length && selectedVideo === null && window.location.href !== "http://localhost:3000/liked-videos" && window.location.href !== "http://localhost:3000/search-history") {
    videoList =
      <VideoList
        videosData={videosData}
        selectVideo={selectedVideo}
        handleVideoSelect={(video) => handleVideoSelect(video)}
      />
  }

  return (
    <Container fluid>
      <Row>
        <Col id="sidebar" className="pr-0">
          <Sidebar />
        </Col>
        <Col>
          <Router>
            <Route
              path="/liked-videos"
              component={() =>
                <LikedVideosList
                  likedVideos={likedVideos}
                  handleVideoSelect={(video) => handleVideoSelect(video)}
                />}
            />
            <Route
              path="/search-history"
              component={() =>
                <SearchHistoryList
                  searchHistory={searchHistory}
                  handleSearch={(searchTerm) => handleSearch(searchTerm)}
                />}
            />
          </Router>
          <SearchBar handleSearch={(searchTerm) => handleSearch(searchTerm)} />
          {recommVideos}
          {nowPlaying}
          {videoList}
        </Col>
      </Row>
    </Container>
  );
}

export default App;