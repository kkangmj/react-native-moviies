import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import { useQuery, QueryClient, useQueryClient } from "react-query";

import { tvApi } from "../api";
import Loader from "../components/Loader";
import VMedia from "../components/VMedia";
import HList, { HSeparator } from "../components/HList";

const Tv = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const { isLoading: trendingLoading, data: trendingData } = useQuery(
    ["tv", "trending"],
    tvApi.trending
  );

  const { isLoading: todayLoading, data: todayData } = useQuery(
    ["tv", "today"],
    tvApi.airingToday
  );

  const { isLoading: topLoading, data: topData } = useQuery(
    ["tv", "top"],
    tvApi.topRated
  );

  const loading = trendingLoading || todayLoading || topLoading;

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["tv"]);
    setRefreshing(false);
  };

  return loading ? (
    <Loader />
  ) : (
    <ScrollView
      contentContainerStyle={{ paddingVertical: 8 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <HList title="Trending TV" data={trendingData.results} />
      <HList title="Airing Today" data={todayData.results} />
      <HList title="Top Rated" data={topData.results} />
    </ScrollView>
  );
};

export default Tv;
