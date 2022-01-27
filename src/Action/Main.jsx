import * as ActionType from './Type'

export const setUser = (user) => {
    return{
       type: ActionType.SET_USER,
       payload:{
           currentUser: user
       }
    }
}

export const clearUser = ()=>{
    return{
        type: ActionType.CLEAR_USER
    }
}

export const setcurrentgroup = (group)=>{
    return{
        type: ActionType.SET_CURRENT_GROUP,
        payload:{
            currentgroup: group
        }
    }
}
