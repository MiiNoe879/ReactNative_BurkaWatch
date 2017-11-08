import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Fab, View } from 'native-base';

import SideBar from "../sidebar/index.js";
import TermsScreen from "./termsscreen.js";
import { DrawerNavigator } from "react-navigation";

const TermsScreenRouter = DrawerNavigator(
  {
    leaders: { screen: TermsScreen }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default TermsScreenRouter;