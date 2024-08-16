export function decodedToken(token){
    try {
       if (!token || token.split('.').length !== 3){
        
        return new Error('Invalid JWT token')
        };

        const base64Url = token.split('.')[1]

        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')

        function decodeBase64(base64) {
            // Dekodowanie Base64 do ciągu znaków
            const decodedString = atob(base64);
            
            // Dekodowanie ciągu znaków jako UTF-8
            return JSON.parse(decodeURIComponent(decodedString));
            
        }

        return decodeBase64(base64); 
    } catch (err){
        console.error(err)
    }
    
}