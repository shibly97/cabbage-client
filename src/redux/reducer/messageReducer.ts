export interface MessageState {
    open: boolean;
    message: string;
    type: string;
}

const initialState: MessageState = {
    open:false,
    message:'',
    type:'success'
}

type Action = {type: string, payload: {message : string, type: string}}

const messageReducer = (state: MessageState = initialState, action : Action): MessageState => {
    switch (action.type){
        case ('show'):
            return({
                open:true,
                message:action.payload.message,
                type:action.payload.type
            })
        case ('close'):
            return(
                initialState
            )
        default :
            return state
    }
}

export default messageReducer