import { useEffect, useState } from 'react'
import Cliente from '../components/Cliente';
import Spinner from '../components/Spinner';

const Inicio = () => {

  // state
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true)
  
  useEffect(()=>{
    
    const obtenerClientesApi = async ()=>{
      try {
        const url = 'http://localhost:4000/clientes';
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
  
        setClientes(resultado);
      } catch (error) {
        console.log(error);
      }
      setCargando(false)
    }
    obtenerClientesApi();
  },[]);

  const handleEliminar= async id =>{
    const confirmar = confirm('¿Deseas eliminar este cliente?')

    if( confirmar ){
      try {
        const url = `http://localhost:4000/clientes/${ id }`;
        const respuesta = await fetch( url, {
          method: 'DELETE'
        });
        await respuesta.json();
        const arrClientes = clientes.filter(cliente => cliente.id !== id);
        
        setClientes( arrClientes);

      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    
    cargando ? <Spinner /> :      
    
    <>
      <h1 className='font-black text-4xl text-blue-900'>Clientes</h1>
      <p className='mt-3'>Administra tus Clientes</p>

      {(clientes.length === 0) ? <Spinner /> :
      <table className='w-full mt-5 table-auto shadow bg-white'>
        <thead>
          <tr className='bg-blue-800 text-white'>
            <th className='p-2'>Nombre</th>
            <th className='p-2'>Contacto</th>
            <th className='p-2'>Empresa</th>
            <th className='p-2'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            clientes.map(cliente=>(
              <Cliente
                key={cliente.id}
                cliente={ cliente }
                handleEliminar={ handleEliminar }
              />
            ))
          }

        </tbody>
      </table>}
    </>
  )
}

export default Inicio