  
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
        fetch('http://localhost:7777/notes')
        .then(response => response.json())
        .then(notes => this.setState({ notes: notes }));
    }

    deleteNote = (id) => {
        fetch(`http://localhost:7777/notes/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
           this.updateNotes()
        });
    }

    handleSubmit = (evt) => {
        evt.preventDefault(); 
        const obj = {
            id: this.state.notes ? this.state.notes.length : 0,
            content: this.state.valueNote,
        };
        fetch('http://localhost:7777/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)          
        })
        .then(() => {
            this.updateNotes();
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
            <div className="notes-wrapper">
                <div className="notes-wrapper-top">
                    <h1>Notes</h1>
                    <button className="update-btn" onClick={this.updateNotes}>&#8634;</button>
                </div>
                <div className="notes-wrapper-body">
                {this.state.notes.map((note) =>
                    <NoteElement {...note}
                        key={nanoid()}
                        handleDelete={this.deleteNote} 
                    />
                )}
                </div>
                <div className="update-wrapper">
                    <form onSubmit={this.handleSubmit}>
                        <textarea placeholder="New note" value={this.state.valueNote} onChange={this.handleChange}/>
                        <button className="btn-add" type="submit">&#10004;</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Notes;