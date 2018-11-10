import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import {Panel, HeaderButton, PanelHeader, Footer, Group} from '@vkontakte/vkui';
import Icon24Back from '@vkontakte/icons/dist/24/back';

class AchievesPanel extends Component {
  openMuseums = () => {
    this.props.dispatch(push('/museums'));
  }

  render() {
    return (
      <Panel id={this.props.id}>
        <PanelHeader left={<HeaderButton onClick={this.openMuseums}>{<Icon24Back/>}</HeaderButton>}>VinGo.Достижения</PanelHeader>
        <Group>
          <div style={{textAlign: 'center', padding: '30px', color: '#7f95b0'}}>
            <span style={{fontSize: '2em'}}>😢💪🔥</span>
            <br/>
            <br/>
            <br/>
            Пока у вас нет открытых достижений, осуществляйте прогулки по музеям и открывайте новые ачивки!
          </div>
        </Group>
        <Footer>Открыто 0 достижений</Footer>
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
