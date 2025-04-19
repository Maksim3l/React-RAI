import { useContext, useState } from 'react'
import { Navigate } from 'react-router';
import { UserContext } from '../userContext';

function AddPhoto(props) {
    const userContext = useContext(UserContext); 
    const[title, setTitle] = useState('');
    const[comment, setComment] = useState('');
    const[file, setFile] = useState('');
    const[uploaded, setUploaded] = useState(false);

    async function onSubmit(e){
        e.preventDefault();

        if(!title){
            alert("Vnesite ime!");
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('comment', comment);
        formData.append('image', file);
        const res = await fetch('http://localhost:3001/photos', {
            method: 'POST',
            credentials: 'include',
            body: formData
        });
        const data = await res.json();

        setUploaded(true);
    }

    return (
        <div className="container mx-auto px-4 max-w-5xl mt-12">
        <form className="form-group" onSubmit={onSubmit}>
            {!userContext.user ? <Navigate replace to="/login" /> : ""}
            {uploaded ? <Navigate replace to="/" /> : ""}
            <input type="text" className="form-control" name="naslov" placeholder="Ime slike" value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
            <input type="text" className="form-control" name="komentar" placeholder="Komentar na sliko" value={comment} onChange={(e)=>{setComment(e.target.value)}}/>
            <label>Izberi sliko</label>
            <input type="file" id="file" onChange={(e)=>{setFile(e.target.files[0])}}/>
            <input className="btn btn-primary" type="submit" name="submit" value="Naloži" />
        </form>
        </div>
    )
}

export default AddPhoto;