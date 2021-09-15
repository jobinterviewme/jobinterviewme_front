const initState={
    conexionError: false,
};
const proyectReducer=(state = initState, action)=>{
    switch (action.type) {
        case 'initGlobal':
            return {...state, conexionError: false};
        case 'errorConexionServer':
            return {...state, conexionError: true};
        case 'error':
            return {...state,error: action.dataT, loading: false};
        default:
            return state;
    }
};
export default proyectReducer;