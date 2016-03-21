import React from 'react'

export default class About extends React.Component {
    componentDidMount() {
        console.log('About mounted')
    }
    componentWillUnmount() {
        console.log('About unmounted')
    }
    render() {
        return <h2>About</h2>
    }
}

