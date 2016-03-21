import {EventEmitter} from 'events'
import singlePage from 'single-page'
import wsock from 'websocket-stream'
import RPC from 'multiplex-rpc'
import eos from 'end-of-stream'
import React from 'react'
import {render} from 'react-dom'
import createRouter from './lib/routes'
import Layout from './lib/layout'
import Loading from './lib/loading'
import NotFound from './lib/notfound'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

class Main extends React.Component {

    constructor(props, ctx) {
        super(props, ctx)

        this.router = createRouter()

        this.page = null

        // ctx
        this.bus = new EventEmitter // event bus
        this.sid = Math.random().toString(16).split('.')[1] // session id
        this.plex = null // streaming rpc client

        this.state = {
            href: null,
            route: null,
            params: null,
            splats: null
        }
    }

    page = null

    static childContextTypes = {
        bus: React.PropTypes.any,
        sid: React.PropTypes.string,
        plex: React.PropTypes.any
    }

    getChildContext = () => {
        return {
            bus: this.bus,
            sid: this.sid,
            plex: this.plex
        }
    }

    onpage = (href) => {
        const m = this.router.match(href)

        if (!m) {
            this.page = null

            this.setState({
                href: href,
                route: null,
                params: null,
                splats: null
            })

            return
        }

        this.page = m.fn

        this.setState({
            href: href,
            route: m.route,
            params: m.params,
            splats: m.splats
        })
    }

    componentDidMount() {
        this.bus = new EventEmitter

        // setup page emitter
        this.bus.on('page', singlePage(this.onpage))

        // websocket
        const whref = (location.protocol === 'https:' ? 'wss://' : 'ws://')
            + location.host

        const wss = wsock(whref)

        // multiplex-rpc
        const rpc = RPC()

        // rpc client
        const methods = [ 'echo', 'hello' ] // XXX: take these from a common file

        this.plex = rpc.wrap(methods)

        // duplex rpcs
        wss.pipe(rpc).pipe(wss)

        // destroy multiplex-rpc as well when ws stream ends
        eos(wss, function (err) {
            if (err) console.error(err)
            rpc.destroy()
        })

        this.plex.echo(this.sid, (err, s) => {
            if (err) throw err // XXX: graceful
            if (s !== this.sid) throw new Error('wtf')
            this.bus.emit('page', location.pathname + (location.search || ''))
        })
    }

    render() {
        if (this.state.href === null && this.state.route === null)
            return <Loading />

        if (!this.page)
            return <Layout><NotFound /></Layout>

        return (
            <Layout route={this.state.route}>
            {
                this.page({
                    href: this.state.href,
                    route: this.state.route,
                    params: this.state.params,
                    splats: this.state.splats,
                    key: 'page'
                })
            }
            </Layout>
        )
    }
}

render(<Main />, document.getElementById('content'))
