import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Fab, View } from 'native-base';

import SideBar from "../sidebar/index.js";
import GalleryScreen from "./galleryscreen.js";
import { DrawerNavigator } from "react-navigation";

const GalleryScreenRouter = DrawerNavigator(
  {
    leaders: { screen: GalleryScreen }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default GalleryScreenRouter;