
// Los DTOs (Data Transfer Object) son basicamente un objeto hecho para transferir informacion
// Representan la estructura que debemos respetar cuando enviamos informacion.
export class CreateTodoDto {
    
    // Solo se puede llamar internamente en la clase
    private constructor(
        public readonly text: string,
    ){}

    // props simiula el objeto que recibimos en el body (Nos evitamos bajar librerias como express validator ya que en realidad no hay mucha validacion que hacer y con esta bastaria)
    // el string es para errores y tambien devolvemos el dto
    static create(props: {[key:string]: any}): [string?, CreateTodoDto?] {
        const { text } = props

        if( !text ) return ['Text property is required', undefined];

        return [undefined, new CreateTodoDto(text)]
    }
}