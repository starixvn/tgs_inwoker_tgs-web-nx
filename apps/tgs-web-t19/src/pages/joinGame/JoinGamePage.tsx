import React from "react";
import { useJoinGamePage } from "@tgs-web-nx/core/hooks";
import Loading from "@/components/UI/Loading";

const JoinGamePage = () => {
  const { isLoading } = useJoinGamePage();

  return <Loading show={isLoading} noShrink={true} opacity={1} />;
};

export default JoinGamePage;
