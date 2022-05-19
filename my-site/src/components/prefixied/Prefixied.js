import React, {useState, flushSync} from "react";


export default function Batching () {
    const [prev, setPrev] = useState(0)
    const [next, setNext] = useState(false)

   function handleClick() {
        setTimeout(() => {
            flushSync(() => {
                setPrev(c => c + 1)
            })
            
            
            flushSync(() => {
                setNext(f => !f)
            })
        }, 100)
    }

    console.log('render')

    return (
        <div>
            <button 
                className="btn__card"
                type="submit"
                onClick={handleClick}>
                Send
            </button>

            <div
            style={{color: next ? 'blue' : 'black'}}>{prev}</div>
        </div>
    );
}