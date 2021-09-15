import proyectReducer from "./proyectReducer";
import authReducer from "./authReducer";
import {combineReducers, createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';

function saveToLocalStorage(store) {
    try {
        //console.log('saveLocalStorage');
        //console.log(store);
        const serializedState = JSON.stringify(store);
        localStorage.setItem('JobInterviewMe', serializedState);
    } catch (e) {
        console.log(e);
    }
}
/*function saveToCookies(user) {
    //console.log("save cookies");
    //console.log(store.getState().auth.cookies);
    //console.log(cookiesAcepted);
    if (store.getState().auth.cookies){
        //console.log("OK");
        Cookies.set('booktopays', user);
    }
    //console.log('saveCookies');
}
function loadFromCookies() {
    try {
        //console.log('loadingCookies');
        const cookiesAccepted = Cookies.get('booktopaysAcceptedCookies');
        //console.log(cookiesAccepted);
        if (cookiesAccepted === 'true'){
            //console.log('loadedCookies');
            const serializedState = Cookies.get('booktopays');
            //console.log(serializedState);
            if(serializedState!==undefined){
                return JSON.parse(serializedState);
            }else{
                return undefined;
            }
        }else{
            //console.log('loadedCookies false');
            return undefined;
        }
    } catch (e) {
        console.log(e);
        return undefined;
    }
}*/
function loadFromLocalStorage() {
    try {
        //console.log('loadLocalStorage');
        const serializedState = localStorage.getItem('JobInterviewMe');
        //console.log(serializedState);
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (e) {
        console.log(e);
        return undefined;
    }
}

const persitedState = loadFromLocalStorage();

const rootReducer = combineReducers({
    auth: authReducer,
    proyect: proyectReducer,
});
const store = createStore(rootReducer, persitedState, applyMiddleware(reduxThunk));

/*Actualiza el localstorage cada ves que se modifica el store*/
store.subscribe(() => saveToLocalStorage(store.getState()));
export default store;
