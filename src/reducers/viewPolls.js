import * as actions from "../constant";

const initial_state = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  data: null,
};

const viewPolls = (state = initial_state, action) => {
  switch (action.type) {
    case actions.VIEW_POLL_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
      };
    case actions.VIEW_POLL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isError: false,
        data: action.payload.response,
      };
    case actions.VIEW_POLL_ERROR:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true,
      };
    default:
      return state;
  }
};
export default viewPolls;
