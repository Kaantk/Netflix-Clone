import React, { useEffect } from "react";
import Main from "../components/Main";
import { Row } from "../components/Row";
import requests from "../Requests";
import { UserAuth } from "../context/AuthContext";

export const Home = () => {
  const { getCurrentUser } = UserAuth();

  async function fetcData() {
    const response = await getCurrentUser();
    console.log(response);
  }

  useEffect(() => {
    fetcData();
  }, []);

  return (
    <div className="bg-background">
      <Main />
      <div className="w-full h-full pb-4 px-2">
        <Row rowID="1" title="UpComing" fetchURL={requests.requestUpcoming} />
        <Row rowID="2" title="Popular" fetchURL={requests.requestPopular} />
        <Row rowID="3" title="Trending" fetchURL={requests.requestTrending} />
        <Row rowID="4" title="Top Rated" fetchURL={requests.requestTopRated} />
        <Row rowID="5" title="Horror" fetchURL={requests.requestHorror} />
      </div>
    </div>
  );
};
