# BurkaWatch Mobile App

## Installation
- `brew install node`
- `brew install watchman`
- `npm install -g react-native-cli`

## Building
### iOS
- `npm install`
- `chmod -R 777 node_modules`
- `react-native run-ios`

## App features:
Mockups: https://marvelapp.com/999ba6j

This app will allow a user to take pictures. Pictures are then uploaded to a backend together with the location and users can view them (all pictures, own and other users's) on a map. There is also a leaderboard that shows a ranking of the user who took the most pictures. Features in detail:

- On app start user registers with phone number and enters validation SMS. (no need to auto-read the SMS)
- User can take geotagged pictures, which are uploaded directly to a S3 bucket and placed on a map.
- Pictures of ALL users can be viewed on a map. Clustered, if too many are in one place.
- On clicking a single marker, a details view with large image, desc and some possible actions like *delete* or *report* opens. Possible actions depend on who "owns" the image. The current user or another user.
- Gallery view. Loads dynamically as user scrolls? Can be used for different views:
	- Recent pictures of all users
	- Recent pictures of single user.
- There is a leaderboard that shows the number of pictures for all users and ranks them.
- Optionally user can change his nickname in the profile. Nothing else can be changed.
- Images are resized to ~800px width on upload. No preview or different versions are generated.

## Add-on project:
- Images are validated by checking them agains a white-list of labels: https://cloud.google.com/vision/ or https://www.clarifai.com/demo 

## Main libraries to use:
- react-native
- map view: https://github.com/airbnb/react-native-maps
- clustering: https://github.com/mapbox/supercluster
https://medium.com/@berkaybeyaz/client-side-marker-clustering-with-react-native-9ef977d30065
https://github.com/istarkov/google-map-clustering-example
https://github.com/davidroman0O/react-native-cluster-example
- nice axios+mobx example: https://github.com/thaerlabs/full-stack-react-mobx/blob/b71e1037f5948590b800b29bcd77ea856cdd30b5/client/src/services/Storage.js
- mobx-persist https://github.com/pinqy520/mobx-persist
- translation library: https://github.com/AlexanderZaytsev/react-native-i18n 
- icon lib: https://oblador.github.io/react-native-vector-icons/
- theme: https://github.com/GeekyAnts/NativeBase
- Redux: https://github.com/reactjs/redux
- React Redux: https://github.com/reactjs/react-redux
- Redux Thnk: https://github.com/gaearon/redux-thunk
- Redux Persist: https://github.com/rt2zz/redux-persist
- React Native Modal Box: https://github.com/maxs15/react-native-modalbox
- React Navigation: https://github.com/react-community/react-navigation
- Redux Form: https://github.com/erikras/redux-form
- Phone Number Input: https://www.npmjs.com/package/react-native-phone-input
- Camera https://github.com/lwansbrough/react-native-camera
- Infinite ListView https://github.com/toandk/react-native-infinite-listview
- Modal Overlay https://www.npmjs.com/package/react-native-modal-overlay
- Checkbox Group https://github.com/ataomega/react-native-checkbox-group
- GeoCoder https://github.com/devfd/react-native-geocoder
- Orientation Locker https://www.npmjs.com/package/react-native-orientation-locker