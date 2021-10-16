import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

import Poster from "../components/Poster";
import Votes from "../components/Votes";

const Container = styled.View`
  align-items: center;
`;
const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 3px;
  margin-bottom: 3px;
`;

const VMedia = ({ poster_path, original_title, vote_average, fullData }) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("Stack", {
      screen: "Detail",
      params: { ...fullData },
    });
  };
  return (
    <TouchableOpacity onPress={goToDetail}>
      <Container>
        <Poster path={poster_path} />
        <Title>
          {original_title && original_title.length > 10
            ? `${original_title.slice(0, 10)}...`
            : original_title}
        </Title>
        <Votes vote_average={vote_average} />
      </Container>
    </TouchableOpacity>
  );
};

export default VMedia;
