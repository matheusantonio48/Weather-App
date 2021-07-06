import React, { useEffect } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { Platform, PermissionsAndroid, ScrollView, RefreshControl, ToastAndroid, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import forecast from '~/store/actions/index';
import Card from '~/components/card';
import Loading from '~/components/loading';
import imageDictionary from "~/utils/imageDictionary";


import {
  Container,
  CurrentDay,
  City,
  BigText,
  BigIcon,
  Temp,
  Description,
  Week,
  Time
} from './styles';

export default function Main() {
  const today = useSelector(state => state.forecast.weatherForecast[0]);
  const isLoading = useSelector(state => state.forecast.loading);
  const fdata = useSelector(state => state.forecast.weatherForecast.slice(2, 8));
  const dispatch = useDispatch();


  async function requestPermissions() {

    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        dispatch(forecast())
      } else {
        ToastAndroid.show("O GPS está desabilitado.", ToastAndroid.SHORT);
      }
    } 
    if(Platform.OS === "ios"){
      const status = await Geolocation.requestAuthorization("always"); 
      if (status === "granted") {
        dispatch(forecast())
      }
   }else{
      Alert.alert("O GPS está desabilitado.");
   }
  }

  useEffect(() => {
    requestPermissions()
  }, [])

  function refreshing() {
    dispatch(forecast())
  }

  return (
    <Container>
      {isLoading ? <Loading /> :
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={refreshing}
              colors={['#fff']}
            />
          }>
          <CurrentDay>
            <City>{today?.city}</City>
            <BigText>{today?.date}</BigText>
            <Time>{today?.time}</Time>
            <BigIcon
              source={
                imageDictionary[
                today?.condition_slug
                ] || imageDictionary["clear_day"]
              }
            />
            <Temp>{today?.temp}°C</Temp>
            <Description>
              {today?.description}
            </Description>
          </CurrentDay>
        </ScrollView>}

      {!isLoading && (
        <Week horizontal={true} showsHorizontalScrollIndicator={false}>
          {fdata.map((day, index) => (
            <Card
              key={index}
              icon={day?.condition}
              name={day?.date}
              min={day?.min}
              max={day?.max}
            />))}
        </Week>)}
    </Container>

  );
}
