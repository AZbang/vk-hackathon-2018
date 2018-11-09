import React, {Component} from 'react';
import {connect} from 'react-redux';

import {ConfigProvider, Root, View} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import * as data from '../store/actions';

import MuseumsPanel from './MuseumsPanel';
import MuseumPanel from './MuseumPanel';
import RoomPanel from './RoomPanel';
import PlaygroundPanel from './PlaygroundPanel';
import StoryPanel from './StoryPanel';
import AchievesPanel from './achievesPanel';

class App extends Component {
  constructor(props) {
    super(props);

    this.props.dispatch(data.getMuseums());
    this.props.dispatch(data.getRooms());
    this.props.dispatch(data.getFloors());
  }

  routes = {
    museums: 'museumsPanel',
    museum: 'museumPanel',
    rooms: 'roomsPanel',
    playground: 'playgroundPanel',
    story: 'storyPanel',
    achieves: 'achievesPanel',
    default: 'museumsPanel'
  }

  getActivePanel = () =>
    this.routes[this.props.pageId] || this.routes.default;

  render() {
    return (
      <Root activeView="mainView">
        <View id="mainView" activePanel={this.getActivePanel()}>
          <MuseumsPanel id="museumsPanel"/>
          <MuseumPanel id="museumPanel"/>
          <RoomPanel id="roomsPanel"/>
          <PlaygroundPanel id="playgroundPanel"/>
          <StoryPanel id="storyPanel"/>
          <AchievesPanel id="achievesPanel"/>
        </View>
      </Root>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.data.loading
  }
}

export default connect(mapStateToProps)(App);
