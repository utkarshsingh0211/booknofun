import { createContext, useReducer } from "react"

const INITIAL_STATE = {
    city:'',
    date: [],
    counter: {
        adults: 1,
        childs: 0,
        rooms: 1
    }
}

export const SearchContext = createContext(INITIAL_STATE)

const SearchReducer = (state, action)=>{
    switch(action.type)
    {
        case 'NEW_SEARCH':
            {
            return action.payload
            }
        case 'RESET_SEARCH':
            return INITIAL_STATE
        default:
            return state
    }
}

export const SearchContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE)
    return (
        <SearchContext.Provider value={{
            city: state.city, 
            date: state.date, 
            counter: state.counter, 
            dispatch}}
        >
            {children}
        </SearchContext.Provider>
    )
}