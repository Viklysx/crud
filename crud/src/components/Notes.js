  
import React from 'react';
import { nanoid } from 'nanoid';
import NoteElement from './NoteElement';

class Notes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            valueNote: ''
        }
    }

    updateNotes = () => {
        fetch('http://localhost:7777/notes', {
            method:"GET"
        })
        .then(response => response.json())
        .then(notes => this.setState({ notes: notes }));
    }

    deleteNote = (id) => {
        console.log(id)
        fetch(`http://localhost:7777/notes/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
           this.updateNotes()
        });
    }

    handleSubmit = (evt) => {
        evt.preventDefault(); 

        fetch('http://localhost:7777/notes', {
            method: 'POST',
            body: JSON.stringify({
                id: this.state.notes ? this.state.notes.length : 0,
                content: this.state.valueNote,
            })
            
        })
        .then(() => {
            this.updateNotes();
            console.log(this.state)
        })
        .then(() => {
            this.setState({ valueNote: '' });
        });
    }

    handleChange = (evt) => {
        this.setState({ valueNote: evt.target.value });
    }

    componentDidMount() {
        this.updateNotes();
    }

    render() {
        return (
            <div>
                <div>
                    <h1>Notes</h1>
                    <button onClick={this.updateNotes}>&#8634;</button>
                </div>
                <div>
                {this.state.notes.map((note) =>
                    <NoteElement {...note}
                        key={nanoid()}
                        handleDelete={this.deleteNote} 
                    />
                )}
                </div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <textarea placeholder="New note" value={this.state.valueNote} onChange={this.handleChange}/>
                        <button type="submit">&#10004;</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Notes;