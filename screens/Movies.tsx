import React, { useState, useEffect } from "react";
import { Dimensions, ActivityIndicator, ScrollView } from "react-native";
import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Swiper from "react-native-web-swiper";

import { makeImgPath } from "../utils.ts";
import Slide from "../components/Slide";
import Poster from "../components/Poster";

const API_KEY = "0e150e4de760f6c830945f14f262a66a";

const Container = styled.ScrollView``;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ListTitle = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-left: 18px;
`;

const Movie = styled.View`
  margin-right: 10px;
  align-items: center;
`;

const TrendingScroll = styled.ScrollView`
  margin-top: 8px;
`;

const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 3px;
  margin-bottom: 3px;
`;

const Votes = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
  margin-top: 3px;
  margin-bottom: 3px;
`;

const ListContainer = styled.View`
  margin-bottom: 12px;
`;

const HMovie = styled.View`
  padding: 0px 18px;
  margin-bottom: 12px;
  flex-direction: row;
`;

const Overview = styled.Text`
  color: white;
  opacity: 0.5;
  width: 85%;
`;

const HColumn = styled.View`
  margin-left: 12px;
  width: 80%;
`;

const Release = styled.Text`
  font-size: 12px;
  color: white;
  opacity: 0.8;
  margin-vertical: 5px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 8px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);
  const getTrending = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
    );
    const { results } = await response.json();
    setTrending(results);
  };
  const getUpcoming = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
    );
    const { results } = await response.json();
    setUpcoming(results);
  };
  const getNowPlaying = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
    );
    const { results } = await response.json();
    setNowPlaying(results);
  };
  const getData = async () => {
    await Promise.all([getTrending(), getUpcoming(), getNowPlaying()]);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator size="large" color="red" />
    </Loader>
  ) : (
    <Container>
      <Swiper
        loop
        timeout={3}
        controlsEnabled={false}
        containerStyle={{
          width: "100%",
          height: SCREEN_HEIGHT / 4,
          marginBottom: 12,
        }}
      >
        {nowPlaying.map((movie) => (
          <Slide
            key={movie.id}
            backdrop_path={movie.backdrop_path}
            poster_path={movie.poster_path}
            original_title={movie.original_title}
            overview={movie.overview}
            vote_average={movie.vote_average}
          />
        ))}
      </Swiper>
      <ListContainer>
        <ListTitle>Trending Movies</ListTitle>
        <TrendingScroll
          horizontal
          contentContainerStyle={{ paddingLeft: 18 }}
          showsHorizontalScrollIndicator={false}
        >
          {trending.map((movie) => (
            <Movie key={movie.id}>
              <Poster path={movie.poster_path} />
              <Title>
                {movie.original_title.slice(0, 12)}
                {movie.original_title.length > 12 ? "..." : null}
              </Title>
              <Votes>
                {movie.vote_average > 0
                  ? `⭐ ${movie.vote_average}/10`
                  : "Coming soon..."}
              </Votes>
            </Movie>
          ))}
        </TrendingScroll>
      </ListContainer>
      <ComingSoonTitle>Coming soon</ComingSoonTitle>
      {upcoming.map((movie) => (
        <HMovie key={movie.id}>
          <Poster path={movie.poster_path} />
          <HColumn>
            <Title>
              {movie.original_title.slice(0, 30)}
              {movie.original_title.length > 30 ? "..." : null}
            </Title>
            <Release>
              {new Date(movie.release_date).toLocaleDateString("ko", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </Release>
            <Overview>
              {movie.overview && movie.overview.length > 80
                ? `${movie.overview.slice(0, 150)}...`
                : movie.overview}
            </Overview>
          </HColumn>
        </HMovie>
      ))}
    </Container>
  );
};

export default Movies;
