from flask import Flask, render_template, request, jsonify
import json
import os
from datetime import datetime

app = Flask(__name__)

# Archivo para almacenar las notas
NOTES_FILE = 'notes.json'

def load_notes():
    """Carga las notas desde el archivo JSON"""
    if os.path.exists(NOTES_FILE):
        with open(NOTES_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return []

def save_notes(notes):
    """Guarda las notas en el archivo JSON"""
    with open(NOTES_FILE, 'w', encoding='utf-8') as f:
        json.dump(notes, f, ensure_ascii=False, indent=2)

@app.route('/')
def index():
    """Ruta principal que renderiza la página HTML"""
    return render_template('index.html')

@app.route('/api/notes', methods=['GET'])
def get_notes():
    """Obtiene todas las notas"""
    notes = load_notes()
    return jsonify(notes)

@app.route('/api/notes', methods=['POST'])
def create_note():
    """Crea una nueva nota"""
    data = request.get_json()
    notes = load_notes()
    
    # Generar ID único
    new_id = max([note['id'] for note in notes], default=0) + 1
    
    new_note = {
        'id': new_id,
        'title': data.get('title', 'Sin título'),
        'content': data.get('content', ''),
        'created_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        'updated_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }
    
    notes.append(new_note)
    save_notes(notes)
    
    return jsonify(new_note), 201

@app.route('/api/notes/<int:note_id>', methods=['PUT'])
def update_note(note_id):
    """Actualiza una nota existente"""
    data = request.get_json()
    notes = load_notes()
    
    for note in notes:
        if note['id'] == note_id:
            note['title'] = data.get('title', note['title'])
            note['content'] = data.get('content', note['content'])
            note['updated_at'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            save_notes(notes)
            return jsonify(note)
    
    return jsonify({'error': 'Nota no encontrada'}), 404

@app.route('/api/notes/<int:note_id>', methods=['DELETE'])
def delete_note(note_id):
    """Elimina una nota"""
    notes = load_notes()
    notes = [note for note in notes if note['id'] != note_id]
    save_notes(notes)
    
    return jsonify({'message': 'Nota eliminada correctamente'}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
