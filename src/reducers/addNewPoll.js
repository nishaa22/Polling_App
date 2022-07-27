import * as actions from "../constant";

const initial_state = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  data: null,
//   message: null,
};

const login = (state = initial_state, action) => {
  switch (action.type) {
    case actions.ADD_NEW_POLL_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
      };
    case actions.ADD_NEW_POLL_SUCCESS:
      return {
        isLoading: false,
        isSuccess: true,
        isError: false,
        data: action.payload.response,
      };
    case actions.ADD_NEW_POLL_ERROR:
      return {
        isLoading: false,
        isSuccess: false,
        isError: true,
     //    message: action.payload.message,
      };
    default:
      return state;
  }
};
export default login;
