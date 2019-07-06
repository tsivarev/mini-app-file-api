import React from 'react';
import {View, Div, Group, Panel, PanelHeader} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Panel id='main'>
        <PanelHeader>Example</PanelHeader>
        <Group title="Navigation Example">
          <Div>Hello</Div>
        </Group>
      </Panel>
    );
  }
}

export default App;
