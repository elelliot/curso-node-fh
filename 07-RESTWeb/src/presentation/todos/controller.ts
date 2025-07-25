import { Request, Response } from "express"

const todos = [
    {
      id: 1,
      text: "Buy Milk",
      createdAt: new Date()
    },
    {
      id: 2,
      text: "Buy Bread",
      createdAt: null
    },
    {
      id: 3,
      text: "Buy Butter",
      createdAt: new Date()
    }
];

// Los controllers son los que manejan la logica de la aplicacion
export class TodosController {

    
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
}