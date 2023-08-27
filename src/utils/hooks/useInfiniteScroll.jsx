import React, {useEffect, useState, useRef} from "react";

function useInfiniteScroll(getUserTeamMembers, containerRef, isLoading,state) {
    const page  = useRef(1);

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
      if (entry.isIntersecting && !isLoading && (state?.data?.last_page > page.current )) {
          page.current = page.current+1;
          getUserTeamMembers(page.current);
      }
    };
    

}


export default useInfiniteScroll;