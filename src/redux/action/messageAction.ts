export const showMessage = (type: string,message: string) => {
    return({
        type:'show',
        payload:{
            type,
            message
        }
    })
}

export const closeMessage = () => {
    return({
        type:'close',
    })
}