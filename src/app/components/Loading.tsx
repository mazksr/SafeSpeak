import React from 'react';
import "./styles.css"

const Loading = () => {
    return (
        <div className={"w-full flex items-center justify-center mt-20"}>
            <div className="flex flex-row gap-2">
                <div className="w-4 h-4 rounded-full bg-gray-700 animate-bounce [animation-delay:.7s]"></div>
                <div className="w-4 h-4 rounded-full bg-gray-700 animate-bounce [animation-delay:.3s]"></div>
                <div className="w-4 h-4 rounded-full bg-gray-700 animate-bounce [animation-delay:.7s]"></div>
            </div>
        </div>
    );
};

export default Loading;