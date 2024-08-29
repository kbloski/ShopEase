import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


export async function deleteFile( fileUrlPath ){
    const __filename = fileURLToPath( import.meta.url );
    const __dirname = dirname(__filename);
    
    const pathToFile = join(__dirname, '/..', fileUrlPath);
    try {

        await fs.unlink( pathToFile );
        // console.log( 'Delete file')
    } catch (err){
        // console.error( err )
    }
}



