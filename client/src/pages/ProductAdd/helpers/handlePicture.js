export const handlePicture = (
    event,
    setPictures
) => {
    const { files } = event.target;
    setPictures(prevPictures => [...prevPictures, ...Array.from(files)]);
} 


