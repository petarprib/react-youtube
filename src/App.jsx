import React, { Component } from 'react';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoDetails from './components/VideoDetails';

// const API_KEY = 'AIzaSyDFAIjZGo9iGwkwW1x1mSQCQtw7EWS9fQI';
const API_KEY2 = 'AIzaSyDB8iXT-06-yEWVcXaDkRZ_LWQ4nbsvg24';

// HIDE THE API KEY

export default class App extends Component {
  state = {
    videosData: [],
    videosStats: [],
    selectedVideo: null,
  }

  handleSearch = (searchTerm) => {

    // HAVE CHANGED MAX RESULTS FROM 20 TO 5

    this.setState({ selectedVideo: null });

    const MODIFIED_SEARCH = searchTerm.replace(/ /g, "+");
    const SEARCH_URL = `https://www.googleapis.com/youtube/v3/search?q=${MODIFIED_SEARCH}&type=video&order=relevance&maxResults=5&part=snippet&key=${API_KEY2}`;

    fetch(SEARCH_URL)
      .then(response => response.json())
      .then(data => {
        this.setState({ videosData: data.items });
        this.fetchVideosStats(data.items);
      });
  }

  fetchVideosStats = (videos) => {
    let videosStats = []

    videos.forEach(video => {
      const STATS_URL = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${video.id.videoId}&key=${API_KEY2}`;

      fetch(STATS_URL)
        .then(response => response.json())
        .then(data => {
          videosStats.push(data);
          if (videosStats.length === this.state.videosData.length) {
            this.setState({ videosStats });
          }
        });
    });
  }

  handleVideoSelect = (video) => {
    let selectedVideo = {
      id: video.id.videoId,
      publishedAt: video.snippet.publishedAt,
      title: video.snippet.title,
      description: video.snippet.description,
    }

    this.setState({ selectedVideo });
  }

  render() {
    let videos = this.state.selectedVideo ?
      <VideoDetails selectedVideo={this.state.selectedVideo} /> :
      <VideoList
        videosData={this.state.videosData}
        videosStats={this.state.videosStats}
        handleVideoSelect={this.handleVideoSelect}
      />

    return (
      <div>
        <SearchBar handleSearch={this.handleSearch} />
        {videos}
      </div>
    );
  }
}