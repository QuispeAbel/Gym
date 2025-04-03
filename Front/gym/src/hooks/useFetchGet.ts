import { useEffect, useState } from "react";

type Data<T> = T | null;
type ErrorType = Error | null;

interface Props<T> {
    loading: boolean;
    error: Error | null;
    data: T | null;
}

export const useFetch = <T>(url: string): Props<T> => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<ErrorType>(null);
    const [data, setData] = useState<Data<T>>(null);

    useEffect(() => {
        let controller = new AbortController();
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if(!response.ok){
                    throw new Error("Error en la respuesta del servidor");
                }
                const jsonData: T = await response.json();
                setData(jsonData);
                setLoading(false);
            } catch (err) {
                setError(err as Error);
            }
        }
        
        fetchData();

        return () => {controller.abort()};

    },[url]);
    

    return({loading, error, data});
};