import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchNotes, createNote, updateNote, deleteNote, searchNotes } from '../redux/slices/notesSlice';
import { logout } from '../redux/slices/authSlice';
import NotesList from '../components/NotesList';
import NoteEditor from '../components/NoteEditor';
import './Dashboard.css';

function Dashboard({ toggleDarkMode, darkMode }) {
    const [showNewNoteForm, setShowNewNoteForm] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { notes, searchResults } = useSelector(state => state.notes);
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(fetchNotes());
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            dispatch(searchNotes(searchQuery));
        }
    };

    const handleCreateNote = (title, content, category, tags) => {
        dispatch(createNote(title, content, category, tags));
        setShowNewNoteForm(false);
    };

    const handleUpdateNote = (id, title, content, category, tags) => {
        dispatch(updateNote(id, title, content, category, tags));
        setSelectedNote(null);
    };

    const handleDeleteNote = (id) => {
        dispatch(deleteNote(id));
        setSelectedNote(null);
    };

    const displayNotes = searchQuery ? searchResults : notes;

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Secure Notes</h1>
                <div className="header-actions">
                    <button className="theme-toggle" onClick={toggleDarkMode}>
                        {darkMode ? '☀️' : '🌙'}
                    </button>
                    {user && <span className="user-info">{user.username}</span>}
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
            </header>

            <div className="dashboard-content">
                <aside className="sidebar">
                    <form className="search-form" onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Search notes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit">Search</button>
                    </form>

                    <button
                        className="new-note-btn"
                        onClick={() => setShowNewNoteForm(!showNewNoteForm)}
                    >
                        + New Note
                    </button>

                    {showNewNoteForm && (
                        <NoteEditor
                            onSave={handleCreateNote}
                            onCancel={() => setShowNewNoteForm(false)}
                            isNew={true}
                        />
                    )}

                    <NotesList
                        notes={displayNotes}
                        selectedNoteId={selectedNote?._id}
                        onSelectNote={setSelectedNote}
                    />
                </aside>

                <main className="main-content">
                    {selectedNote ? (
                        <NoteEditor
                            note={selectedNote}
                            onSave={(title, content, category, tags) =>
                                handleUpdateNote(selectedNote._id, title, content, category, tags)
                            }
                            onDelete={() => handleDeleteNote(selectedNote._id)}
                            onCancel={() => setSelectedNote(null)}
                            isNew={false}
                        />
                    ) : (
                        <div className="no-note-selected">
                            <p>Select a note to view or edit</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default Dashboard;
