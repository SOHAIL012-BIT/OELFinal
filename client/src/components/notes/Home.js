import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {format} from 'timeago.js'
import axios from 'axios'

export default function Home() {
    const [notes, setNotes] = useState([])
    const [token, setToken] = useState('')

    const getNotes = async (token) =>{
        const res = await axios.get('api/notes', {
            headers:{Authorization: token}
        })
        setNotes(res.data)
    }

    useEffect(() =>{
        const token = localStorage.getItem('tokenStore')
        setToken(token)
        if(token){
            getNotes(token)
        }
    }, [])

    const deleteNote = async (id) =>{
        try {
            if(token){
                await axios.delete(`api/notes/${id}`, {
                    headers: {Authorization: token}
                })
                getNotes(token)
            }
        } catch (error) {
            window.location.href = "/";
        }
    }

    return (
        <div className="note-wrapper">
            {
                notes.map(note =>(
                    <div className="card" key={note._id}>
                        <h2 title={note.title}>{note.title}</h2>
                        <div className="text-wrapper">
                            <p>{note.content}</p>
                            <img src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"></img>
                        </div>
                        <h4> User Added By:{note.name}</h4>
                        <div className="card-footer">
                           <p className="date">{format(note.date)}</p>
                            <Link to={`edit/${note._id}`} >Edit</Link>
                        </div>
                        <button className="close" 
                        onClick={() => deleteNote(note._id)} >Delete</button>
                    </div>
                ))
            }
            
        </div>
    )
}
