import * as actions from "../constant"

const initial_state = {
    isLoading : false,
    isSuccess : false,
    isError : false,
    data:null,
    message:null
}

const signup = (state=initial_state,  action) =>{
    // console.log(action.payload.response,"reducer signup$$$$$$$$$$$")
    switch(action.type){
        case actions.SIGN_UP_REQUEST:
            return {
                ...state,
                isLoading:true,
                isSuccess:false,
                isError:false
            };
        case actions.SIGN_UP_SUCCESS:
            return {
                isLoading:false,
                isSuccess:true,
                isError:false,
                data:action.payload.response
            };
        case actions.SIGN_UP_ERROR:
            return{
                isLoading:false,
                isSuccess:false,
                isError:true,
            }
            
        default :
            return state
    }
    
}
export default signup;