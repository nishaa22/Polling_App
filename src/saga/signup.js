
import axios from "axios"

export default function* signup(action){
        const {username, password, role} = action.payload;
        let response = yield call(
            axios.get,`https://secure-refuge-14993.herokuapp.com/add_user?username=${username}&password=${password}&role=${role}`
        );
    try
    {
        if(response && response.data)
        
    }
    catch(error){

    }
}