import React, { useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Share,
  Platform,
} from "react-native";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { useQuery } from "react-query";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";

import Poster from "../components/Poster";
import Loader from "../components/Loader";
import { makeImgPath } from "../utils";
import { moviesApi, tvApi } from "../api";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end;
  padding: 0px 20px;
`;

const Background = styled.Image``;

const Column = styled.View`
  flex-direction: row;
  width: 70%;
`;

const Title = styled.Text`
  color: white;
  font-size: 28px;
  align-self: flex-end;
  margin-left: 15px;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin: 20px 0px;
`;

const VideoBtn = styled.TouchableOpacity`
  flex-direction: row;
`;
const BtnText = styled.Text`
  color: white;
  margin-bottom: 5px;
  margin-left: 10px;
  width: 94%;
`;
const Data = styled.View`
  padding: 0px 18px;
`;

const Detail = ({ navigation: { setOptions }, route: { params } }) => {
  const isMovie = "original_title" in params;
  const { isLoading, data } = useQuery(
    [isMovie ? "movies" : "tv", params.id],
    isMovie ? moviesApi.detail : tvApi.detail
  );

  const shareMedia = async () => {
    const isAndroid = Platform.OS === "android";
    const homepage = isMovie
      ? `https://www.imdb.com/title/${data.imdb_id}`
      : data.homepage;
    if (isAndroid) {
      await Share.share({
        message: homepage,
        title: isMovie ? params.original_title : params.original_name,
      });
    } else {
      await Share.share({
        url: homepage,
        title: isMovie ? params.original_title : params.original_name,
      });
    }
  };
  const ShareButton = () => (
    <TouchableOpacity onPress={shareMedia}>
      <Ionicons name="share-outline" color="white" size={20} />
    </TouchableOpacity>
  );

  const openYTLink = async (videoID) => {
    const baseUrl = `http://m.youtube.com/watch?v=${videoID}`;
    // await Linking.openURL(baseUrl);
    await WebBrowser.openBrowserAsync(baseUrl);
  };
  useEffect(() => {
    setOptions({
      title: "original_title" in params ? "Movie Detail" : "TV Detail",
      headerTitleStyle: {
        fontSize: 15,
      },
    });
  }, []);
  useEffect(() => {
    if (data) {
      setOptions({
        headerRight: () => <ShareButton />,
      });
    }
  }, [data]);
  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(params.backdrop_path || "") }}
        />
        <LinearGradient
          colors={["transparent", "#1e272e"]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={params.poster_path || ""} />
          <Title>
            {"original_title" in params
              ? params.original_title
              : params.original_name}
          </Title>
        </Column>
      </Header>
      <Data>
        <Overview>{params.overview}</Overview>
        {isLoading ? <Loader /> : null}
        {data?.videos?.results?.map((video) => (
          <VideoBtn key={video.key} onPress={() => openYTLink(video.key)}>
            <Ionicons name="logo-youtube" color="white" size={20} />
            <BtnText>{video.name}</BtnText>
          </VideoBtn>
        ))}
      </Data>
    </Container>
  );
};

export default Detail;
