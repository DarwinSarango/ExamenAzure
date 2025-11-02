# 📝 Aplicación de Notas Personales

Una aplicación web monolítica para gestionar notas personales, construida con Flask (backend) y HTML/CSS/JavaScript (frontend).

## 🚀 Características

- ✨ Crear, editar y eliminar notas personales
- 💾 Almacenamiento persistente en archivo JSON
- 🎨 Interfaz moderna y responsive
- ⚡ Operaciones en tiempo real
- 📱 Diseño adaptable a dispositivos móviles

## 🛠️ Tecnologías Utilizadas

### Backend
- **Flask**: Framework web de Python
- **Python 3.8+**: Lenguaje de programación

### Frontend
- **HTML5**: Estructura de la aplicación
- **CSS3**: Estilos y diseño responsive
- **JavaScript (Vanilla)**: Interactividad y comunicación con API

## 📋 Requisitos Previos

- Python 3.8 o superior
- pip (gestor de paquetes de Python)

## 📦 Instalación

### 1. Clonar o descargar el proyecto

```bash
cd ExamenPrueba
```

### 2. Crear un entorno virtual (recomendado)

**En Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**En Linux/Mac:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Instalar las dependencias

```bash
pip install -r requirements.txt
```

## 🚀 Ejecutar la Aplicación

1. Asegúrate de que el entorno virtual esté activado

2. Ejecuta el servidor Flask:

```bash
python app.py
```

3. Abre tu navegador y visita:

```
http://localhost:5000
```

## 📁 Estructura del Proyecto

```
ExamenPrueba/
│
├── app.py                  # Aplicación Flask principal
├── notes.json              # Almacenamiento de notas (se crea automáticamente)
├── requirements.txt        # Dependencias de Python
├── README.md              # Este archivo
│
├── static/                # Archivos estáticos
│   ├── css/
│   │   └── styles.css     # Estilos de la aplicación
│   └── js/
│       └── app.js         # Lógica del frontend
│
└── templates/             # Plantillas HTML
    └── index.html         # Página principal
```

## 🔌 API Endpoints

La aplicación proporciona los siguientes endpoints REST:

- **GET** `/` - Página principal
- **GET** `/api/notes` - Obtener todas las notas
- **POST** `/api/notes` - Crear una nueva nota
- **PUT** `/api/notes/<id>` - Actualizar una nota
- **DELETE** `/api/notes/<id>` - Eliminar una nota

### Ejemplo de estructura de nota (JSON)

```json
{
  "id": 1,
  "title": "Mi primera nota",
  "content": "Este es el contenido de mi nota",
  "created_at": "2025-11-02 10:30:00",
  "updated_at": "2025-11-02 10:30:00"
}
```

## 💡 Uso de la Aplicación

1. **Crear una nota**: Completa el formulario "Crear Nueva Nota" con un título y contenido, luego haz clic en "Guardar Nota"

2. **Editar una nota**: Haz clic en el botón "✏️ Editar" de cualquier nota, modifica el contenido y haz clic en "Actualizar Nota"

3. **Eliminar una nota**: Haz clic en el botón "🗑️ Eliminar" y confirma la acción

4. **Cancelar edición**: Si estás editando una nota y quieres cancelar, haz clic en "Cancelar"

## 🔒 Seguridad

- Escapado de HTML para prevenir ataques XSS
- Validación de datos en el frontend y backend
- Codificación UTF-8 para soporte de caracteres especiales

## 🐛 Solución de Problemas

### La aplicación no inicia
- Verifica que Python 3.8+ está instalado: `python --version`
- Asegúrate de que las dependencias están instaladas: `pip install -r requirements.txt`
- Verifica que el puerto 5000 no está en uso

### Las notas no se guardan
- Verifica que tienes permisos de escritura en el directorio
- Revisa el archivo `notes.json` para ver si se creó correctamente

### Error al cargar estilos o JavaScript
- Asegúrate de que las carpetas `static/css` y `static/js` existen
- Verifica que los archivos están en las ubicaciones correctas

## 📝 Notas Adicionales

- Las notas se almacenan en el archivo `notes.json` en el directorio raíz
- La aplicación es monolítica: frontend y backend están integrados en una sola aplicación
- El servidor Flask se ejecuta en modo debug por defecto (cambiar para producción)

## 🔄 Mejoras Futuras

- Agregar búsqueda de notas
- Implementar categorías o etiquetas
- Añadir autenticación de usuarios
- Migrar a base de datos (SQLite, PostgreSQL)
- Agregar editor de texto enriquecido
- Implementar exportación de notas (PDF, TXT)

## 👨‍💻 Desarrollo

Para desarrollar o modificar la aplicación:

1. Los estilos se encuentran en `static/css/styles.css`
2. La lógica del frontend está en `static/js/app.js`
3. Las rutas y API están en `app.py`
4. La plantilla HTML está en `templates/index.html`

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso educativo y personal.

---

**¡Disfruta organizando tus notas personales! 📝✨**
