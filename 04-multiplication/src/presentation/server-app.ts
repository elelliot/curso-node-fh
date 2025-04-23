import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

interface RunOptions {
    base: number;
    limit: number;
    showTable: boolean;
    fileName: string;
    fileDestination: string;
}

//de nuevo, probamos con npx ts-node src/app.ts --base 10 etc. 
export class ServerApp {
    //Esta clase de server app sirve como punto de entrada para la app

    //static so we don't need to instantiate the class
    static run({base, limit, showTable, fileName, fileDestination}: RunOptions) {
        console.log('Server running...');

        //Llamamos nuestros casos de uso (Clean Architecture)
        const table = new CreateTable().execute({ base, limit });
        const wasCreated = new SaveFile().execute({ fileContent: table, fileName, fileDestination}); //fileDestination: `outputs/table-${base}`


        if(showTable) console.log(table);

        ( wasCreated ) ? console.log('File Created') : console.error('File not Created');
    }
}