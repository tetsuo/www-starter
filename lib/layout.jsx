import React from 'react'
import handleLink from './handle-link'
import style from './style'
import Tabs from 'material-ui/lib/tabs/tabs'
import Tab from 'material-ui/lib/tabs/tab'
import ListIcon from 'material-ui/lib/svg-icons/action/list'
import SettingsIcon from 'material-ui/lib/svg-icons/action/settings'

import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import {orange500} from 'material-ui/lib/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: orange500,
  },
  tabs: {
      backgroundColor:'#325C98',
      textColor: '#fff',
      selectedTextColor: '#fff',
  }
});

const items = [
    {
        href: '/',
        label: 'Home',
        icon: React.createFactory(ListIcon)
    },

    {
        href: '/about',
        label: 'About',
        icon: React.createFactory(SettingsIcon)
    }
]

export default class Layout extends React.Component {

    static contextTypes = {
        bus: React.PropTypes.any
    }

    onchange = (value) => {
        this.setState({ value: value })
        this.context.bus.emit('page', value)
    }

    constructor(props, ctx) {
        super(props, ctx)
        this.state = {
            value: this.props.route
        }
    }

    render() {
        const tabs = items.map((item) => {
            return (
                <Tab selected={true} value={item.href} key={item.href} icon={item.icon()} />
            )
        })
        console.log(muiTheme.palette)
        console.log(muiTheme.tabs)

        return (
            <div>
              <MuiThemeProvider muiTheme={muiTheme}>
                <Tabs value={this.state.value} onChange={this.onchange}>{tabs}</Tabs>
      </MuiThemeProvider>
                <div>{this.props.children}</div>
                {style(require('./layout.scss'))}
            </div>
        )
    }

}
