export function Validate(input) {

    const  errors = {}
    if (!input.name) {
      errors.name = "El nombre no puede estar vacío";
    }
    if(!errors.name && !input.text){
      errors.text = "La nota no puede estar vacío";
    }
    if (! errors.name && !errors.text && !input.categoria) {
      errors.categoria = "La categoria no puede estar vacío";
    }
    return errors
  }
  