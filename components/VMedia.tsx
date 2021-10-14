import React from "react";
import styled from "styled-components/native";

import Poster from "../components/Poster";
import Votes from "../components/Votes";

const Movie = styled.View`
  align-items: center;
`;
const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 3px;
  margin-bottom: 3px;
`;

const VMedia = ({ poster_path, original_title, vote_average }) => (
  <Movie>
    <Poster path={poster_path} />
    <Title>
      {original_title.slice(0, 12)}
      {original_title.length > 12 ? "..." : null}
    </Title>
    <Votes vote_average={vote_average} />
  </Movie>
);

export default VMedia;
