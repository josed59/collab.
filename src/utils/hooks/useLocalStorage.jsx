import React,{useState} from "react";

export function UseLocalStorage (key, initialValue){

    const storedValue = localStorage.getItem(key);
    const [value, setValue] = useState(storedValue ? JSON.parse(storedValue) : initialValue);

    const saveValue = (newValue) => {
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
      };

    const removeValue = (key) =>{
        console.log("elimina")
        localStorage.removeItem(key);
        setValue(null);
    }

      return [value, saveValue,removeValue,storedValue];

};