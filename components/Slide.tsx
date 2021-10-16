import React from "react";
import { StyleSheet, View, useColorScheme } from "react-native";
import { BlurView } from "expo-blur";
import styled from "styled-components/native";
import { TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { makeImgPath } from "../utils.ts";
import Poster from "./Poster";
import Votes from "./Votes";

const BgImg = styled.Image``;

const Title = styled.Text<{ isDark: boolean }>`
  font-size: 14px;
  font-weight: 800;
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Column = styled.View`
  width: 60%;
  margin-left: 20px;
`;

const Overview = styled.Text`
  color: rgba(255, 255, 255, 0.6);
  margin-top: 10px;
`;

interface SlideProps {
  backdrop_path: string;
  poster_path: string;
  original_title: string;
  overview: string;
  vote_average: number;
}

const Slide: React.FC<SlideProps> = ({
  backdrop_path,
  poster_path,
  original_title,
  overview,
  vote_average,
  fullData,
}) => {
  const isDark = useColorScheme() === "dark";
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("Stack", {
      screen: "Detail",
      params: { ...fullData },
    });
  };
  return (
    <TouchableWithoutFeedback onPress={goToDetail}>
      <View style={{ flex: 1 }}>
        <BgImg
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(backdrop_path) }}
        />
        <BlurView intensity={80} style={StyleSheet.absoluteFill}>
          <Wrapper>
            <Poster path={poster_path} />
            <Column>
              <Title isDark={isDark}>{original_title}</Title>
              {overview.length > 0 ? (
                <Overview>{overview && overview.slice(0, 80)}...</Overview>
              ) : null}
              <Votes vote_average={vote_average} />
            </Column>
          </Wrapper>
        </BlurView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Slide;
