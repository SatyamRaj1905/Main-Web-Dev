import {useState} from 'react'
import {usePrev} from './hooks/usePrev'

function App(){
    const [state, setState] = useState(0) // 1
    const prev = usePrev(state) // 4

    return(
        <div>
            <p> {state} </p>
            <button onClick = {() => { // 2
                setState((curr) => curr + 1);

            }}>Click Me</button> 
            <p>The previous value was {prev}</p> // 3
        </div>
    )
}

import {useState, useEffect, useRef} from 'react'

export function usePrev(value) { // 5

    const ref = useRef() // 6

    useEffect(() => {
        ref.current = value; // 8
    },[value])

    return ref.current // 7
}