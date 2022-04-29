//@ts-nocheck
import { useCallback } from "react";
const useFocus = () => {
  const onFocus = useCallback((e, setVal) => {
    var { value } = e.currentTarget;
    if(!parseFloat(value)){
      setVal("");
    }
  }, []);
  return { onFocus };
};

export default useFocus;
