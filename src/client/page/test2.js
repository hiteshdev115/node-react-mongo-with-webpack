import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {changeState} from '../store/action/action'

class Test2 extends Component {
    render() {
        var style = {
            height:400,
            padding:200
        }
        return (
            
            <div style={style}>
                <h1>Hello About {this.props.userName}</h1>
                <Link to='/test1'>Go to Test1 Page</Link>
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
export default connect(mapStateToProp,mapDispatchToProp)(Test2);
