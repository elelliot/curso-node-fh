import { Request, Response } from "express"

const todos = [
    {
      id: 1,
      text: "Buy Milk",
      completedAt: new Date()
    },
    {
      id: 2,
      text: "Buy Bread",
      completedAt: null
    },
    {
      id: 3,
      text: "Buy Butter",
      completedAt: new Date()
    }
];

// Los controllers son los que manejan la logica de la aplicacion
export class TodosController {

  constructor(){}
    
    // Creamos el metodo para obtener los todos , importamos Request y Response de express
    public getTodos = (req: Request, res: Response) => {
        return res.json(todos);
    }

    public getTodoById = (req: Request, res: Response) => {
        // Recibimos el id por medio de los 'params' del request
        // El problema es que el id es `string` y no `number` como nuestros id's en el array por tanto debemos convertirlo
        const id = +req.params.id; //* Convertimos el id a number con el `+` aunque me gusta mas --->  Number(req.params.id)

        //Si resulta que el id no es valido, podemos devolver un status 400 (Bad Request) antes de buscar el todo
        if (isNaN(id)) return res.status(400).json({error: `ID Argument is not a number`});
        
        const todo = todos.find(todo => todo.id ===id);

        // No podemos hacer lo de abajo por que aunque no encuentre el todo, nos devolvera un `undefined` con status `200`
        // return res.json(todo);

        // Por tanto debemos tambien verificar eso y devolver el status/error correcto
        // Devolvemos status 404 (Not Found) y un mensaje de error con .json()
        ( todo ) ? res.json(todo) : res.status(404).json({error: `Todo with id ${id} not found`});
    }

    public createTodo = (req: Request, res: Response) => {
      //Obtenemos el body del request (hay varios tipos de body, json, form-data, etc.)
      const { text } = req.body; //Desestructuramos el body para obtener el text y lo que queramos
      //Validamos el body para que tenga los campos necesarios
      if( !text ) return res.status(400).json( { error: "Text is required" } )

      const newTodo = {
        id: todos.length + 1,
        text: text,
        completedAt: null
      } 
      todos.push( newTodo )


      //El body viene undefined por defecto, por que debemos decirle a express como manejar el body de las peticiones POST, PUT, PATCH, etc. (como json, form-data, etc.)
      // Para ello, aplicaremos un middleware de express para manejar el body (Ver server.ts)   
      // res.json( body )

      res.json(newTodo)
    }

    public updateTodo = (req: Request, res: Response) => {
      
      const id = +req.params.id;
      if (isNaN(id)) return res.status( 400 ).json( { error: `ID Argument is not a number` } );
      
      const todo = todos.find(todo => todo.id ===id);
      if ( !todo ) return res.status( 404 ).json( { error: `Todo with id ${id} not found` } );

      const { text, completedAt } = req.body

      //Actualizamos los campos del todo que se manden, OJO: estamos mutando el array original, no es recomendable
      todo.text = text || todo.text; // Actualizamos el texto, si no se manda, se mantiene el texto original

      //Actualizamos el completedAt, si mandamos null, lo ponemos a null, si no se manda, se mantiene el valor original
      ( completedAt  === 'null' ) ? todo.completedAt = null : todo.completedAt = new Date(completedAt || todo.completedAt);
      
      res.json( todo )
    }

    public deleteTodo = (req: Request, res: Response) => {
      const id = +req.params.id;
      if (isNaN(id)) return res.status( 400 ).json( { error: `ID Argument is not a number` } );
      
      const todo = todos.find(todo => todo.id === id); //Elemento a eliminar
      if ( !todo ) return res.status( 404 ).json( { error: `Todo with id ${id} not found` } );

      todos.splice(todos.indexOf(todo), 1); //* Eliminamos el todo del array
      // console.log('Remaining todos: ',todos)
      res.json( todo ); // Devolvemos el elemento eliminado
    }


}