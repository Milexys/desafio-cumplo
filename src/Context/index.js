import React, { createContext, useState } from 'react'


export const fechaContext = createContext()

const FechaProvider = (props) => {

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    return (
        <fechaContext.Provider value={{
            startDate, 
            setStartDate,
            endDate,
            setEndDate,
        }}>
            {props.children}
        </fechaContext.Provider>
    )
}

export default FechaProvider;