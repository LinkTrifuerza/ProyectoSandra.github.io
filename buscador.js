// Buscador.js
const [resultados, setResultados] = useState([]);

const handleBusqueda = async (termino) => {
  const productos = await localforage.getItem('productos');
  const filtrados = productos.filter(p => 
    p.nombre.toLowerCase().includes(termino.toLowerCase())
  );
  setResultados(filtrados);
};
