import actionTypes from '../constant/constant';

export function changeState(updatedUserName){
	return dispatch=>{
		//console.log('test');
		dispatch({type:actionTypes.CHANGEUSERNAME, payload:updatedUserName})
	}
	
}