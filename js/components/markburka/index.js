import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Fab, View } from 'native-base';

import SideBar from "../sidebar/index.js";
import MarkBurkaScreen from "./markburkascreen.js";
import { DrawerNavigator } from "react-navigation";

const MarkBurkaScreenRouter = DrawerNavigator(
  {
    MarkBurkaScreen: { screen: MarkBurkaScreen }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default MarkBurkaScreenRouter;