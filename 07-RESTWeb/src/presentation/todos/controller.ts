import { Request, Response } from "express"
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

export class TodosController {

  constructor(){}

    public getTodos = async (req: Request, res: Response) => {
      const todos = await prisma.todo.findMany();
      return res.json(todos);
    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id;

        if (isNaN(id)) return res.status(400).json({error: `ID Argument is not a number`});
        
        const todo = await prisma.todo.findUnique({
          where: { id }
        });

        ( todo ) ? res.json( todo ) : res.status(404).json({error: `Todo with id ${id} not found`});
    }

    public createTodo = async (req: Request, res: Response) => {
      
      const [error, createTodoDto] = CreateTodoDto.create(req.body);  
      if(error) return res.status(400).json({ error })

      //Creamos el `todo` en la database (Prisma)
      const todo = await prisma.todo.create({
        data: createTodoDto! //Aqui asumimos que siempre habra Dto si no hay error, de lo contrario tambien marcaria undefined en el linter
      })

      res.json( todo )
    }

    public updateTodo = async (req: Request, res: Response) => {
      
      const id = +req.params.id;
      const [ error, updateTodoDto ] = UpdateTodoDto.create({ id, ...req.body });
      if ( error ) return res.status(400).json({ error })


      const todo = await prisma.todo.findUnique({
        where: { id }
      });

      if ( !todo ) return res.status( 404 ).json( { error: `Todo with id ${id} not found` } );
      
      const updatedTodo = await prisma.todo.update({
        where: { id },
        data: updateTodoDto!.values
      })
      
      res.json( updatedTodo )
    }

    public deleteTodo = async (req: Request, res: Response) => {
      const id = +req.params.id;
      if (isNaN(id)) return res.status( 400 ).json( { error: `ID Argument is not a number` } );

      const todo = await prisma.todo.findUnique({
        where: { id }
      })

      if ( !todo ) return res.status( 404 ).json( { error: `Todo with id ${id} not found Papito` } );

      const deleted = await prisma.todo.delete({
        where: { id }
      });

      // Al querer borrar algo que no existe , no deberia llegar aqui, topa el `404`, quizas el findUnique pueda pasar pero el deleted no y ahi quiza se cumpla el `400` pero no creo tbf, ahi quiza fallo el profe
      ( deleted ) 
        ? res.json( deleted ) 
        : res.status( 400 ).json( { error: `Todo with id ${id} not found Perrona` } );
    }

}