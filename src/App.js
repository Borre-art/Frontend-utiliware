import React, { useState } from 'react'; // Importa React y el hook useState para manejar el estado del componente
import { motion } from 'framer-motion'; // Importa el componente motion para animaciones
import { ImagePlus, Send, MessageSquare } from 'lucide-react'; //Iconos de lucide-react en formato de componente svg

const presets = [25, 50, 100, 200]; // Opciones predefinidas para la cantidad de repeticiones

function App() {
  const [mensaje, setMensaje] = useState("");//Estado para el mensaje de texto
  const [cantidad, setCantidad] = useState(0);//Estado para la cantidad de repeticiones (puede ser preset o manual)
  const [cantidadCustom, setCantidadCustom] = useState(""); //Seleccion manual del número de repeticiones
  const [error, setError] = useState(false); // Estado para manejar errores de validación

  // Maneja el cambio en el input manual
  const handleCustomChange = (valor) => {
    setCantidadCustom(valor);
    if (valor === "") {
      setCantidad(0);
    } else {
      setCantidad(Number(valor));
    }
  };
  // Función para manejar el envío del mensaje y la cantidad a AWS
  const handleEnviar = () => {
    // Validación básica antes de enviar
    if (!mensaje || cantidad <= 0) {
      setError(true);
      return;
    }
    // Validación de límite de seguridad para evitar cargas excesivas
    if (cantidad > 1000) {
      alert("Maximum of 1000 repetitions. Please reduce the quantity.");
      return;
    }
    setError(false);
    // Aqui se enviaran los datos a AWS, por ahora solo se muestra en consola
    console.log("Enviando a AWS:", {
      mensaje,
      cantidad,
      tipo: cantidadCustom !== "" ? "Manual" : "Preset"
    });
    // Simulación de respuesta exitosa
    alert(`Process started: ${cantidad} repetitions.`);
  };
  // Renderizado del componente principal
  return (
    <div className="min-h-screen bg-blue-900 flex items-center justify-center p-4 font-sans text-slate-800">

      <motion.div
        initial={{ opacity: 2, y: 60 }} // Estado inicial para la animación (opacidad y posición vertical)
        animate={{ opacity: 2, y: 1 }} // Estado final para la animación (opacidad y posición vertical)
        transition={{ duration: 1.0 }} // Duración de la animación
        className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-xl border-t-8 border-blue-500"
      >
        {/*Encabezado con Icono y Título*/}
        <div className="flex items-center gap-2 mb-2"> {/*Icono de mensaje junto al título principal*/}
          <MessageSquare className="text-blue-600" size={28} />
          <h1 className="text-3xl font-black text-blue-900 tracking-tight">Message Router</h1>
        </div>
        {/* Subtítulo descriptivo */}
        <div className="space-y-6">
          {/* Área de texto para el mensaje con opción de adjuntar imagen */}
          <div className="relative group">
            <textarea
              className={`w-full p-5 pr-14 rounded-2xl border-2 outline-none h-36 resize-none transition-all
                ${error && !mensaje
                  ? 'border-red-500 bg-red-50 focus:ring-4 focus:ring-red-100'
                  : 'border-slate-100 bg-slate-50 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                }
              `}
              placeholder="Type the message you want to process..."
              value={mensaje}
              onChange={(e) => {
                setMensaje(e.target.value);
                if (e.target.value) setError(false);
              }}
            />
            {/* Botón para adjuntar imagen (no funcional, solo visual) */}
            <label className="absolute right-4 bottom-4 cursor-pointer p-2 bg-white 
            rounded-xl shadow-md border border-slate-100 text-blue-500 hover:text-blue-700 hover:scale-110 transition-all">
              <input type="file" className="hidden" accept="image/*" /> {/* Input oculto para seleccionar imagen */}
              <ImagePlus size={24} /> {/* Icono de agregar imagen dentro del botón, con estilos para interacción visual */}
            </label>
          </div>
          {/* Sección para seleccionar la cantidad de repeticiones, con opciones predefinidas y entrada manual */}
          <div>
            <label className="text-sm font-bold text-slate-500 mb-3 block ml-1 uppercase tracking-tight">
              Number of Repetitions
            </label>
            {error && cantidad <= 0 && ( // Muestra un mensaje de error si no se ha seleccionado una cantidad válida
              <p className="text-red-500 text-xs font-bold mb-2 ml-1">
                * You must select a quantity
              </p>
            )}
            {/* Contenedor para los botones de presets y la entrada manual */}
            <div className="flex flex-wrap gap-3">
              {/* Botones de Presets */}
              <div className="flex gap-2 flex-grow">
                {presets.map(num => ( // Itera sobre las opciones predefinidas para crear botones interactivos
                  <motion.button
                    key={num}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCantidad(num); // Establece la cantidad al valor del preset seleccionado
                      setCantidadCustom(""); // Limpia el manual si eliges un botón
                      setError(false); // Limpia el error si se selecciona un preset válido
                    }}
                    // Cambia el estilo del botón si está seleccionado o no
                    className={`flex-grow py-3 rounded-xl font-bold transition-all ${cantidad === num && cantidadCustom === ""
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                      : 'bg-slate-100 text-slate-400 hover:bg-blue-50 hover:text-blue-600'
                      }`}
                  >
                    {num}{/* Muestra el número de repeticiones en el botón */}
                  </motion.button>
                ))}
              </div>

              {/* Entrada manual para cantidad personalizada */}
              <div className="w-24 relative">
                <input
                  type="number"
                  placeholder="Other"
                  value={cantidadCustom}
                  onChange={(e) => {
                    handleCustomChange(e.target.value);
                    if (e.target.value) setError(false);
                  }}
                  className={`w-full py-3 px-2 rounded-xl border-2 font-bold text-center outline-none transition-all 
                    ${error && cantidad <= 0
                      ? 'border-red-500 bg-red-50'
                      : cantidadCustom !== "" ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-100 bg-slate-50 text-slate-400'
                    }`}
                />
              </div>
            </div>
          </div>

          {/* Botón de Acción */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleEnviar}
            className={`w-full font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl 
              ${error // Si hay un error, el botón se muestra en rojo para indicar que se deben corregir los campos
                ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-900/20'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-900/20'
              }`}
          >
            <Send size={22} />
            {error ? "FIX THE FIELDS" : "START PROCESSING"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default App;