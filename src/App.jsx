import React, { Component } from 'react';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoDetails from './components/VideoDetails';

// menu lateral, guardar likes, historial de busqueda y cuando se hizo (libreria moment), coger los primeros 2 videos de las ultimas 5 busquedas

// const API_KEY = 'AIzaSyDFAIjZGo9iGwkwW1x1mSQCQtw7EWS9fQI';
const API_KEY2 = 'AIzaSyDB8iXT-06-yEWVcXaDkRZ_LWQ4nbsvg24';

// const DEPLOYMENT = true;

// HIDE THE API KEY

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      videosData: [],
      selectedVideo: null
    }

    // cargar aqui videos recomendados del homepage
    // if deployment true cargar recomendados de json local
  }


  // state = {
  //   videosData: [],
  //   selectedVideo: null
  // }

  handleSearch = (searchTerm) => {
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

          if (videosData.length === videos.length) {
            this.setState({ videosData });
          }
        });
    });
  }

  handleVideoSelect = (video) => {
    // HAVE CHANGED MAX RESULTS FROM 20 TO 3
    const RELATED_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${video.id}&type=video&order=relevance&maxResults=3&key=${API_KEY2}`;

    fetch(RELATED_URL)
      .then(response => response.json())
      .then(data => {
        this.fetchVideosStats(data.items);
      });

    this.setState({ selectedVideo: video });
  }

  render() {
    let selectedVideo;
    if (this.state.selectedVideo) {
      selectedVideo =
        <VideoDetails
          selectedVideo={this.state.selectedVideo}
          handleVideoSelect={this.handleVideoSelect}
        />
    }

    return (
      <div>
        <SearchBar handleSearch={this.handleSearch} />
        {selectedVideo}
        <VideoList
          videosData={this.state.videosData}
          handleVideoSelect={this.handleVideoSelect}
        />
      </div>
    );
  }
}