import { useState } from "react";

type Data<T> = T | null;
type ErrorType = Error | null;

interface Props<T> {
    data: Data<T>;
    error: ErrorType;
    loading: boolean;
    fetchData: (url:string, options?: RequestInit) => Promise<void>;
}

export const useFetchPost = <T>(): Props<T> => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<ErrorType>(null);
    const [data, setData] = useState<Data<T>>(null);

    const fetchData = async(url: string, options?:RequestInit) =>{
        setError(null); 
        setLoading(true);
        setData(null);
        try {
            const response = await fetch(url, options);
            const responseData = await response.json(); 

            if (!response.ok) {
                throw new Error(responseData.message || "Error en la respuesta del servidor");
            }

            setData(responseData);

        } catch (err) {
            setError(err as Error);
        }finally {
            setLoading(false);
        }
    }

    return {data, error, loading, fetchData};

}