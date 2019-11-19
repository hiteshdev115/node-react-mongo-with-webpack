
export const loginService = {
    login
    //logout,
    //register
}

function login(username, password){
    //var url = 'http://localhost:3001/api/login';
   
    const { username, password } = this.state;
    axios.post(url, { username, password })
    .then((result) => {  
        if(result.success === false) {
            this.setState({ authError : '' });
            this.setState({ authError : result.msg });
        } else {
            this.setState({ authError : '' });
            var resultObject = JSON.parse(result.data.userData);
            if(resultObject.admin === true){
                localStorage.setItem('admin-jwtToken', result.data.token);
                localStorage.setItem('admin-userdetails', result.data.userData);
                //this.props.history.push('/admin/dashboard');
            } else {
                localStorage.setItem('jwtToken', result.data.token);
                localStorage.setItem('userdetails', result.data.userData);
                //this.props.history.push('/');
            }
            //window.location.reload();
        }
        
    })
    .catch((error) => {
        console.log('===Error=='+error);
        if(error.response.status === 401) {
            this.setState({ message: 'Login failed. Username or password not match' });
        }
    });
}