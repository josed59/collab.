import React, {useEffect, useState, useRef} from "react";

function useInfiniteScroll(getUserTeamMembers, containerRef, isLoading,state) {
    const page  = useRef(1);

    useEffect(() => {
        const getPaginated = () => {
            if (!isLoading) { // Evitar múltiples solicitudes mientras se está cargando
                const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
                const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 35);

                if (scrollIsBottom &&(state?.data?.last_page > page.current )) {
                    // Lógica para cargar más contenido
                    page.current = page.current+1;
                    getUserTeamMembers(page.current);
                }
            }
        };

        // Agregar el evento de scroll
        window.addEventListener('scroll', getPaginated);

        // Limpieza del efecto
        return () => {
            window.removeEventListener('scroll', getPaginated);
        };
    }, [getUserTeamMembers, isLoading]);

}


export default useInfiniteScroll;