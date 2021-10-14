import React from "react";
import styled from "styled-components/native";

const Text = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
`;

const Votes = ({ vote_average }) => (
  <Text>{vote_average > 0 ? `⭐ ${vote_average}/10` : "Coming soon"}</Text>
);

export default Votes;
