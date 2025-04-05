import { Control, Controller, FieldError } from "react-hook-form";

interface Props {
    name: string;
    control: Control<any>;
    label: string;
    type?: string;
    error?: FieldError;
}

export const CustomImput = ({name, control, label, type, error}: Props) => {

    return (
    <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
        <Controller 
            name={name} 
            control={control} 
            render={({field}) => <input id={name} type={type} {...field} className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${ error ? "tail2" : ""}`}/>}/>
        {error && <p className="text-sm font-small text-red-700 dark:text-red-300 mb-1">{error.message}</p>}
    </div>
    )
}