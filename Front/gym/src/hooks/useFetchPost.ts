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

        try {
            const response = await fetch(url, options);
            
            if(!response.ok){
                throw new Error("Error en la respuesta del servidor");
            }
            const jsonData: T = await response.json();
            setData(jsonData);

        } catch (err) {
            setError(err as Error);
        }finally {
            setLoading(false);
        }
    }

    return {data, error, loading, fetchData};

}