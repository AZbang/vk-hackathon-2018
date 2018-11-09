import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Panel, PanelHeader} from '@vkontakte/vkui';

class MuseumsPanel extends Component {
  render() {
    return (
      <Panel id={this.props.id}>
        <PanelHeader>VinGo.Музеи</PanelHeader>
      </Panel>
    )
  }
}

function mapStateToProps(state) {
  return {
    museums: state.data.museums
  }
}

export default connect(mapStateToProps)(MuseumsPanel);
