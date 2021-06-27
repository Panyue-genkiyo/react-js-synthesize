import {INCREAMENT,DESCREMENT} from '../constant';

const initialState = 0;

export const countReducer = (preState = initialState,action) => {
    switch (action.type){
        case INCREAMENT:
            return ++ preState;
        case DESCREMENT:
            return -- preState;
        default:
            return preState;
    }
}
