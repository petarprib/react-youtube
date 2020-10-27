import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/SearchBar";
import VideoList from "./components/VideoList";
import VideoDetails from "./components/VideoDetails";
import LikedVideosList from "./components/LikedVideosList";
import SearchHistoryList from "./components/SearchHistoryList";
import RecommVideosList from "./components/RecommVideosList";
import videos from "./videos.json";
import recommVideosDeploy from "./recommVideosDeploy.json";
import { Container, Row, Col } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import moment from "moment";
import "moment-timezone";

// PASS MODIFIED_SEARCH FROM SearchBar to App

const DEPLOYMENT = true;

const API_KEY = "AIzaSyD_fyjTqPDozLCNzRk-9RDmogOF3nDR3MA";
const API_KEY2 = "AIzaSyBOWXkq4-Ufhafp87T1uSwdfleNVrb_5Ys";

const App = () => {
  // const { push } = useHistory();

  const [videosData, setVideosData] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [likedVideos, setLikedVideos] = useState(
    JSON.parse(localStorage.getItem("likedVideos") || "[]")
  );
  const [dislikedVideos, setDislikedVideos] = useState(
    JSON.parse(localStorage.getItem("dislikedVideos") || "[]")
  );
  const [searchHistory, setSearchHistory] = useState(
    JSON.parse(localStorage.getItem("searchHistory") || "[]")
  );
  const [recommendedVideos, setRecommendedVideos] = useState([]);

  /**
   * @desc loads videos.json if deployment true, otherwise uses API key
   */
  useEffect(() => {
    if (DEPLOYMENT === true) {
      setVideosData(videos);
      setRecommendedVideos(recommVideosDeploy);
    } else {
      let newRecommendedVideos = JSON.parse(
        localStorage.getItem("recommendedVideos") || "[]"
      );
      if (newRecommendedVideos.length === 12) {
        setRecommendedVideos(newRecommendedVideos);
      }
    }
  }, []);

  /**
   * @desc handles search term
   * @param string searchTerm - input string
   * @return void
   */
  let handleSearch = (searchTerm) => {
    let newSearchHistory = searchHistory;
    newSearchHistory.push({
      searchTerm,
      time: moment().format(),
    });
    localStorage.setItem("searchHistory", JSON.stringify(newSearchHistory));
    setSearchHistory(newSearchHistory);

    setSelectedVideo(null);

    const MODIFIED_SEARCH = searchTerm.replace(/ /g, "+");
    const SEARCH_URL = `https://www.googleapis.com/youtube/v3/search?q=${MODIFIED_SEARCH}&type=video&order=relevance&maxResults=3&part=snippet&key=${API_KEY}`;

    fetch(SEARCH_URL)
      .then((response) => response.json())
      .then((data) => {
        fetchVideosStats(data.items);
      });
  };

  /**
   * @desc fetches video duration/views/likes and prevents duplicates in recommendedVideos
   * @param array videos - array of video data objects
   * @return void
   */
  let fetchVideosStats = (videos) => {
    let newVideosData = [];

    videos.forEach((video) => {
      const STATS_URL = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${video.id.videoId}&key=${API_KEY}`;

      fetch(STATS_URL)
        .then((response) => response.json())
        .then((data) => {
          newVideosData.push({
            id: video.id.videoId,
            title: video.snippet.title,
            // description provided by the Youtube API is just a shortened string without the entire content
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut nulla venenatis nunc rutrum finibus vel quis sapien. Proin blandit est quis vestibulum imperdiet. Vivamus vitae enim placerat, tempor libero sed, commodo velit. Mauris tempor enim at nibh finibus, efficitur ultrices est vestibulum. Donec facilisis vel tellus at molestie. Mauris et mi ligula. In erat purus, scelerisque quis ex sed, consequat posuere justo. Nulla luctus est non molestie convallis. Curabitur sed nulla massa. Sed elementum, diam id tempus ornare, ipsum libero placerat urna, quis finibus elit metus vitae tellus. Suspendisse mattis volutpat lacus auctor sodales. Proin eget quam quis nunc suscipit elementum. Quisque porta eget ligula convallis consequat. Vestibulum commodo, sem ac hendrerit rhoncus, eros diam cursus orci, at pellentesque leo magna non ex. Mauris vel suscipit erat. Praesent facilisis leo volutpat, tincidunt nulla id, maximus eros. Aenean rutrum eu enim a ullamcorper. Sed quis felis eu lacus ultrices commodo quis vitae eros. Etiam dapibus venenatis justo, id sodales elit molestie ac. Maecenas blandit tincidunt rutrum. Phasellus interdum erat vel elit dictum pellentesque. Praesent consectetur velit non arcu dignissim, ut hendrerit sem malesuada. Aenean vulputate augue et mi tempus vehicula. Donec in mollis felis. In pellentesque ullamcorper magna, sed condimentum.",
            publishedAt: video.snippet.publishedAt,
            thumbnailDefault: video.snippet.thumbnails.default.url,
            thumbnailHigh: video.snippet.thumbnails.high.url,
            thumbnailMedium: video.snippet.thumbnails.medium.url,
            duration: data.items[0].contentDetails.duration,
            viewCount: data.items[0].statistics.viewCount,
            likeCount: data.items[0].statistics.likeCount,
            dislikeCount: data.items[0].statistics.dislikeCount,
          });

          // prevents adding same video into recommendedVideos more than once
          if (newVideosData.length === 2) {
            let recommendedVideos = JSON.parse(
              localStorage.getItem("recommendedVideos") || "[]"
            );

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

            // adds video to recommendedVideos
            if (!match) {
              if (recommendedVideos.length === 12) {
                recommendedVideos.splice(0, 2);
              }
              recommendedVideos.push(...newVideosData);
              localStorage.setItem(
                "recommendedVideos",
                JSON.stringify(recommendedVideos)
              );
            }
          }

          if (newVideosData.length === videos.length) {
            setVideosData(newVideosData);
          }
        });
    });
  };

  /**
   * @desc fetches videos related to selected video, their duration/views/likes and loads video
   * @param object video - video data object
   * @return void
   */
  let handleVideoSelect = (video) => {
    // fetches related videos
    if (DEPLOYMENT === false) {
      const RELATED_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${video.id}&type=video&order=relevance&maxResults=3&key=${API_KEY}`;

      fetch(RELATED_URL)
        .then((response) => response.json())
        .then((data) => {
          fetchVideosStats(data.items);
        });
    }
    // console.log(video.id)
    setSelectedVideo(video);
    // return push(`/video/${video.id}`)
  };

  /**
   * @desc adds to liked videos
   * @param object selectedVideo - video data object
   * @return void
   */
  let handleLike = (selectedVideo) => {
    let newLikedVideos = likedVideos;

    if (!likedVideos.length) {
      // adds to liked videos
      newLikedVideos.push(selectedVideo);
      localStorage.setItem("likedVideos", JSON.stringify(newLikedVideos));
      setLikedVideos(newLikedVideos);

      // removes it form disliked videos
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

        // removes it form disliked videos
        if (dislikedVideos.length) {
          removeDislike(selectedVideo);
        }
      }
    }
  };

  /**
   * @desc adds to disliked videos
   * @param object selectedVideo - video data object
   * @return void
   */
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

  /**
   * @desc handleLike/handleDislike helper method
   * @param object selectedVideo - video data object
   * @return void
   */
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

  /**
   * @desc handleLike/handleDislike helper method
   * @param object selectedVideo - video data object
   * @return void
   */
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

  // let recommVideos;
  // let videoList;
  // let nowPlaying;

  // SEARCH FROM SEARCH-HISTORY WON'T WORK WHILE window.location.href IS PRESENT

  // if (selectedVideo === null && !videosData.length && window.location.href !== "http://localhost:3000/liked-videos" && window.location.href !== "http://localhost:3000/search-history") {
  //   recommVideos =
  //     <RecommVideosList
  //       recommVideos={recommendedVideos}
  //       handleVideoSelect={(video) => handleVideoSelect(video)}
  //     />
  // }

  // if (selectedVideo && window.location.href !== "http://localhost:3000/liked-videos" && window.location.href !== "http://localhost:3000/search-history") {
  //   nowPlaying =
  //     <Row>
  //       <Col xs={12} lg={8}>
  //         <VideoDetails
  //           selectVideo={selectedVideo}
  //           likedVids={likedVideos}
  //           dislikedVids={dislikedVideos}
  //           handleVideoSelect={(video) => handleVideoSelect(video)}
  //           handleLike={(selectVideo) => handleLike(selectVideo)}
  //           handleDislike={(selectVideo) => handleDislike(selectVideo)}
  //         />
  //       </Col>
  //       <Col lg={4} className="pl-lg-0">
  //         <VideoList
  //           videosData={videosData}
  //           selectVideo={selectedVideo}
  //           handleVideoSelect={(video) => handleVideoSelect(video)}
  //         />
  //       </Col>
  //     </Row>
  // }

  // if (videosData.length && selectedVideo === null && window.location.href !== "http://localhost:3000/liked-videos" && window.location.href !== "http://localhost:3000/search-history") {
  //   videoList =
  //     <VideoList
  //       videosData={videosData}
  //       selectVideo={selectedVideo}
  //       handleVideoSelect={(video) => handleVideoSelect(video)}
  //     />
  // }

  return (
    <Router>
      <Container fluid>
        <Row>
          <Col id="sidebar" className="pr-0 d-none d-lg-block">
            <Sidebar />
          </Col>
          <Col>
            <SearchBar
              handleSearch={(searchTerm) => handleSearch(searchTerm)}
            />
            <Switch>
              <Route
                path="/liked-videos"
                component={() => (
                  <LikedVideosList
                    likedVideos={likedVideos}
                    handleVideoSelect={(video) => handleVideoSelect(video)}
                  />
                )}
              />
              <Route
                path="/search-history"
                component={() => (
                  <SearchHistoryList
                    searchHistory={searchHistory}
                    handleSearch={(searchTerm) => handleSearch(searchTerm)}
                  />
                )}
              />
              <Route
                path="/results/:searchTerm"
                component={() => (
                  <VideoList
                    videosData={videosData}
                    selectVideo={selectedVideo}
                    handleVideoSelect={(video) => handleVideoSelect(video)}
                  />
                )}
              />
              <Route
                path="/video/:id"
                component={() => (
                  <VideoDetails
                    selectVideo={selectedVideo}
                    likedVids={likedVideos}
                    dislikedVids={dislikedVideos}
                    handleVideoSelect={(video) => handleVideoSelect(video)}
                    handleLike={(selectVideo) => handleLike(selectVideo)}
                    handleDislike={(selectVideo) => handleDislike(selectVideo)}
                  />
                )}
              />
            </Switch>
            {/* {recommVideos} */}
            {/* {nowPlaying} */}
            {/* {videoList} */}
          </Col>
        </Row>
      </Container>
    </Router>
  );
};

export default App;
