import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import moment from "moment";
import "moment-timezone";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import SearchBar from "./components/Searchbar/Searchbar.jsx";
import SearchResultList from "./components/SearchResults/SearchResultList.jsx";
import SelectedVideo from "./components/SelectedVideo/SelectedVideo.jsx";
import LikedVideoList from "./components/LikedVideos/LikedVideoList.jsx";
import SearchHistoryList from "./components/SearchHistory/SearchHistoryList.jsx";
import deploymentVideos from "./deploymentVideos.json";

const DEPLOYMENT = false;

const API_KEY = "AIzaSyD_fyjTqPDozLCNzRk-9RDmogOF3nDR3MA";
const API_KEY2 = "AIzaSyBOWXkq4-Ufhafp87T1uSwdfleNVrb_5Ys";
const API_KEY3 = "AIzaSyBrNg1dKJqHJXL2cYim09HfUF3WJZjKmfc";

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState({});
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [searchHistory, setSearchHistory] = useState(
    JSON.parse(localStorage.getItem("searchHistory") || "[]")
  );

  const [likedVideos, setLikedVideos] = useState(
    JSON.parse(localStorage.getItem("likedVideos") || "[]")
  );
  const [dislikedVideos, setDislikedVideos] = useState(
    JSON.parse(localStorage.getItem("dislikedVideos") || "[]")
  );
  const [recommendedVideos, setRecommendedVideos] = useState([]);

  useEffect(() => {
    if (DEPLOYMENT === true) {
      setRecommendedVideos(deploymentVideos);
      setSearchResults(deploymentVideos);
      setSelectedVideo(deploymentVideos[0]);
      setRelatedVideos(deploymentVideos);
    } else {
      let newRecommendedVideos = JSON.parse(
        localStorage.getItem("recommendedVideos") || "[]"
      );
      if (newRecommendedVideos.length === 12) {
        setRecommendedVideos(newRecommendedVideos);
      }
    }
  }, []);

  let handleSearchHistory = (searchTerm) => {
    let newSearchHistory = searchHistory;
    newSearchHistory.push({
      searchTerm,
      time: moment().format(),
    });
    localStorage.setItem("searchHistory", JSON.stringify(newSearchHistory));
    setSearchHistory(newSearchHistory);
  };

  let fetchVideosStats = (videos) => {
    let newVideos = [];

    videos.data.forEach((video) => {
      fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${video.id.videoId}&key=${API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          newVideos.push({
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut nulla venenatis nunc rutrum finibus vel quis sapien. Proin blandit est quis vestibulum imperdiet. Vivamus vitae enim placerat, tempor libero sed, commodo velit. Mauris tempor enim at nibh finibus, efficitur ultrices est vestibulum. Donec facilisis vel tellus at molestie. Mauris et mi ligula. In erat purus, scelerisque quis ex sed, consequat posuere justo. Nulla luctus est non molestie convallis. Curabitur sed nulla massa. Sed elementum, diam id tempus ornare, ipsum libero placerat urna, quis finibus elit metus vitae tellus. Suspendisse mattis volutpat lacus auctor sodales. Proin eget quam quis nunc suscipit elementum. Quisque porta eget ligula convallis consequat. Vestibulum commodo, sem ac hendrerit rhoncus, eros diam cursus orci, at pellentesque leo magna non ex. Mauris vel suscipit erat. Praesent facilisis leo volutpat, tincidunt nulla id, maximus eros. Aenean rutrum eu enim a ullamcorper. Sed quis felis eu lacus ultrices commodo quis vitae eros. Etiam dapibus venenatis justo, id sodales elit molestie ac. Maecenas blandit tincidunt rutrum. Phasellus interdum erat vel elit dictum pellentesque. Praesent consectetur velit non arcu dignissim, ut hendrerit sem malesuada. Aenean vulputate augue et mi tempus vehicula. Donec in mollis felis. In pellentesque ullamcorper magna, sed condimentum.",
            duration: data.items[0].contentDetails.duration,
            id: video.id.videoId,
            publishedAt: video.snippet.publishedAt,
            // description provided by the Youtube API is just a shortened string without the entire content
            thumbnailDefault: video.snippet.thumbnails.default.url,
            thumbnailHigh: video.snippet.thumbnails.high.url,
            thumbnailMedium: video.snippet.thumbnails.medium.url,
            title: video.snippet.title,
            viewCount: data.items[0].statistics.viewCount,
          });

          // prevents adding same video into recommendedVideos more than once
          if (newVideos.length === 2) {
            let recommendedVideos = JSON.parse(
              localStorage.getItem("recommendedVideos") || "[]"
            );

            let match = false;
            for (let i = 0; i < recommendedVideos.length; i++) {
              for (let j = 0; j < newVideos.length; j++) {
                if (recommendedVideos[i].id === newVideos[j].id) {
                  match = true;
                  break;
                }
              }
              if (match) break;
            }

            // adds video to recommendedVideos
            if (!match) {
              if (recommendedVideos.length === 12) {
                recommendedVideos.splice(0, 2);
              }
              recommendedVideos.push(...newVideos);
              localStorage.setItem(
                "recommendedVideos",
                JSON.stringify(recommendedVideos)
              );
            }
          }

          if (newVideos.length === videos.data.length) {
            if (videos.searchResult) {
              setSearchResults(newVideos);
            } else {
              setRelatedVideos(newVideos);
            }
          }
        });
    });
  };

  let handleSearch = (searchTerm) => {
    fetch(
      `https://www.googleapis.com/youtube/v3/search?q=${searchTerm}&type=video&order=relevance&maxResults=3&part=snippet&key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        fetchVideosStats({ data: data.items, searchResult: true });
      });
  };

  let handleVideoSelect = (videoId) => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setSelectedVideo({
          // description provided by the Youtube API is just a shortened string without the entire content
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut nulla venenatis nunc rutrum finibus vel quis sapien. Proin blandit est quis vestibulum imperdiet. Vivamus vitae enim placerat, tempor libero sed, commodo velit. Mauris tempor enim at nibh finibus, efficitur ultrices est vestibulum. Donec facilisis vel tellus at molestie. Mauris et mi ligula. In erat purus, scelerisque quis ex sed, consequat posuere justo. Nulla luctus est non molestie convallis. Curabitur sed nulla massa. Sed elementum, diam id tempus ornare, ipsum libero placerat urna, quis finibus elit metus vitae tellus. Suspendisse mattis volutpat lacus auctor sodales. Proin eget quam quis nunc suscipit elementum. Quisque porta eget ligula convallis consequat. Vestibulum commodo, sem ac hendrerit rhoncus, eros diam cursus orci, at pellentesque leo magna non ex. Mauris vel suscipit erat. Praesent facilisis leo volutpat, tincidunt nulla id, maximus eros. Aenean rutrum eu enim a ullamcorper. Sed quis felis eu lacus ultrices commodo quis vitae eros. Etiam dapibus venenatis justo, id sodales elit molestie ac. Maecenas blandit tincidunt rutrum. Phasellus interdum erat vel elit dictum pellentesque. Praesent consectetur velit non arcu dignissim, ut hendrerit sem malesuada. Aenean vulputate augue et mi tempus vehicula. Donec in mollis felis. In pellentesque ullamcorper magna, sed condimentum.",
          dislikeCount: data.items[0].statistics.dislikeCount,
          duration: data.items[0].contentDetails.duration,
          id: videoId,
          likeCount: data.items[0].statistics.likeCount,
          publishedAt: data.items[0].snippet.publishedAt,
          thumbnailDefault: data.items[0].snippet.thumbnails.default,
          thumbnailHigh: data.items[0].snippet.thumbnails.high,
          thumbnailMedium: data.items[0].snippet.thumbnails.medium,
          title: data.items[0].snippet.title,
          viewCount: data.items[0].statistics.viewCount,
        });

        fetchRelatedVideos(videoId);
      });
  };

  let fetchRelatedVideos = (videoId) => {
    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&type=video&order=relevance&maxResults=3&key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        fetchVideosStats({ data: data.items, searchResult: false });
      });
  };

  let handleLike = (selectedVideo) => {
    let newLikedVideos = likedVideos;

    if (!likedVideos.length) {
      // adds to liked videos
      newLikedVideos.push(selectedVideo);
      localStorage.setItem("likedVideos", JSON.stringify(newLikedVideos));
      setLikedVideos(newLikedVideos);

      // removes it from disliked videos
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

      // removes like if already liked
      if (likedIndex !== undefined) {
        removeLike(selectedVideo);
      } else {
        // adds to liked videos
        newLikedVideos.push(selectedVideo);
        localStorage.setItem("likedVideos", JSON.stringify(newLikedVideos));
        setLikedVideos(newLikedVideos);

        // removes it from disliked videos
        if (dislikedVideos.length) {
          removeDislike(selectedVideo);
        }
      }
    }
  };

  let handleDislike = (selectedVideo) => {
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
        localStorage.setItem(
          "dislikedVideos",
          JSON.stringify(newDislikedVideos)
        );
        setDislikedVideos(newDislikedVideos);

        if (likedVideos.length) {
          removeLike(selectedVideo);
        }
      }
    }
  };

  let removeLike = (selectedVideo) => {
    let newLikedVideos = likedVideos;

    for (let i = 0; i < likedVideos.length; i++) {
      if (likedVideos[i].id === selectedVideo.id) {
        newLikedVideos.splice(i, 1);
        localStorage.setItem("likedVideos", JSON.stringify(newLikedVideos));
        setLikedVideos(newLikedVideos);
      }
    }
  };

  let removeDislike = (selectedVideo) => {
    let newDislikedVideos = dislikedVideos;

    for (let i = 0; i < dislikedVideos.length; i++) {
      if (dislikedVideos[i].id === selectedVideo.id) {
        newDislikedVideos.splice(i, 1);
        localStorage.setItem(
          "dislikedVideos",
          JSON.stringify(newDislikedVideos)
        );
        setDislikedVideos(newDislikedVideos);
      }
    }
  };

  return (
    <Router>
      <Container fluid>
        <Row>
          <Col id="sidebar" className="pr-0 d-none d-lg-block">
            <Sidebar />
          </Col>
          <Col>
            <SearchBar
              handleSearchHistory={(searchTerm) =>
                handleSearchHistory(searchTerm)
              }
            />
            <Switch>
              <Route
                path="/liked-videos"
                render={() => <LikedVideoList likedVideos={likedVideos} />}
              />
              <Route
                path="/search-history"
                render={() => (
                  <SearchHistoryList searchHistory={searchHistory} />
                )}
              />
              <Route
                path="/results/:searchTerm"
                render={() => (
                  <SearchResultList
                    DEPLOYMENT={DEPLOYMENT}
                    searchResults={searchResults}
                    handleSearch={(searchTerm) => handleSearch(searchTerm)}
                  />
                )}
              />
              <Route
                path="/video/:videoId"
                render={() => (
                  <SelectedVideo
                    DEPLOYMENT={DEPLOYMENT}
                    selectedVideo={selectedVideo}
                    relatedVideos={relatedVideos}
                    likedVideos={likedVideos}
                    dislikedVideos={dislikedVideos}
                    handleLike={(selectedVideo) => handleLike(selectedVideo)}
                    handleDislike={(selectedVideo) =>
                      handleDislike(selectedVideo)
                    }
                  />
                )}
              />
            </Switch>
          </Col>
        </Row>
      </Container>
    </Router>
  );
};

export default App;
