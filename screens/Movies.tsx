import React, { useState, useEffect } from "react";
import {
  Dimensions,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  FlatList,
  View,
} from "react-native";
import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Swiper from "react-native-web-swiper";

import { makeImgPath } from "../utils.ts";
import Slide from "../components/Slide";
import Poster from "../components/Poster";
import HMedia from "../components/HMedia";
import VMedia from "../components/VMedia";

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

  margin: 10px 0px 10px 18px;
`;

const ListContainer = styled.View`
  margin-bottom: 12px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 8px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const [refreshing, setRefreshing] = useState(false);
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
  const onRefresh = async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  };
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
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 18 }}
              keyExtractor={(item) => `${item.id}`}
              data={trending}
              renderItem={({ item }) => (
                <VMedia
                  poster_path={item.poster_path}
                  original_title={item.original_title}
                  vote_average={item.vote_average}
                />
              )}
              ItemSeparatorComponent={() => <View style={{ width: 15 }}></View>}
            />
          </ListContainer>
          <ComingSoonTitle>Coming soon</ComingSoonTitle>
        </>
      }
      keyExtractor={(item) => `${item.id}`}
      data={upcoming}
      renderItem={({ item }) => (
        <HMedia
          poster_path={item.poster_path}
          original_title={item.original_title}
          release_date={item.release_date}
          overview={item.overview}
        />
      )}
      ItemSeparatorComponent={() => <View style={{ height: 15 }}></View>}
      onRefresh={onRefresh}
      refreshing={refreshing}
    />
  );
};

export default Movies;
