export const authReducer = (state, action) => {
    switch(action.type) {
        case "LOGIN":
            return {
                ...state,
                user: action.payload.user,
            }
        case "LOGOUT":
            return {
                ...state,
                user: null,
            }
        default:
            return state
    }
}