/*
Domain es donde tenemos las reglas que rigen otras capas exteriores.

Use cases: es que cada uno haga una tarea en particular (Separar las responsabilidades)
*/

export interface CreateTableUseCase {
    execute: (options: CreateTableOptions) => string;
}

export interface CreateTableOptions {
    base: number;
    limit?: number;
}

// 'implements' means the same as an interface, but with a class
export class CreateTable implements CreateTableUseCase {
    constructor(
        /**
         * DI - Dependency Injection 
         */
    ){}


    //solo es una convencion de nombres, no es necesario que se llame execute
    execute({ base, limit = 10 }: CreateTableOptions){
        let outputMessage = '';
        
        for (let i = 1; i <= limit; i++) {
            outputMessage += `${base} x ${i} = ${base * i}\n`; 
        }

        return outputMessage;
    }
}