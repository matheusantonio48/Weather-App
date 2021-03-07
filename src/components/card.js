import React from "react";
import { Day, SmallIcon, SmallText } from "~/pages/Main/styles";
import imageDictionary from "~/utils/imageDictionary";

export default function Card({ name, icon, temp, hour }) {
  return (
    <Day>
      <SmallIcon source={imageDictionary[
        icon
      ] || imageDictionary["clear_day"]} />
      <SmallText>{name}</SmallText>
      <SmallText>{temp}°C</SmallText>
      <SmallText>{hour}°C</SmallText>
    </Day>
  );
}