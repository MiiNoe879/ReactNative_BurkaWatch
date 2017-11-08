import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Fab, View } from 'native-base';

import SideBar from "../sidebar/index.js";
import MapScreen from "./mapscreen.js";
import { DrawerNavigator } from "react-navigation";

const MapScreenRouter = DrawerNavigator(
  {
    Map: { screen: MapScreen }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default MapScreenRouter;