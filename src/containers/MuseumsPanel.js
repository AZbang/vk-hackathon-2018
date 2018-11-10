import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import {Panel, PanelHeader, HeaderButton, Group, Footer, Spinner, List, Cell, Avatar} from '@vkontakte/vkui';
import Icon24FavoriteOutline from '@vkontakte/icons/dist/24/favorite_outline';
import * as data from '../store/actions';

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
      let it = this.props.museums[key];
      list.push(
        <Cell key={key}
            className={it.disable ? 'disable' : 'enable'}
            onClick={() => this.openMuseum(key)}
            before={<Avatar type="image" src={data.getMuseumImg(it.image)} />}
            description="Sanya hui sosi">
          {it.name}
        </Cell>
      );
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
        {this.props.loading && (<div style={{height: 100}}><Spinner/></div>)}
        <Group>
          <List>
            {museumsList}
          </List>
        </Group>
        <Footer>Доступно {museumsList.length} музея</Footer>
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
