import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {changeState} from '../store/action/action'

class Test1 extends Component {

    constructor(props){
        super(props);
        this.state = {
            userName:''
        }
    }
    _changeData(){
        //console.log('event called');
        this.props.changeUserName(this.state.userName);
        this.setState({
            userName:''
        })
        
    }
    _changeUserInput(event){
        this.setState({
            userName: event.target.value
        })
    }

    render() {
        var style = {
            height:400,
            padding:200
        }
        return (
            <div style={style}>
                <h1>Hello World {this.props.userName}</h1>
                <button onClick={this._changeData.bind(this)}>Change</button>
                <input type='text' value={this.state.userName} onChange={this._changeUserInput.bind(this)} />
                <Link to='/test2'>Go to About</Link>
            </div>
        )
    }
}
function mapStateToProp(state){
    return({
        userName: state.root.userName
    })
}
function mapDispatchToProp(dispatch){
    return({
        changeUserName: (updatedUserName)=>{dispatch(changeState(updatedUserName))}
    })
}
export default connect(mapStateToProp,mapDispatchToProp)(Test1);

