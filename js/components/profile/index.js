import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Fab, View } from 'native-base';

import SideBar from "../sidebar/index.js";
import ProfileScreen from "./profilescreen.js";
import { DrawerNavigator } from "react-navigation";

const ProfileScreenRouter = DrawerNavigator(
  {
    Profile: { screen: ProfileScreen }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default ProfileScreenRouter;