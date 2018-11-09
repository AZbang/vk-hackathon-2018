import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Panel, PanelHeader} from '@vkontakte/vkui';

class MuseumPanel extends Component {
  render() {
    return (
      <Panel id={this.props.id}>
        <PanelHeader>VinGo.Музей</PanelHeader>
      </Panel>
    )
  }
}

function mapStateToProps(state) {
  return {
    museum: state.data.activeMuseum
  }
}

export default connect(mapStateToProps)(MuseumPanel);
