import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import {Root, View} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import * as model from '../model';
import * as data from '../store/actions';

import MuseumsPanel from './MuseumsPanel';
import MuseumPanel from './MuseumPanel';
import PlaygroundPanel from './PlaygroundPanel';
import AchievesPanel from './AchievesPanel';
import StoryPanel from './StoryPanel';

class App extends Component {
  constructor(props) {
    super(props);

    this.props.dispatch(push('/museums'));

    this.props.dispatch(data.setLoading(true));
    model.load().then(() => {
      this.props.dispatch(data.getMuseums());
      this.props.dispatch(data.getRooms());
      this.props.dispatch(data.getItems());
    });
  }

  routes = {
    museums: 'museumsPanel',
    museum: 'museumPanel',
    rooms: 'roomsPanel',
    playground: 'playgroundPanel',
    achieves: 'achievesPanel',
    story: 'storyPanel',
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
          <PlaygroundPanel id="playgroundPanel"/>
          <AchievesPanel id="achievesPanel"/>
          <StoryPanel id="storyPanel"/>
        </View>
      </Root>
    );
  }
}

function mapStateToProps(state) {
  return {
  }
}

export default connect(mapStateToProps)(App);
