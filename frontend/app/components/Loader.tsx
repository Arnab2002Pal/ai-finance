import React from 'react'
import PulseLoader from "react-spinners/PulseLoader";

const Loading = () => {
    
    return (
        <div>
            <PulseLoader
                color="#00d36b"
                margin={5}
                size={10}
                speedMultiplier={1}
            />
        </div>
    )
}

export default Loading
