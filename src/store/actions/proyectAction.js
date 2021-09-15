

export const errorConexionServer=()=> async (dispatch )=>{
    dispatch({
        type:'errorConexionServer'
    });
};
export const initProyectGlovalData=()=> async (dispatch )=>{
    dispatch({
        type:'initGlobal'
    });
};