import React, {useState, useEffect, useRef} from 'react'

function App(){
    return (
        <div>
            <Counter/>
        </div>
    )
}
function Counter(){
    const [count, setCount] = useState(0)
    return(
        <>
            <CurrentCount count = {count} />
            <Increase setCount = {setCount}/>
            <Decrease setCount = {setCount}/>
        </>
    )
}
function CurrentCount({count}){
    return( 
        <>
            {count}
        </>
    )
}
function Increase({setCount}){
    function increaseHandler(){
        setCount((c) => c + 1);
    }
    return (
        <>
            <button onClick={increaseHandler}>Increase</button>
        </>
    )    
}
function Decrease({setCount}){
    function decreaseHandler(){
        setCount((c) => c - 1);
    }
    return (
        <>
            <button onClick={decreaseHandler}>Decrease</button>
        </>
    )   
}

export default App