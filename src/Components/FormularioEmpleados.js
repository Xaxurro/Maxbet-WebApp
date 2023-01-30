import { Formik, Form, Field, ErrorMessage } from 'formik' // useFormik es un hook
import Button from './Button'
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

  if (!values.nombre) {
    errors.nombre = 'Requerido'
  } else if (values.nombre.length < 3) {
    errors.nombre = "El nombre es muy corto"
  }

  if (!values.apellido) {
    errors.apellido = 'Requerido'
  } else if (values.apellido.length < 3) {
    errors.apellido = "El apellido es muy corto"
  }
  
  if (!values.task) {
    errors.task = 'Requerido'
  } else if (values.task.length < 3) {
    errors.task = "El nombre de la tarea es muy corto"
  }

  if (!values.status) {
    errors.status = 'Requerido'
  }
  

  return errors
}

function FormEmpleados() {
  return (
    <Formik
      initialValues={ { nombre: '', apellido: '', task: '', status:''}}
      validate={validate}
      onSubmit={(values)=>{console.log(values)}}> 
      <Form> 
      <ContenedorForm>
        <TextInput name="nombre" label= "Nombre"/>
        <br />
        <TextInput name="apellido" label= "Apellido"/>
        <br />
        <TextInput name="task" label= "Task"/>
        <br />
        <Select name ='status' label='Status'>
            <option value=''>Seleccione un estado</option>
            <option value='working'>Working on it!</option>
            <option value='idle'>Idle</option>
            <option value='unavailable'>On vacations</option>
            <option value='fired'>Fired up!</option>
        </Select>
        <br />                
        
        <Button type='submit'>Enviar</Button>
        <Button type='reset'>Limpiar</Button>
        </ContenedorForm>
      </Form>      
    </Formik>
  )
}

export default FormEmpleados
