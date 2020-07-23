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
import { Image, Container, Row } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import moment from 'moment';
import 'moment-timezone';

const DEPLOYMENT = true;

// menu lateral, guardar likes, historial de busqueda y cuando se hizo (libreria moment), coger los primeros 2 videos de las ultimas 5 busquedas

// const API_KEY = 'AIzaSyDFAIjZGo9iGwkwW1x1mSQCQtw7EWS9fQI';
const API_KEY2 = 'AIzaSyDB8iXT-06-yEWVcXaDkRZ_LWQ4nbsvg24';

// HIDE THE API KEY

export default class App extends Component {
  constructor(props) {
    super(props)

    if (DEPLOYMENT === true) {
      this.state = {
        videosData: [],
        selectedVideo: null,
        likedVideos: [],
        dislikedVideos: [],
        searchHistory: [],
        recommendedVideos: recommVideos.recommVideos
      }
    } else {
      this.state = {
        videosData: [],
        selectedVideo: null,
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
    this.setState({ selectedVideo: null });

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
            description: video.snippet.description,
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
            if (recommendedVideos.length === 12) {
              recommendedVideos.splice(0, 2);
            }
            recommendedVideos.push(...videosData);
            localStorage.setItem("recommendedVideos", JSON.stringify(recommendedVideos));
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

    this.setState({ selectedVideo: video });
  }

  handleLike = (selectedVideo) => {
    let { likedVideos, dislikedVideos } = this.state;
    let newLikedVideos = this.state.likedVideos;

    if (!likedVideos.length) {
      newLikedVideos.push(selectedVideo);
      localStorage.setItem("likedVideos", JSON.stringify(newLikedVideos));
      this.setState({ likedVideos: newLikedVideos });

      if (dislikedVideos.length) {
        this.removeDislike(selectedVideo)
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
        this.removeLike(selectedVideo);
      } else {
        newLikedVideos.push(selectedVideo);
        localStorage.setItem("likedVideos", JSON.stringify(newLikedVideos));
        this.setState({ likedVideos: newLikedVideos });

        if (dislikedVideos.length) {
          this.removeDislike(selectedVideo)
        }
      }
    }
  }

  handleDislike = (selectedVideo) => {
    let { dislikedVideos, likedVideos } = this.state;
    let newDislikedVideos = this.state.dislikedVideos;

    if (!dislikedVideos.length) {
      newDislikedVideos.push(selectedVideo);
      localStorage.setItem("dislikedVideos", JSON.stringify(newDislikedVideos));
      this.setState({ dislikedVideos: newDislikedVideos });

      if (likedVideos.length) {
        this.removeLike(selectedVideo);
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
        this.removeDislike(selectedVideo)
      } else {
        newDislikedVideos.push(selectedVideo);
        localStorage.setItem("dislikedVideos", JSON.stringify(newDislikedVideos));
        this.setState({ dislikedVideos: newDislikedVideos });

        if (likedVideos.length) {
          this.removeLike(selectedVideo)
        }
      }
    }
  }

  removeLike = (selectedVideo) => {
    let { likedVideos } = this.state;
    let newLikedVideos = this.state.likedVideos;

    for (let i = 0; i < likedVideos.length; i++) {
      if (likedVideos[i].id === selectedVideo.id) {
        newLikedVideos.splice(i, 1);
        localStorage.setItem("likedVideos", JSON.stringify(newLikedVideos));
        this.setState({ likedVideos: newLikedVideos });
      }
    }
  }

  removeDislike = (selectedVideo) => {
    let { dislikedVideos } = this.state;
    let newDislikedVideos = this.state.dislikedVideos;

    for (let i = 0; i < dislikedVideos.length; i++) {
      if (dislikedVideos[i].id === selectedVideo.id) {
        newDislikedVideos.splice(i, 1);
        localStorage.setItem("dislikedVideos", JSON.stringify(newDislikedVideos));
        this.setState({ dislikedVideos: newDislikedVideos });
      }
    }
  }

  render() {
    let recommendedVideos;
    let videoList;
    let selectedVideo;

    // SEARCH FROM SEARCH-HISTORY WON'T WORK WHILE window.location.href IS PRESENT

    if (this.state.selectedVideo === null && !this.state.videosData.length && window.location.href !== "http://localhost:3000/liked-videos" && window.location.href !== "http://localhost:3000/search-history") {
      recommendedVideos =
        <RecommVideosList
          recommendedVideos={this.state.recommendedVideos}
          handleVideoSelect={this.handleVideoSelect}
        />
    }

    if (this.state.selectedVideo && window.location.href !== "http://localhost:3000/liked-videos" && window.location.href !== "http://localhost:3000/search-history") {
      selectedVideo =
        <VideoDetails
          selectedVideo={this.state.selectedVideo}
          likedVideos={this.state.likedVideos}
          dislikedVideos={this.state.dislikedVideos}
          handleVideoSelect={this.handleVideoSelect}
          handleLike={this.handleLike}
          handleDislike={this.handleDislike}
        />
    }

    if (this.state.videosData.length && window.location.href !== "http://localhost:3000/liked-videos" && window.location.href !== "http://localhost:3000/search-history") {
      videoList =
        <VideoList
          videosData={this.state.videosData}
          selectedVideo={this.state.selectedVideo}
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
          {selectedVideo}
          {videoList}
        </Container>
      </div>
    );
  }
}