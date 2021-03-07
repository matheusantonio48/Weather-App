import React from "react";
import { Day, SmallIcon, SmallText } from "~/pages/Main/styles";
import imageDictionary from "~/utils/imageDictionary";

export default function Card({ name, icon, min, max }) {
  return (
    <Day>
      <SmallIcon source={imageDictionary[
        icon
      ] || imageDictionary["clear_day"]} />
      <SmallText>{name}</SmallText>
      <SmallText>{min}°C</SmallText>
      <SmallText>{max}°C</SmallText>
    </Day>
  );
}