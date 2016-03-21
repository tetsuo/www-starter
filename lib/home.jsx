import React from 'react'

import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import {deepOrange500} from 'material-ui/lib/styles/colors';
import FlatButton from 'material-ui/lib/flat-button';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';


import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ActionInfo from 'material-ui/lib/svg-icons/action/info';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import FileFolder from 'material-ui/lib/svg-icons/file/folder';
import ActionAssignment from 'material-ui/lib/svg-icons/action/assignment';
import Colors from 'material-ui/lib/styles/colors';
import {blue500, yellow600, greenA700, red500} from 'material-ui/lib/styles/colors';
import EditorInsertChart from 'material-ui/lib/svg-icons/editor/insert-chart';

import DoneIcon from 'material-ui/lib/svg-icons/action/done'
import ClearIcon from 'material-ui/lib/svg-icons/content/clear'
import SortIcon from 'material-ui/lib/svg-icons/content/sort'

import AppBar from 'material-ui/lib/app-bar'


const styles = {
  container: {
    //textAlign: 'center',
    //paddingTop: 200,
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});



class Main extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);

    this.state = {
      open: false,
    };
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  handleTouchTap() {
    this.setState({
      open: true,
    });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>

    <List subheader="Containers">
      <ListItem
        leftAvatar={<Avatar icon={<DoneIcon />} backgroundColor={greenA700} />}
        rightIcon={<ActionInfo />}
        primaryText="Photos"
        secondaryText="Jan 9, 2014"
      />
      <ListItem
        leftAvatar={<Avatar icon={<ClearIcon />} backgroundColor={red500}/>}
        rightIcon={<ActionInfo />}
        primaryText="Recipes"
        secondaryText="Jan 17, 2014"
      />
      <ListItem
        leftAvatar={<Avatar icon={<SortIcon />} backgroundColor={yellow600}/>}
        rightIcon={<ActionInfo />}
        primaryText="Work"
        secondaryText="Jan 28, 2014"
      />
    </List>
    <Divider inset={true} />
        </div>
      </MuiThemeProvider>
    );
  }
}


export default class Home extends React.Component {
    render() {
        return <div>
<Main />
        </div>
    }
}

