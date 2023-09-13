import React, {useEffect, useState, useRef} from "react";
import { useLocation } from 'react-router-dom';

function useInfiniteScroll(getUserTeamMembers, containerRef, isLoading,state,inputValue,filter) {
    const page  = useRef(1);
    const location = useLocation();

    useEffect(() => {
        page.current = 1;
    }, [inputValue,filter,location]);

    useEffect(() => {
        
        const options = {
          root: containerRef.current,
          rootMargin: '0px',
          threshold: 1,
        };
    
        const observer = new IntersectionObserver(handleIntersect, options);

        
    
        if (containerRef.current) {
            const lastItem = containerRef.current.lastChild;
            if (lastItem) {
              observer.observe(lastItem);
            }
        }

        
        return () => {
            if (containerRef.current) {
                const lastItem = containerRef.current.lastChild;
                if (lastItem) {
                observer.unobserve(lastItem);
        }
            }
        };
    }, [containerRef,state]);
    
    
    const handleIntersect = (entries) => {
        const [entry] = entries;
       // console.log(entry.isIntersecting,!isLoading,state?.data?.last_page , page.current,entry.isIntersecting && !isLoading && (state?.data?.last_page > page.current ));
      if (entry.isIntersecting && !isLoading && (state?.data?.last_page > page.current )) {
          page.current = page.current+1;
          getUserTeamMembers(page.current);
      }
    };
    
    

}


export default useInfiniteScroll;