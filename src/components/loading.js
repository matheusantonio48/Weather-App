import React from "react";
import { ActivityIndicator } from 'react-native';
import { Container } from "~/pages/Main/styles";

const Loading = (props) => {
  return (
    <Container>
      <ActivityIndicator size="large" color="#00ff00" />
    </Container>
  );
};
export default Loading;