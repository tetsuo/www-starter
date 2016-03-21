import React from 'react'
import CircularProgress from 'material-ui/lib/circular-progress'
import style from './style'

export default class Loading extends React.Component {
    render() {
        return (
            <div className='loading'>
                <CircularProgress style={{
                    margin: 0,
                    top: '50%',
                    transform: 'translateY(-50%)'
                }} size={1.5}/>
                {style(require('./loading.scss'))}
            </div>
        )
    }
}
