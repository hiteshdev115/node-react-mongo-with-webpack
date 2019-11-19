import actionTypes from '../constant/constant';
import axios from 'axios';

export function login(username, password){
    return dispatch => {
        console.log('login action');
        var url = 'http://localhost:3001/api/login';
        axios.post(url, { username, password })
        .then((result) => {  
            console.log(result.success);
            if(result.success === false) {
                let payloadArr = {
                    isLoginSuccess:false,
                    loginError : 'Invalid Username/Password.'
                };
                dispatch({type:actionTypes.LOGINFAIL, payload:payloadArr});
            } else {
                //this.setState({ authError : '' });
                var resultObject = JSON.parse(result.data.userData);
                if(resultObject.admin === true){
                    localStorage.setItem('admin-jwtToken', result.data.token);
                    localStorage.setItem('adminuserid', resultObject._id);
                } else {
                    localStorage.setItem('jwtToken', result.data.token);
                    localStorage.setItem('userid', resultObject._id);
                }

                let payloadArr = {
                    isLoginSuccess:true,
                    loginError : 'Successfully Login',
                    result : resultObject
                };
                dispatch({type:actionTypes.DOLOGIN, payload:payloadArr});

                
                /*if(resultObject.admin === true){
                    localStorage.setItem('admin-jwtToken', result.data.token);
                    localStorage.setItem('admin-userdetails', resultObject._id);
                    //localStorage.setItem('admin-userdetails', result.data.userData);
                    //this.props.history.push('/admin/dashboard');
                } else {
                    localStorage.setItem('jwtToken', result.data.token);
                    localStorage.setItem('userdetails', resultObject._id);
                    //this.props.history.push('/');
                }*/
                //window.location.reload();
            }
            
        });        
    }    
}