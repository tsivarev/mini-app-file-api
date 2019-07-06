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
    let textarea;
    let result;

    try {
      textarea = document.createElement('textarea');
      textarea.setAttribute('readonly', true);
      textarea.setAttribute('contenteditable', true);
      textarea.style.position = 'fixed'; // prevent scroll from jumping to the bottom when focus is set.
      textarea.value = text;

      document.body.appendChild(textarea);

      textarea.focus();
      textarea.select();

      const range = document.createRange();
      range.selectNodeContents(textarea);

      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);

      textarea.setSelectionRange(0, textarea.value.length);
      result = document.execCommand('copy');
    } catch (err) {
      console.error(err);
      result = null;
    } finally {
      document.body.removeChild(textarea);
    }

    // manual copy fallback using prompt
    if (!result) {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const copyHotkey = isMac ? '⌘C' : 'CTRL+C';
      result = prompt(`Press ${copyHotkey}`, text); // eslint-disable-line no-alert
      if (!result) {
        return false;
      }
    }
    return true;
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
