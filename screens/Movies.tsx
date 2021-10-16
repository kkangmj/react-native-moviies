import React, { useState, useEffect } from "react";
import {
  Dimensions,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  FlatList,
  View,
} from "react-native";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Swiper from "react-native-web-swiper";

import { makeImgPath } from "../utils.ts";
import Slide from "../components/Slide";
import Poster from "../components/Poster";
import HMedia from "../components/HMedia";
import VMedia from "../components/VMedia";
import { moviesApi } from "../api";

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

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

const VSeparator = styled.View`
  width: 15px;
`;
const HSeparator = styled.View`
  height: 15px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const {
    isLoading: trendingLoading,
    data: trendingData,
    refetch: refetchTrending,
    isRefetching: isRefetchingTrending,
  } = useQuery("trending", moviesApi.trending);
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    refetch: refetchUpcoming,
    isRefetching: isRefetchingUpcoming,
  } = useQuery("upcoming", moviesApi.upcoming);
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    refetch: refetchNowPlaying,
    isRefetching: isRefetchingNowPlaying,
  } = useQuery("nowPlaying", moviesApi.nowPlaying);

  const renderHMedia = ({ item }) => (
    <HMedia
      poster_path={item.poster_path}
      original_title={item.original_title}
      release_date={item.release_date}
      overview={item.overview}
    />
  );

  const renderVMedia = ({ item }) => (
    <VMedia
      poster_path={item.poster_path}
      original_title={item.original_title}
      vote_average={item.vote_average}
    />
  );

  const onRefresh = async () => {
    refetchUpcoming();
    refetchNowPlaying();
    refetchTrending();
  };
  const movieKeyExtractor = (item) => `${item.id}`;

  const loading = trendingLoading || upcomingLoading || nowPlayingLoading;
  const refreshing =
    isRefetchingNowPlaying || isRefetchingTrending || isRefetchingUpcoming;

  return loading ? (
    <Loader>
      <ActivityIndicator size="large" color="red" />
    </Loader>
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
              />
            ))}
          </Swiper>
          <ListContainer>
            <ListTitle>Trending Movies</ListTitle>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 18 }}
              keyExtractor={movieKeyExtractor}
              data={trendingData.results}
              renderItem={renderVMedia}
              ItemSeparatorComponent={VSeparator}
            />
          </ListContainer>
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
