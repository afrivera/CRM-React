import {Formik, Form, Field} from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Alerta from './Alerta';
import Spinner from './Spinner';

const Formulario = ({ cliente={}, cargando=false}) => {

    const navigate = useNavigate();

    // para usar yup hay que generar un esquema
    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
                    .required('El Nombre del Cliente es Obligatorio')
                    .min(3, 'El Nombre es demasiado corto')
                    .max(20, 'El Nombre es demasiado largo'),
        empresa: Yup.string()
                    .required('El Nombre de la Empresa es Obligatorio'),
        email: Yup.string()
                    .required('El Email es Obligatorio')
                    .email('Email no válido'),
        telefono: Yup.number()
                     .positive('Número no válido')
                     .typeError('Número no válido')
                     .integer('Número no válido')
    })

    const handleSubmit = async valores => {
        let respuesta;
        try {
            if( cliente.id){
                // Editar Registro
                const url = `${import.meta.env.VITE_API_URL}/${ cliente.id}`;
                respuesta = await fetch(url,{
                    method: 'PUT',
                    body: JSON.stringify( valores ),
                    headers:{
                        "Content-Type": "application/json"
                    }
                });
                

                navigate('/');
            }else {
                // Nuevo Registro
                const url = import.meta.env.VITE_API_URL;
                respuesta = await fetch(url,{
                    method: 'POST',
                    body: JSON.stringify( valores ),
                    headers:{
                        "Content-Type": "application/json"
                    }
                });
                
            }
            await respuesta.json();
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        cargando ? <Spinner /> :
        <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
            <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>{ cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}</h1>

            <Formik
                initialValues={{
                    nombre: cliente?.nombre ?? '',
                    empresa: cliente?.empresa ?? '',
                    email: cliente?.email ?? '',
                    telefono: cliente?.telefono ?? '',
                    notas: cliente?.notas ?? ''
                }}
                enableReinitialize={ true }
                onSubmit={ async ( values, { resetForm } )=>{
                    await handleSubmit( values );

                    resetForm();
                }}
                validationSchema={nuevoClienteSchema}
            >
                {({ errors, touched })=>{
                    return (

                
                    <Form className='mt-10'>
                        <div className='mb-4'>
                            <label 
                                htmlFor='nombre'
                                className='text-gray-800'
                            >Nombre:</label>
                            <Field 
                                type='text'
                                id='nombre'
                                className='mt-2 block w-full p-3 bg-gray-50'
                                placeholder='Nombre del Cliente'
                                name='nombre'
                            />
                            {
                                errors.nombre && touched.nombre ?(
                                <Alerta>{errors.nombre}</Alerta>
                                ): null
                            }
                        </div>
                        <div className='mb-4'>
                            <label 
                                htmlFor='empresa'
                                className='text-gray-800'
                            >Empresa:</label>
                            <Field 
                                type='text'
                                id='empresa'
                                className='mt-2 block w-full p-3 bg-gray-50'
                                placeholder='Empresa del Cliente'
                                name='empresa'
                            />
                            {
                                errors.empresa && touched.empresa ?(
                                <Alerta>{errors.empresa}</Alerta>
                                ): null
                            }
                        </div>
                        <div className='mb-4'>
                            <label 
                                htmlFor='email'
                                className='text-gray-800'
                            >E-mail:</label>
                            <Field 
                                type='email'
                                id='email'
                                className='mt-2 block w-full p-3 bg-gray-50'
                                placeholder='Email del Cliente'
                                name='email'
                            />
                            {
                                errors.email && touched.email ?(
                                <Alerta>{errors.email}</Alerta>
                                ): null
                            }
                        </div>
                        <div className='mb-4'>
                            <label 
                                htmlFor='telefono'
                                className='text-gray-800'
                            >Telefono:</label>
                            <Field 
                                type='tel'
                                id='telefono'
                                className='mt-2 block w-full p-3 bg-gray-50'
                                placeholder='Telefono del Cliente'
                                name='telefono'
                            />
                            {
                                errors.telefono && touched.telefono ?(
                                <Alerta>{errors.telefono}</Alerta>
                                ): null
                            }
                        </div>
                        <div className='mb-4'>
                            <label 
                                htmlFor='notas'
                                className='text-gray-800'
                            >Notas:</label>
                            <Field 
                                as='textarea'
                                type='text'
                                id='notas'
                                className='mt-2 block w-full p-3 bg-gray-50 '
                                placeholder='Notas del Cliente'
                                name='notas'
                            />
                        </div>

                        <input
                            type='submit'
                            value={ cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                            className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg'
                        />
                    </Form>
                )}}
            </Formik>

        </div>
    )
}

// definir props por default si no son enviados
// Formulario.defaultProps = {
//     cliente: {}
// }

export default Formulario;