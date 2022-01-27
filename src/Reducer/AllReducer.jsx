import { combineReducers } from 'redux'
import * as ActionType from '../Action/Type'

const insialState = {
    currentUser: null,
    Loading: true
}

const user_reducers = (state = insialState,action)=>{
    switch(action.type){
        case ActionType.SET_USER:
            return{
                currentUser: action.payload.currentUser,
                Loading: false
            }
        case ActionType.CLEAR_USER:
            return{
                ...insialState
            }
        default: return state
    }
}

const insialStateGroup = {
    currentgroup: null,
    currentGroupId: null
}

const group_reducers = (state = insialStateGroup,action)=>{
    switch(action.type){
        case ActionType.SET_CURRENT_GROUP:
            return{
                ...state,
                currentgroup: action.payload.currentgroup,
                currentGroupId: action.payload.currentgroup.id
            }
        default: return state
    }
}

const rootReducer = combineReducers({
    user: user_reducers,
    group:  group_reducers
})


export default rootReducer