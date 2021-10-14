import React from "react";
import styled from "styled-components/native";

import Poster from "../components/Poster";
import Votes from "../components/Votes";

const HMovie = styled.View`
  padding: 0px 18px;
  flex-direction: row;
`;

const HColumn = styled.View`
  margin-left: 12px;
  width: 80%;
`;
const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 3px;
  margin-bottom: 3px;
`;
const Release = styled.Text`
  font-size: 12px;
  color: white;
  opacity: 0.8;
  margin-vertical: 5px;
`;
const Overview = styled.Text`
  color: white;
  opacity: 0.5;
  width: 85%;
`;

const HMedia = ({
  poster_path,
  original_title,
  release_date,
  overview,
  vote_average,
}) => (
  <HMovie>
    <Poster path={poster_path} />
    <HColumn>
      <Title>
        {original_title.slice(0, 30)}
        {original_title.length > 30 ? "..." : null}
      </Title>
      {release_date ? (
        <Release>
          {new Date(release_date).toLocaleDateString("ko", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </Release>
      ) : null}
      {vote_average ? <Votes vote_average={vote_average} /> : null}
      <Overview>
        {overview && overview.length > 80
          ? `${overview.slice(0, 150)}...`
          : overview}
      </Overview>
    </HColumn>
  </HMovie>
);

export default HMedia;
