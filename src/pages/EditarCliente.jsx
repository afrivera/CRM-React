import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Formulario from '../components/Formulario';

const EditarCliente = () => {

  // state para el cliente
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);

  // leer el id en el que nos encontramos
  const { id } = useParams();

  useEffect(() => {
    const obtenerClienteApi = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }
      setCargando(false);
    };
    obtenerClienteApi();
  }, [setCargando]);
  
  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
      <p className='mt-3'>Utiliza este formulario para editar datos de un Cliente </p>

      {
        cliente?.nombre ?
        (<Formulario 
          cliente ={ cliente }
          cargando ={cargando }
        />): <p>Cliente ID no válido</p>

      }
    </>
  )
}

export default EditarCliente;