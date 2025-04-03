import { zodResolver } from '@hookform/resolvers/zod';
import {SubmitHandler, useForm} from 'react-hook-form';
import {z} from "zod";
import { CustomImput } from '../../components';
import { useFetchPost } from '../../hooks';

const schema = z.object({
    nombre : z.string().min(1,"El nombre es obligatorio"),
    email : z.string().email("correo invalido").min(1,"Correo obligatorio"),
    dni: z.string().regex(/^[0-9]{8}$/, "DNI inválido. 8 dígitos sin letra")

})

type FormValues = z.infer<typeof schema>;

export const SubForm = () =>{
    const {fetchData, error} = useFetchPost<JSON>();
    const url = 'http://gym.test/clienteIns';
    
    const {control, handleSubmit, formState: {errors}} = useForm<FormValues>({
        resolver: zodResolver(schema)
    });

    const onSubmit: SubmitHandler<FormValues> = (data) =>{
        console.log(JSON.stringify(data));
        fetchData(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),})
        {error && console.log(error)}
    }

    return(
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-1">
        <CustomImput name='nombre' control={control} label='Name' type='text' error={errors.nombre}/>
        <CustomImput name='email' control={control} label='Email' type='email' error={errors.email}/>
        <CustomImput name='dni' control={control} label='DNI' type='number' error={errors.dni}/>        
        <button type='submit' className='w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition-colors'>Sucribirme</button>
    </form>);
}