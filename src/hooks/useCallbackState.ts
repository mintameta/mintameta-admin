//@ts-nocheck
import {useEffect, useState, useRef} from "react";
 
 
function useCallbackState (initData) {
    const cbRef = useRef();
    const [data, setData] = useState(initData);
 
    useEffect(() => {
        cbRef.current && cbRef.current(data);
    }, [data]);
 
    return [data, function (newData, callback) {
        cbRef.current = callback;
        setData(newData);
    }];
}
 

export default useCallbackState;
