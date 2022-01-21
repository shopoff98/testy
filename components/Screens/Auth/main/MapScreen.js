import React from "react";
import {
    StyleSheet,
    View,
    
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useState, useEffect } from "react";

export default function MapScreen({ route }) {
    console.log(route.params.item.location.latitude)
    const latitude = route.params.item.location.latitude;
    const longitude = route.params.item.location.longitude;
    
    return (
       
        <View style={s.container}>
        <MapView
          style={{flex:1}}
          region={{
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          mapType="standard"
          minZoomLevel = {15}
          onMapReady={() => console.log("Map is ready")}
          onRegionChange={() => console.log("Region change")}
        >
          <Marker  
            coordinate={{ latitude, longitude }}
          />
        </MapView>
      </View>
      );
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        // alignItems: "center",
        justifyContent: "center",
}})