import React, { useState, useEffect } from "react";
import {
  Dimensions,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  FlatList,
  View,
} from "react-native";
import { useQuery, QueryClient, useQueryClient } from "react-query";
import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Swiper from "react-native-web-swiper";

import { makeImgPath } from "../utils.ts";
import { moviesApi } from "../api";
import Slide from "../components/Slide";
import Poster from "../components/Poster";
import HMedia from "../components/HMedia";
import VMedia from "../components/VMedia";
import Loader from "../components/Loader";
import HList from "../components/HList";

const ListTitle = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin: 10px 0px 10px 18px;
`;

const ListContainer = styled.View`
  margin-bottom: 12px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 8px;
`;

const HSeparator = styled.View`
  height: 15px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const { isLoading: trendingLoading, data: trendingData } = useQuery(
    ["movies", "trending"],
    moviesApi.trending
  );

  const { isLoading: upcomingLoading, data: upcomingData } = useQuery(
    ["movies", "upcoming"],
    moviesApi.upcoming
  );

  const { isLoading: nowPlayingLoading, data: nowPlayingData } = useQuery(
    ["movies", "nowPlaying"],
    moviesApi.nowPlaying
  );

  const renderHMedia = ({ item }) => (
    <HMedia
      poster_path={item.poster_path}
      original_title={item.original_title}
      release_date={item.release_date}
      overview={item.overview}
      fullData={item}
    />
  );

  const renderVMedia = ({ item }) => (
    <VMedia
      poster_path={item.poster_path}
      original_title={item.original_title}
      vote_average={item.vote_average}
      fullData={item}
    />
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["movies"]);
    setRefreshing(false);
  };

  const movieKeyExtractor = (item) => `${item.id}`;

  const loading = trendingLoading || upcomingLoading || nowPlayingLoading;

  return loading ? (
    <Loader />
  ) : (
    <FlatList
      ListHeaderComponent={
        <>
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
            {nowPlayingData.results.map((movie) => (
              <Slide
                key={movie.id}
                backdrop_path={movie.backdrop_path}
                poster_path={movie.poster_path}
                original_title={movie.original_title}
                overview={movie.overview}
                vote_average={movie.vote_average}
                fullData={movie}
              />
            ))}
          </Swiper>
          {trendingData ? (
            <HList title="Trending Movies" data={trendingData.results} />
          ) : null}
          <ComingSoonTitle>Coming soon</ComingSoonTitle>
        </>
      }
      keyExtractor={movieKeyExtractor}
      data={upcomingData.results}
      renderItem={renderHMedia}
      ItemSeparatorComponent={HSeparator}
      onRefresh={onRefresh}
      refreshing={refreshing}
    />
  );
};

export default Movies;
