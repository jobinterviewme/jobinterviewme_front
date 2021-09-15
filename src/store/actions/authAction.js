

export const loadData = (values) => async (dispatch) => {
    dispatch({
        type: 'loading'
    });
    try {
        dispatch({
            type: 'data',
            dataT: values
        })
    } catch (e) {
        dispatch({
            type: 'error',
            dataT: "Error",
        });
    }

};
export const CookiesOn = () => async (dispatch) => {
    dispatch({
        type: 'cookiesOn'
    });
};
export const CookiesOff = () => async (dispatch) => {
    dispatch({
        type: 'cookiesOff'
    });
};
export const logOut = () => async (dispatch) => {
    dispatch({
        type: 'logout'
    });
};
export const initGlobalData = () => async (dispatch) => {
    dispatch({
        type: 'initGlobal'
    });
};
export const setIdleTimerOut = (value) => async (dispatch) => {
    dispatch({
        type: 'setIdle',
        data: value,
    });
};
export const setUsuarioValues = (value) => async (dispatch) => {
    dispatch({
        type: 'setUsuarioValues',
        data: value,
    });
};
export const setUsuario = (value) => async (dispatch) => {
    dispatch({
        type: 'setUsuario',
        data: value,
    });
};
export const resetIdleTimerOut = () => async (dispatch) => {
    dispatch({
        type: 'setIdle',
        data: (1000 * 20 * 60),
    });
};