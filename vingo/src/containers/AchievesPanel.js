import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Panel, PanelHeader} from '@vkontakte/vkui';

class AchievesPanel extends Component {
  render() {
    return (
      <Panel id={this.props.id}>
        <PanelHeader>VinGo.Достижения</PanelHeader>
      </Panel>
    )
  }
}

function mapStateToProps(state) {
  return {
    achieves: state.data.achieves
  }
}

export default connect(mapStateToProps)(AchievesPanel);
