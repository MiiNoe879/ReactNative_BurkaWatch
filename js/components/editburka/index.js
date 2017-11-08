import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Fab, View } from 'native-base';

import SideBar from "../sidebar/index.js";
import EditBurkaScreen from "./editburkascreen.js";
import { DrawerNavigator } from "react-navigation";

const EditBurkaScreenRouter = DrawerNavigator(
  {
    leaders: { screen: EditBurkaScreen }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default EditBurkaScreenRouter;