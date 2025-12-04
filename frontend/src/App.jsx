import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, Save, X, StickyNote } from 'lucide-react';

const API_URL = 'http://10.54.19.152:5000/api';

export default function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState({ title: '', content: '', color: '#fef3c7' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const colors = ['#fef3c7', '#dbeafe', '#fce7f3', '#dcfce7', '#fed7aa', '#e9d5ff'];

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch(`${API_URL}/notes`);
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingId ? `${API_URL}/notes/${editingId}` : `${API_URL}/notes`;
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentNote),
      });

      if (response.ok) {
        fetchNotes();
        closeModal();
      }
    } catch (error) {
      console.error('Error saving note:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await fetch(`${API_URL}/notes/${id}`, { method: 'DELETE' });
        fetchNotes();
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  };

  const openModal = (note = null) => {
    if (note) {
      setCurrentNote(note);
      setEditingId(note._id);
    } else {
      setCurrentNote({ title: '', content: '', color: '#fef3c7' });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentNote({ title: '', content: '', color: '#fef3c7' });
    setEditingId(null);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 50%, #fce7f3 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    header: {
      backgroundColor: '#ffffff',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      borderBottom: '1px solid #e5e7eb',
      padding: '1.5rem 0'
    },
    headerContent: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 1.5rem'
    },
    headerTop: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '1.5rem'
    },
    titleContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    },
    title: {
      fontSize: '2rem',
      fontWeight: '700',
      background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      margin: 0
    },
    newButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 100%)',
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '12px',
      border: 'none',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s',
      boxShadow: '0 2px 8px rgba(147,51,234,0.3)'
    },
    searchContainer: {
      position: 'relative',
      width: '100%'
    },
    searchInput: {
      width: '100%',
      padding: '0.75rem 1rem 0.75rem 3rem',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      fontSize: '1rem',
      outline: 'none',
      transition: 'all 0.2s'
    },
    searchIcon: {
      position: 'absolute',
      left: '1rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#9ca3af'
    },
    main: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '2rem 1.5rem'
    },
    emptyState: {
      textAlign: 'center',
      padding: '5rem 0'
    },
    emptyText: {
      fontSize: '1.25rem',
      color: '#6b7280',
      marginTop: '1rem'
    },
    notesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '1.5rem'
    },
    noteCard: {
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      overflow: 'hidden',
      transition: 'all 0.2s',
      cursor: 'pointer'
    },
    noteContent: {
      padding: '1.5rem'
    },
    noteTitle: {
      fontSize: '1.25rem',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '0.75rem',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical'
    },
    noteText: {
      color: '#374151',
      marginBottom: '1rem',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: 4,
      WebkitBoxOrient: 'vertical',
      whiteSpace: 'pre-wrap'
    },
    noteFooter: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: '1rem',
      borderTop: '1px solid rgba(0,0,0,0.1)'
    },
    noteDate: {
      fontSize: '0.75rem',
      color: '#6b7280'
    },
    actionButtons: {
      display: 'flex',
      gap: '0.5rem'
    },
    iconButton: {
      padding: '0.5rem',
      backgroundColor: '#ffffff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      zIndex: 1000
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 20px 25px rgba(0,0,0,0.3)',
      maxWidth: '600px',
      width: '100%',
      maxHeight: '90vh',
      overflow: 'auto'
    },
    modalHeader: {
      padding: '1.5rem',
      borderBottom: '1px solid #e5e7eb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    modalTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#1f2937',
      margin: 0
    },
    modalBody: {
      padding: '1.5rem'
    },
    formGroup: {
      marginBottom: '1.5rem'
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '0.5rem'
    },
    input: {
      width: '100%',
      padding: '0.75rem 1rem',
      border: '1px solid #d1d5db',
      borderRadius: '12px',
      fontSize: '1rem',
      outline: 'none',
      transition: 'all 0.2s',
      boxSizing: 'border-box'
    },
    textarea: {
      width: '100%',
      padding: '0.75rem 1rem',
      border: '1px solid #d1d5db',
      borderRadius: '12px',
      fontSize: '1rem',
      outline: 'none',
      transition: 'all 0.2s',
      resize: 'none',
      boxSizing: 'border-box',
      minHeight: '200px'
    },
    colorPicker: {
      display: 'flex',
      gap: '0.75rem'
    },
    colorButton: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      border: '4px solid',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    buttonGroup: {
      display: 'flex',
      gap: '1rem'
    },
    saveButton: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 100%)',
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '12px',
      border: 'none',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    cancelButton: {
      padding: '0.75rem 1.5rem',
      border: '2px solid #d1d5db',
      backgroundColor: 'transparent',
      color: '#374151',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s'
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerTop}>
            <div style={styles.titleContainer}>
              <StickyNote size={32} color="#9333ea" />
              <h1 style={styles.title}>My Notes</h1>
            </div>
            <button 
              onClick={() => openModal()} 
              style={styles.newButton}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <Plus size={20} />
              <span>New Note</span>
            </button>
          </div>

          <div style={styles.searchContainer}>
            <Search size={20} style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
              onFocus={(e) => e.target.style.borderColor = '#9333ea'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>
        </div>
      </header>

      <main style={styles.main}>
        {filteredNotes.length === 0 ? (
          <div style={styles.emptyState}>
            <StickyNote size={80} color="#d1d5db" />
            <p style={styles.emptyText}>
              {searchTerm ? 'No notes found' : 'No notes yet. Create your first note!'}
            </p>
          </div>
        ) : (
          <div style={styles.notesGrid}>
            {filteredNotes.map((note) => (
              <div
                key={note._id}
                style={{...styles.noteCard, backgroundColor: note.color}}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 10px 15px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                }}
              >
                <div style={styles.noteContent}>
                  <h3 style={styles.noteTitle}>{note.title}</h3>
                  <p style={styles.noteText}>{note.content}</p>
                  <div style={styles.noteFooter}>
                    <span style={styles.noteDate}>
                      {new Date(note.updatedAt).toLocaleDateString()}
                    </span>
                    <div style={styles.actionButtons}>
                      <button
                        onClick={() => openModal(note)}
                        style={styles.iconButton}
                        title="Edit"
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                      >
                        <Edit2 size={16} color="#3b82f6" />
                      </button>
                      <button
                        onClick={() => handleDelete(note._id)}
                        style={styles.iconButton}
                        title="Delete"
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                      >
                        <Trash2 size={16} color="#ef4444" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {isModalOpen && (
        <div style={styles.modal} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {editingId ? 'Edit Note' : 'Create New Note'}
              </h2>
              <button
                onClick={closeModal}
                style={{...styles.iconButton, padding: '0.5rem'}}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
              >
                <X size={24} color="#6b7280" />
              </button>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Title</label>
                <input
                  type="text"
                  value={currentNote.title}
                  onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
                  placeholder="Enter note title..."
                  style={styles.input}
                  onFocus={(e) => e.target.style.borderColor = '#9333ea'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Content</label>
                <textarea
                  value={currentNote.content}
                  onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
                  placeholder="Write your note here..."
                  style={styles.textarea}
                  onFocus={(e) => e.target.style.borderColor = '#9333ea'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Color</label>
                <div style={styles.colorPicker}>
                  {colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setCurrentNote({ ...currentNote, color })}
                      style={{
                        ...styles.colorButton,
                        backgroundColor: color,
                        borderColor: currentNote.color === color ? '#9333ea' : '#d1d5db',
                        transform: currentNote.color === color ? 'scale(1.1)' : 'scale(1)'
                      }}
                      onMouseEnter={(e) => {
                        if (currentNote.color !== color) {
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = currentNote.color === color ? 'scale(1.1)' : 'scale(1)';
                      }}
                    />
                  ))}
                </div>
              </div>

              <div style={styles.buttonGroup}>
                <button
                  onClick={handleSubmit}
                  disabled={loading || !currentNote.title || !currentNote.content}
                  style={{
                    ...styles.saveButton,
                    opacity: (loading || !currentNote.title || !currentNote.content) ? 0.5 : 1,
                    cursor: (loading || !currentNote.title || !currentNote.content) ? 'not-allowed' : 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    if (!loading && currentNote.title && currentNote.content) {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 10px 15px rgba(147,51,234,0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <Save size={20} />
                  <span>{loading ? 'Saving...' : 'Save Note'}</span>
                </button>
                <button
                  onClick={closeModal}
                  style={styles.cancelButton}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
