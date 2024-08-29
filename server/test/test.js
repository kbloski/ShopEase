import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Uzyskanie pełnej ścieżki do katalogu roboczego
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ścieżka do pliku, używając path.join do połączenia katalogu z plikiem
const filePath = join(__dirname, '../uploads/products_data/img/1724921035273.png');

// Usuwanie pliku
try {
    await fs.unlink(filePath);
    console.log('File successfully removed');
} catch (err) {
    console.error(`Error removing file: ${err.message}`);
}
