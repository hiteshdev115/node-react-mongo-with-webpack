import actionTypes from '../constant/constant';
const INITIAL_STATE = {
    userName : 'Hitesh',
    username : '',
    password : '',
    isLoginSuccess : false,
    loginError:'',
    uid:''

}

export default function reducer(state = INITIAL_STATE, action) {
    //console.log(action.payload.loginError);
    console.log(action.payload);
    switch(action.type){
        case actionTypes.CHANGEUSERNAME:
        	return({
        		...state,
        		userName: action.payload
            })
        case actionTypes.DOLOGIN:
            return({
                ...state,
                isLoginSuccess : action.payload.isLoginSuccess,
                loginError: action.payload.loginError,
                //userType: action.payload.result.admin,
                uid: action.payload.result._id
            })
        default:
            return state
    }

}