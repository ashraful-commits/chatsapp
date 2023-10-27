import React, { useState } from "react";

const useFormHandle = (states) => {
    const [input,setInput] = useState(states)
    const handleInput = (e)=>{
        setInput((prev)=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }
  return {input,setInput,handleInput}
};

export default useFormHandle;
