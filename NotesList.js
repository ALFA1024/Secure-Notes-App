import React from 'react';
import './NotesList.css';

function NotesList({ notes, selectedNoteId, onSelectNote }) {
    return (
        <div className="notes-list">
            {notes && notes.length > 0 ? (
                notes.map(note => (
                    <div
                        key={note._id}
                        className={`note-item ${selectedNoteId === note._id ? 'active' : ''}`}
                        onClick={() => onSelectNote(note)}
                    >
                        <h3>{note.title}</h3>
                        <p className="note-preview">{note.content.substring(0, 100)}...</p>
                        <span className="note-category">{note.category}</span>
                    </div>
                ))
            ) : (
                <p className="no-notes">No notes yet. Create one to get started!</p>
            )}
        </div>
    );
}

export default NotesList;
