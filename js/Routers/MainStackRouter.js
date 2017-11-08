import React, { Component } from "react";
import Signup from "../components/signup/";
import Login from "../components/login/";
import Home from "../components/home/";
import TakePicture from "../components/takepicture/";
import Profile from "../components/profile/";
import Leaders from "../components/leaders/";
import Map from "../components/map/";
import MarkBurka from "../components/markburka/";
import EditBurka from "../components/editburka/";
import Gallery from "../components/gallery/";
import Detail from "../components/detail/";
import BlankPage from "../components/blankPage";
import Terms from "../components/terms/";
import HomeDrawerRouter from "./HomeDrawerRouter";
import MapScreenRouter from "../components/map/index.js";
import MarkBurkaScreenRouter from "../components/markburka/index.js";
import EditBurkaScreenRouter from "../components/editburka/index.js";
import ProfileScreenRouter from "../components/profile/index.js";
import LeaderScreenRouter from "../components/leaders/index.js";
import GalleryScreenRouter from "../components/gallery/index.js";
import DetailScreenRouter from "../components/detail/index.js";
import TermsScreenRouter from "../components/terms/index.js";
import { StackNavigator } from "react-navigation";
import { Header, Left, Button, Icon, Body, Title, Right } from "native-base";
HomeDrawerRouter.navigationOptions = ({ navigation }) => ({
  header: null
});
MapScreenRouter.navigationOptions = ({ navigation }) => ({
  header: null
});
MarkBurkaScreenRouter.navigationOptions = ({ navigation }) => ({
  header: null
});
EditBurkaScreenRouter.navigationOptions = ({ navigation }) => ({
  header: null
});
ProfileScreenRouter.navigationOptions = ({ navigation }) => ({
  header: null
});
LeaderScreenRouter.navigationOptions = ({ navigation }) => ({
  header: null
});
GalleryScreenRouter.navigationOptions = ({ navigation }) => ({
  header: null
});
DetailScreenRouter.navigationOptions = ({ navigation }) => ({
  header: null
});
TermsScreenRouter.navigationOptions = ({ navigation }) => ({
  header: null
});
export default (StackNav = StackNavigator({
  Signup: { screen: Signup },
  Login: { screen: Login },
  Home: { screen: Home },
  TakePicture: { screen: TakePicture },
  Map: { screen: Map },
  MarkBurka: { screen: MarkBurka },
  EditBurka: { screen: EditBurka },
  Profile: { screen: Profile },
  Leaders: { screen: Leaders },
  Gallery: { screen: Gallery },
  Detail: { screen: Detail },
  Terms: { screen: Terms },
  BlankPage: { screen: BlankPage }
}));
