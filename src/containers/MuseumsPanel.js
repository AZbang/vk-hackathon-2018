import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import {Panel, PanelHeader, HeaderButton, Group, Footer, Spinner, List} from '@vkontakte/vkui';
import Icon24FavoriteOutline from '@vkontakte/icons/dist/24/favorite_outline';
import * as data from '../store/actions';

import MuseumPreview from '../components/MuseumPreview';

class MuseumsPanel extends Component {
  openMuseum = (id) => {
    this.props.dispatch(data.setMuseum(id))
    this.props.dispatch(push('/museum'));
  }

  openAchiements = () => {
    this.props.dispatch(push('/achieves'));
  }

  getMuseumsList = () => {
    let list = [];
    for(let key in this.props.museums) {
      list.push(<MuseumPreview onClick={() => this.openMuseum(key)} key={key} data={this.props.museums[key]}/>);
    }
    return list;
  }

  render() {
    let museumsList = this.getMuseumsList();
    return (
      <Panel id={this.props.id}>
        <PanelHeader left={<HeaderButton onClick={this.openAchiements}>{<Icon24FavoriteOutline/>}</HeaderButton>}>
          VinGo.Музеи
        </PanelHeader>
        {this.props.loading && (<div style={{height: 500}}><Spinner/></div>)}
        {!this.props.loading && ([
          <Group title="Выберите музей для прогулки:">
            <List style={{paddingBottom: '5px'}}>
              {museumsList}
            </List>
          </Group>,
          <Footer>Доступно {museumsList.length} музея</Footer>
        ])}
      </Panel>
    )
  }
}

function mapStateToProps(state) {
  return {
    loading: state.data.loading,
    museums: state.data.museums
  }
}

export default connect(mapStateToProps)(MuseumsPanel);
