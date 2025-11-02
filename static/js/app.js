// Variables globales
let notes = [];
let editingNoteId = null;

// Referencias a elementos del DOM
const noteForm = document.getElementById('noteForm');
const noteTitle = document.getElementById('noteTitle');
const noteContent = document.getElementById('noteContent');
const notesList = document.getElementById('notesList');
const formTitle = document.getElementById('form-title');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');

// Cargar notas al iniciar
document.addEventListener('DOMContentLoaded', () => {
    loadNotes();
});

// Cargar todas las notas
async function loadNotes() {
    try {
        const response = await fetch('/api/notes');
        notes = await response.json();
        renderNotes();
    } catch (error) {
        console.error('Error al cargar las notas:', error);
        showMessage('Error al cargar las notas', 'error');
    }
}

// Renderizar las notas en el DOM
function renderNotes() {
    if (notes.length === 0) {
        notesList.innerHTML = '<p class="no-notes">No hay notas todavía. ¡Crea tu primera nota!</p>';
        return;
    }

    notesList.innerHTML = notes
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .map(note => `
            <div class="note-card">
                <h3>${escapeHtml(note.title)}</h3>
                <p>${escapeHtml(note.content)}</p>
                <div class="note-meta">
                    Creada: ${formatDate(note.created_at)} | 
                    Actualizada: ${formatDate(note.updated_at)}
                </div>
                <div class="note-actions">
                    <button class="btn-small btn-edit" onclick="editNote(${note.id})">
                        ✏️ Editar
                    </button>
                    <button class="btn-small btn-delete" onclick="deleteNote(${note.id})">
                        🗑️ Eliminar
                    </button>
                </div>
            </div>
        `)
        .join('');
}

// Manejar el envío del formulario
noteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const title = noteTitle.value.trim();
    const content = noteContent.value.trim();
    
    if (!title || !content) {
        showMessage('Por favor completa todos los campos', 'error');
        return;
    }
    
    try {
        if (editingNoteId) {
            // Actualizar nota existente
            await updateNote(editingNoteId, title, content);
        } else {
            // Crear nueva nota
            await createNote(title, content);
        }
        
        resetForm();
        await loadNotes();
    } catch (error) {
        console.error('Error:', error);
        showMessage('Error al guardar la nota', 'error');
    }
});

// Crear una nueva nota
async function createNote(title, content) {
    const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
    });
    
    if (response.ok) {
        showMessage('Nota creada exitosamente', 'success');
    } else {
        throw new Error('Error al crear la nota');
    }
}

// Actualizar una nota existente
async function updateNote(id, title, content) {
    const response = await fetch(`/api/notes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
    });
    
    if (response.ok) {
        showMessage('Nota actualizada exitosamente', 'success');
    } else {
        throw new Error('Error al actualizar la nota');
    }
}

// Editar una nota
function editNote(id) {
    const note = notes.find(n => n.id === id);
    if (!note) return;
    
    editingNoteId = id;
    noteTitle.value = note.title;
    noteContent.value = note.content;
    formTitle.textContent = 'Editar Nota';
    saveBtn.textContent = 'Actualizar Nota';
    cancelBtn.style.display = 'block';
    
    // Scroll al formulario
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Eliminar una nota
async function deleteNote(id) {
    if (!confirm('¿Estás seguro de que deseas eliminar esta nota?')) {
        return;
    }
    
    try {
        const response = await fetch(`/api/notes/${id}`, {
            method: 'DELETE',
        });
        
        if (response.ok) {
            showMessage('Nota eliminada exitosamente', 'success');
            await loadNotes();
        } else {
            throw new Error('Error al eliminar la nota');
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('Error al eliminar la nota', 'error');
    }
}

// Cancelar edición
cancelBtn.addEventListener('click', resetForm);

// Resetear el formulario
function resetForm() {
    editingNoteId = null;
    noteTitle.value = '';
    noteContent.value = '';
    formTitle.textContent = 'Crear Nueva Nota';
    saveBtn.textContent = 'Guardar Nota';
    cancelBtn.style.display = 'none';
}

// Formatear fecha
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Escapar HTML para prevenir XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Mostrar mensajes al usuario
function showMessage(message, type) {
    // Crear elemento de mensaje
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(messageDiv);
    
    // Eliminar mensaje después de 3 segundos
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
}
