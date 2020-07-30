import React, { Component } from 'react';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoDetails from './components/VideoDetails';
import LikedVideosList from './components/LikedVideosList';
import SearchHistoryList from './components/SearchHistoryList';
import RecommVideosList from './components/RecommVideosList';
import videos from './videos.json';
import recommVideos from './recommVideos.json';
import { Image, Container, Row, Col } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import moment from 'moment';
import 'moment-timezone';

// M19: 1h/dia LO MÁS IMPORTANTE
// M10: clone de evernote después de youtube 1-2 dias
// Repaso general al temario: 5-7 días (TODO: testing, degurar, librerías UI, HTTP, sin redux…) REPASA PUNTOS IMPORTANTES CURSO SCRIMBA DEL M10
// REPADO HOOKS Y LUEGO CONVERTIR EL PROYECTO
// M18: ejemplo app pizzas

// ROUTING, SIDEBAR, HOOKS

// zašto na recommVideos ne radi space-evenly, ellipsis opis videa, kako napravit sidebar

const DEPLOYMENT = false;

// const API_KEY = 'AIzaSyDFAIjZGo9iGwkwW1x1mSQCQtw7EWS9fQI';
const API_KEY2 = 'AIzaSyDB8iXT-06-yEWVcXaDkRZ_LWQ4nbsvg24';

// HIDE THE API KEY

export default class App extends Component {
  constructor(props) {
    super(props)

    if (DEPLOYMENT === true) {
      this.state = {
        videosData: [],
        selectVideo: null,
        likedVideos: [],
        dislikedVideos: [],
        searchHistory: [],
        recommendedVideos: recommVideos.recommVideos
      }
    } else {
      this.state = {
        videosData: [],
        selectVideo: null,
        likedVideos: [],
        dislikedVideos: [],
        searchHistory: [],
        recommendedVideos: []
      }
    }

    this.state.likedVideos = JSON.parse(localStorage.getItem("likedVideos") || "[]");
    this.state.dislikedVideos = JSON.parse(localStorage.getItem("dislikedVideos") || "[]");
    this.state.searchHistory = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    let recommendedVideos = JSON.parse(localStorage.getItem("recommendedVideos") || "[]");
    if (recommendedVideos.length === 12 && DEPLOYMENT === false) {
      this.state.recommendedVideos = recommendedVideos;
    }
  }

  handleSearch = (searchTerm) => {
    let newSearchHistory = this.state.searchHistory;
    newSearchHistory.push({
      searchTerm,
      time: moment().format()
    });
    localStorage.setItem("searchHistory", JSON.stringify(newSearchHistory));
    this.setState({ searchHistory: newSearchHistory });

    // HAVE CHANGED MAX RESULTS FROM 20 TO 3
    this.setState({ selectVideo: null });

    const MODIFIED_SEARCH = searchTerm.replace(/ /g, "+");
    const SEARCH_URL = `https://www.googleapis.com/youtube/v3/search?q=${MODIFIED_SEARCH}&type=video&order=relevance&maxResults=3&part=snippet&key=${API_KEY2}`;

    fetch(SEARCH_URL)
      .then(response => response.json())
      .then(data => {
        this.fetchVideosStats(data.items);
      });
  }

  fetchVideosStats = (videos) => {
    let videosData = [];

    videos.forEach(video => {
      const STATS_URL = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${video.id.videoId}&key=${API_KEY2}`;

      fetch(STATS_URL)
        .then(response => response.json())
        .then(data => {
          videosData.push({
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

          if (videosData.length === 2) {
            let recommendedVideos = JSON.parse(localStorage.getItem("recommendedVideos") || "[]")

            let match = false;
            for (let i = 0; i < recommendedVideos.length; i++) {
              for (let j = 0; j < videosData.length; j++) {
                if (recommendedVideos[i].id === videosData[j].id) {
                  match = true;
                  break;
                }
              }
              if (match) break;
            }

            if (match === false) {
              if (recommendedVideos.length === 12) {
                recommendedVideos.splice(0, 2);
              }
              recommendedVideos.push(...videosData);
              localStorage.setItem("recommendedVideos", JSON.stringify(recommendedVideos));
            }
          }

          if (videosData.length === videos.length) {
            this.setState({ videosData });
          }
        });
    });
  }

  handleVideoSelect = (video) => {
    // HAVE CHANGED MAX RESULTS FROM 20 TO 3
    if (DEPLOYMENT === false) {
      const RELATED_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${video.id}&type=video&order=relevance&maxResults=3&key=${API_KEY2}`;

      fetch(RELATED_URL)
        .then(response => response.json())
        .then(data => {
          this.fetchVideosStats(data.items);
        });
    }

    this.setState({ selectVideo: video });
  }

  handleLike = (selectVideo) => {
    let { likedVideos, dislikedVideos } = this.state;
    let newLikedVideos = this.state.likedVideos;

    if (!likedVideos.length) {
      newLikedVideos.push(selectVideo);
      localStorage.setItem("likedVideos", JSON.stringify(newLikedVideos));
      this.setState({ likedVideos: newLikedVideos });

      if (dislikedVideos.length) {
        this.removeDislike(selectVideo)
      }
    } else {
      let likedIndex;

      for (let i = 0; i < likedVideos.length; i++) {
        if (likedVideos[i].id === selectVideo.id) {
          likedIndex = i;
          break;
        }
      }

      if (likedIndex !== undefined) {
        this.removeLike(selectVideo);
      } else {
        newLikedVideos.push(selectVideo);
        localStorage.setItem("likedVideos", JSON.stringify(newLikedVideos));
        this.setState({ likedVideos: newLikedVideos });

        if (dislikedVideos.length) {
          this.removeDislike(selectVideo)
        }
      }
    }
  }

  handleDislike = (selectVideo) => {
    let { dislikedVideos, likedVideos } = this.state;
    let newDislikedVideos = this.state.dislikedVideos;

    if (!dislikedVideos.length) {
      newDislikedVideos.push(selectVideo);
      localStorage.setItem("dislikedVideos", JSON.stringify(newDislikedVideos));
      this.setState({ dislikedVideos: newDislikedVideos });

      if (likedVideos.length) {
        this.removeLike(selectVideo);
      }
    } else {
      let dislikedIndex;

      for (let i = 0; i < dislikedVideos.length; i++) {
        if (dislikedVideos[i].id === selectVideo.id) {
          dislikedIndex = i;
          break;
        }
      }

      if (dislikedIndex !== undefined) {
        this.removeDislike(selectVideo)
      } else {
        newDislikedVideos.push(selectVideo);
        localStorage.setItem("dislikedVideos", JSON.stringify(newDislikedVideos));
        this.setState({ dislikedVideos: newDislikedVideos });

        if (likedVideos.length) {
          this.removeLike(selectVideo)
        }
      }
    }
  }

  removeLike = (selectVideo) => {
    let { likedVideos } = this.state;
    let newLikedVideos = this.state.likedVideos;

    for (let i = 0; i < likedVideos.length; i++) {
      if (likedVideos[i].id === selectVideo.id) {
        newLikedVideos.splice(i, 1);
        localStorage.setItem("likedVideos", JSON.stringify(newLikedVideos));
        this.setState({ likedVideos: newLikedVideos });
      }
    }
  }

  removeDislike = (selectVideo) => {
    let { dislikedVideos } = this.state;
    let newDislikedVideos = this.state.dislikedVideos;

    for (let i = 0; i < dislikedVideos.length; i++) {
      if (dislikedVideos[i].id === selectVideo.id) {
        newDislikedVideos.splice(i, 1);
        localStorage.setItem("dislikedVideos", JSON.stringify(newDislikedVideos));
        this.setState({ dislikedVideos: newDislikedVideos });
      }
    }
  }

  render() {
    let recommendedVideos;
    let videoList;
    let selectVideo;

    // SEARCH FROM SEARCH-HISTORY WON'T WORK WHILE window.location.href IS PRESENT

    if (this.state.selectVideo === null && !this.state.videosData.length && window.location.href !== "http://localhost:3000/liked-videos" && window.location.href !== "http://localhost:3000/search-history") {
      recommendedVideos =
        <RecommVideosList
          recommendedVideos={this.state.recommendedVideos}
          handleVideoSelect={this.handleVideoSelect}
        />
    }

    if (this.state.selectVideo && window.location.href !== "http://localhost:3000/liked-videos" && window.location.href !== "http://localhost:3000/search-history") {
      selectVideo =
        <Row>
          <Col xs={12} lg={8}>
            <VideoDetails
              selectVideo={this.state.selectVideo}
              likedVideos={this.state.likedVideos}
              dislikedVideos={this.state.dislikedVideos}
              handleVideoSelect={this.handleVideoSelect}
              handleLike={this.handleLike}
              handleDislike={this.handleDislike}
            />
          </Col>
          <Col lg={4} className="pl-lg-0">
            <VideoList
              videosData={this.state.videosData}
              selectVideo={this.state.selectVideo}
              handleVideoSelect={this.handleVideoSelect}
            />
          </Col>
        </Row>
    }

    if (this.state.videosData.length && this.state.selectVideo === null && window.location.href !== "http://localhost:3000/liked-videos" && window.location.href !== "http://localhost:3000/search-history") {
      videoList =
        <VideoList
          videosData={this.state.videosData}
          selectVideo={this.state.selectVideo}
          handleVideoSelect={this.handleVideoSelect}
        />
    }

    return (
      <div>
        {/* <Row>

        </Row> */}
        <Sidebar />
        <Container fluid>
          <a href="http://localhost:3000/"><Image src="ytlogo.svg" className="ytlogo" /></a>
          <Router>
            <Route
              path="/liked-videos"
              component={() =>
                <LikedVideosList
                  likedVideos={this.state.likedVideos}
                  handleVideoSelect={this.handleVideoSelect}
                />}
            />
            <Route
              path="/search-history"
              component={() =>
                <SearchHistoryList
                  searchHistory={this.state.searchHistory}
                  handleSearch={this.handleSearch}
                />}
            />
          </Router>
          <SearchBar handleSearch={this.handleSearch} />
          {recommendedVideos}
          {selectVideo}
          {videoList}
        </Container>
      </div>
    );
  }
}