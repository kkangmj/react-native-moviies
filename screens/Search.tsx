import React, { useState } from "react";
import { View, Text } from "react-native";
import { useQuery } from "react-query";
import styled from "styled-components/native";

import { moviesApi, tvApi } from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
  background-color: white;
  padding: 10px 15px;
  border-radius: 15px;
  border: gray 1px solid;
  width: 90%;
  height: 35px;
  font-size: 12px;
  margin: 10px auto;
  margin-bottom: 20px;
`;

const Search = () => {
  const [query, setQuery] = useState("");

  const {
    isLoading: moviesLoading,
    data: moviesData,
    refetch: searchMovies,
  } = useQuery(["searchMovies", query], moviesApi.search, {
    enabled: false,
  });

  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: searchTv,
  } = useQuery(["searchTv", query], tvApi.search, {
    enabled: false,
  });

  const onChangeText = (text) => setQuery(text);

  const onSubmit = () => {
    if (query === "") {
      return;
    }
    searchMovies();
    searchTv();
  };

  return (
    <Container>
      <SearchBar
        placeholder="Search for Movie or TV Show"
        placeholderTextColor="grey"
        returnKeyLabel="searchMedia"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      {moviesLoading || tvLoading ? (
        <Loader />
      ) : (
        <>
          {moviesData ? (
            <HList title="Movie Results" data={moviesData.results} />
          ) : null}
          {tvData ? <HList title="Tv Results" data={tvData.results} /> : null}
        </>
      )}
    </Container>
  );
};

export default Search;
