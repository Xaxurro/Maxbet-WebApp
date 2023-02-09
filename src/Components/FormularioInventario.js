import { Formik, Form} from 'formik' // useFormik es un hook
import TextInput from "./TextInput"
import Select from "./Select"
import styled from 'styled-components'


const ContenedorForm = styled.div`    
    margin: 2% 2% 0 2%;    
`


const validate = (values) => {
  // Agregar cualquier tipo de validacion, muy largo, muy corto,
  // tipo de input, regex, etc. lo que sea
  const errors = {}

  if (!values.marca) {
    errors.marca = 'Requerido'
  } else if (values.marca.length < 3) {
    errors.marca = "El nombre de la marca es muy corto"
  }

  if (!values.modelo) {
    errors.modelo = 'Requerido'
  } else if (values.modelo.length < 5) {
    errors.modelo = "El nombre del modelo es muy corto"
  }
  
  if (!values.estado) {
    errors.estado = 'Requerido'}
  

  return errors
}

function FormInventario() {
  return (
    <Formik
      initialValues={ { marca: '', modelo: '', estado: '', origen:'', nSerie:'', pronostico:'', fechaFabricacion:'', problemas:''}}
      validate={validate}
      onSubmit={(values)=>{console.log(values)}}> 
      <Form> 
      <ContenedorForm>
        <TextInput name="nSerie" label= "Numero de Serie"/>
        <br />                
        <TextInput name="marca" label= "Marca"/>
        <br />
        <TextInput name="modelo" label= "Modelo"/>
        <br />
        <Select name ='estado' label='Estado'>
            <option value=''>Seleccione un estado</option>
            <option value='nuevo'>Nuevo</option>
            <option value='usado'>Usado</option>
            <option value='defectuoso'>Defectuoso</option>
        </Select>
        <br />                
        <TextInput name="origen" label= "Origen"/>
        <br />                
        {/*<TextInput name="fechaIngreso" label= "Fecha de ingreso"/>*/}
        <br />                
        {/*<TextInput name="foto" label= "Foto"/>*/}
        <br />                
        <TextInput name="pronostico" label= "Pronostico"/>
        <br />            
        <TextInput name="fechaFabricacion" label= "Fecha de fabricacion"/>
        <br />                    
        <TextInput name="problemas" label= "Problemas"/>
        <br />                                
        
        </ContenedorForm>
      </Form>      
    </Formik>
  )
}

export default FormInventario;
