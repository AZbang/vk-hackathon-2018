import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import {Panel, PanelHeader, HeaderButton, Group, Footer, List} from '@vkontakte/vkui';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import AchievePreview from '../components/AchievePreview';

class AchievesPanel extends Component {
  openMuseums = () => {
    this.props.dispatch(push('/museums'));
  }

  getEmpty = () => (
    <Group>
      <div style={{textAlign: 'center', padding: '30px', color: '#7f95b0'}}>
        <span style={{fontSize: '2em'}}>😢💪🔥</span>
        <br/>
        <br/>
        <br/>
        Пока у вас нет открытых достижений, осуществляйте прогулки по музеям и открывайте новые ачивки!
      </div>
    </Group>
  )

  getAchievesList = () => {
    let list = [];
    for(let key in this.props.achiements) {
      if(Math.random() < .5)
        list.push(<AchievePreview key={key} data={this.props.achiements[key]}/>);
    }
    return list;
  }

  render() {
    return (
      <Panel id={this.props.id}>
        <PanelHeader left={<HeaderButton onClick={this.openMuseums}>{<Icon24Back/>}</HeaderButton>}>VinGo.Достижения</PanelHeader>

        <Group title="Ваши достижения:">
          <List style={{paddingBottom: '5px'}}>
            {this.getAchievesList()}
          </List>
        </Group>

        <Group title="Все достижения:" style={{filter: 'grayscale()'}}>
          <List style={{paddingBottom: '5px'}}>
            {this.getAchievesList()}
          </List>
        </Group>

        <Footer>Открыто 0 достижений</Footer>
      </Panel>
    )
  }
}

function mapStateToProps(state) {
  return {
    achiements: state.data.achiements
  }
}

export default connect(mapStateToProps)(AchievesPanel);
