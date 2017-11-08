import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Fab, View } from 'native-base';

import SideBar from "../sidebar/index.js";
import LeaderScreen from "./leaderscreen.js";
import { DrawerNavigator } from "react-navigation";

const LeaderScreenRouter = DrawerNavigator(
  {
    leaders: { screen: LeaderScreen }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default LeaderScreenRouter;