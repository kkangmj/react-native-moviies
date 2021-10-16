import React from "react";
import styled from "styled-components/native";
import { FlatList } from "react-native";

import VMedia from "./VMedia";

const ListTitle = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin: 10px 0px 10px 18px;
`;

const ListContainer = styled.View`
  margin-bottom: 12px;
`;

export const HSeparator = styled.View`
  width: 15px;
`;

const HList = ({ title, data }) => (
  <ListContainer>
    <ListTitle>{title}</ListTitle>
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 18 }}
      data={data}
      ItemSeparatorComponent={HSeparator}
      keyExtractor={(item) => `${item.id}`}
      renderItem={({ item }) => (
        <VMedia
          poster_path={item.poster_path}
          original_title={item.original_name ?? item.original_title}
          vote_average={item.vote_average}
          fullData={item}
        />
      )}
    />
  </ListContainer>
);

export default HList;
