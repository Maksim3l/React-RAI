import { useState, useEffect } from 'react';
import Photo from './Photo';

function Photos(){
    const [photos, setPhotos] = useState([]);
    
    useEffect(function(){
        const getPhotos = async function(){
            const res = await fetch("http://localhost:3001/photos");
            const data = await res.json();
            setPhotos(data);
        }
        getPhotos();
    }, []);
    
    return (
        <div className="container mx-auto px-4 max-w-5xl">
          <h3 className="mb-3 text-xl font-semibold">Photos:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {photos.map(photo => (
              <Photo photo={photo} key={photo._id}></Photo>
            ))}
          </div>
        </div>
    );
}

export default Photos;