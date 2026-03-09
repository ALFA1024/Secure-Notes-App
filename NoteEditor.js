import React, { useState, useEffect } from 'react';
import './NoteEditor.css';

function NoteEditor({ note, onSave, onDelete, onCancel, isNew }) {
    const [title, setTitle] = useState(note?.title || '');
    const [content, setContent] = useState(note?.content || '');
    const [category, setCategory] = useState(note?.category || 'General');
    const [tags, setTags] = useState(note?.tags?.join(', ') || '');

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setContent(note.content);
            setCategory(note.category);
            setTags(note.tags?.join(', ') || '');
        }
    }, [note]);

    const handleSave = () => {
        if (!title.trim() || !content.trim()) {
            alert('Title and content are required');
            return;
        }
        const tagArray = tags.split(',').map(t => t.trim()).filter(t => t);
        onSave(title, content, category, tagArray);
    };

    return (
        <div className="note-editor">
            <div className="editor-header">
                <input
                    type="text"
                    className="editor-title"
                    placeholder="Note Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className="editor-actions">
                    <button className="save-btn" onClick={handleSave}>Save</button>
                    {!isNew && <button className="delete-btn" onClick={onDelete}>Delete</button>}
                    <button className="cancel-btn" onClick={onCancel}>Cancel</button>
                </div>
            </div>

            <div className="editor-meta">
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="category-select">
                    <option>General</option>
                    <option>Work</option>
                    <option>Personal</option>
                    <option>Ideas</option>
                </select>
                <input
                    type="text"
                    placeholder="Tags (comma separated)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="tags-input"
                />
            </div>

            <textarea
                className="editor-content"
                placeholder="Write your note here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
        </div>
    );
}

export default NoteEditor;
