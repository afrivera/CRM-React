import {Formik, Form, Field} from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Alerta from './Alerta';

const Formulario = () => {

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
        try {
            const url = 'http://localhost:4000/clientes';
            const respuesta = await fetch(url,{
                method: 'POST',
                body: JSON.stringify( valores ),
                headers:{
                    "Content-Type": "application/json"
                }
            });
            const resultado = await respuesta.json();
            console.log(resultado);

            navigate('/clientes');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
            <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>Agregar Cliente</h1>

            <Formik
                initialValues={{
                    nombre: '',
                    empresa: '',
                    email: '',
                    telefono: '',
                    notas: ''
                }}
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
                            value='Agregar Cliente'
                            className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg'
                        />
                    </Form>
                )}}
            </Formik>

        </div>
    )
}

export default Formulario;