import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Fab, View } from 'native-base';

import SideBar from "../sidebar/index.js";
import DetailScreen from "./detailscreen.js";
import { DrawerNavigator } from "react-navigation";

const DetailScreenRouter = DrawerNavigator(
  {
    leaders: { screen: DetailScreen }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default DetailScreenRouter;