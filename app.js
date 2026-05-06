const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const libros = [
  { id: 1, nombre: "Cien años de soledad", autor: "Gabriel García Márquez", anioPublicacion: 1967, genero: "Realismo mágico" },
  { id: 2, nombre: "El Quijote", autor: "Miguel de Cervantes", anioPublicacion: 1605, genero: "Novela" },
  { id: 3, nombre: "1984", autor: "George Orwell", anioPublicacion: 1949, genero: "Distopía" },
  { id: 4, nombre: "El principito", autor: "Antoine de Saint-Exupéry", anioPublicacion: 1943, genero: "Fábula" },
  { id: 5, nombre: "Harry Potter y la piedra filosofal", autor: "J.K. Rowling", anioPublicacion: 1997, genero: "Fantasía" },
  { id: 6, nombre: "Rayuela", autor: "Julio Cortázar", anioPublicacion: 1963, genero: "Novela experimental" },
];

app.get("/", (req, res) => {
  res.json({ mensaje: "¡Bienvenido a la API de Libros!", rutas: {
    "GET /libros": "Lista todos los libros",
    "GET /libros?nombre=...": "Busca libros por nombre",
    "GET /libros/:id": "Obtiene un libro por su ID",
  }});
});

app.get("/libros", (req, res) => {
  const { nombre } = req.query;
  if (nombre) {
    const resultados = libros.filter((libro) =>
      libro.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
    if (resultados.length === 0) {
      return res.status(404).json({ error: "No se encontraron libros con ese nombre.", nombreBuscado: nombre });
    }
    return res.json({ total: resultados.length, libros: resultados });
  }
  res.json({ total: libros.length, libros: libros });
});

app.get("/libros/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "El ID debe ser un número válido." });
  }
  const libro = libros.find((l) => l.id === id);
  if (!libro) {
    return res.status(404).json({ error: `No se encontró ningún libro con el ID ${id}.` });
  }
  res.json(libro);
});

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada." });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});