import React from 'react';
import {Avatar, Button, Cell, Group, Panel, PanelHeader, View} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: ''
    };

    this.copyToClipboard = this.copyToClipboard.bind(this);
  }

  componentDidMount() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", process.env.PUBLIC_URL + "/logo.jpg");
    xhr.responseType = "blob";
    xhr.onload = function() {
      let urlCreator = window.URL || window.webkitURL;
      let imageUrl = urlCreator.createObjectURL(xhr.response);
      this.setState({url: imageUrl});
    }.bind(this);
    xhr.send(null);
  }

  copyToClipboard(text) {
    const el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  render() {
    return (
      <View id='main' activePanel='mainPanel'>
        <Panel id='mainPanel'>
          <PanelHeader>Example</PanelHeader>
          <Group>
            <Cell
              description="BLOB"
							multiline={true}
              before={<Avatar src={this.state.url} size={80}/>}
              bottomContent={<Button onClick={() => {this.copyToClipboard(this.state.url)}}>Скопировать</Button>}
              size="l"
            >
              {this.state.url}
            </Cell>
          </Group>
        </Panel>
      </View>
    );
  }
}

export default App;
