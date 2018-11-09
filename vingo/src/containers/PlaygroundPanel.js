import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Panel, PanelHeader} from '@vkontakte/vkui';

class PlaygroundPanel extends Component {
  render() {
    return (
      <Panel id={this.props.id}>
        <PanelHeader>VinGo.Игра</PanelHeader>
      </Panel>
    )
  }
}

function mapStateToProps(state) {
  return {
    items: state.data.activeItems
  }
}

export default connect(mapStateToProps)(PlaygroundPanel);
