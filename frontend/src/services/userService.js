import axios from 'axios'

const EMPLOYEE_BASE_REST_API_URL = 'http://localhost:8080/api/registeration/';

// This is an example For later production use 

class userService{

    getAllUsers(){
        return axios.get(EMPLOYEE_BASE_REST_API_URL)
    }

    createUser(user){
        return axios.post(EMPLOYEE_BASE_REST_API_URL, user)
    }

    getUserById(employeeId){
        return axios.get(EMPLOYEE_BASE_REST_API_URL + '/' + employeeId);
    }

    updateUser(employeeId, employee){
        return axios.put(EMPLOYEE_BASE_REST_API_URL + '/' +employeeId, employee);
    }

}

export default new userService();