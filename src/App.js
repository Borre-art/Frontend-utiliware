import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ImagePlus, Send, MessageSquare } from 'lucide-react';

function App() {
  const [mensaje, setMensaje] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [cantidadCustom, setCantidadCustom] = useState(""); // Estado para el input manual

  const presets = [50, 100, 150, 200];

  // Maneja el cambio en el input manual
  const handleCustomChange = (valor) => {
    setCantidadCustom(valor);
    if (valor === "") {
      setCantidad(0);
    } else {
      setCantidad(Number(valor));
    }
  };

  const handleEnviar = () => {
    // Validación de ciberseguridad: evitar saturación
    if (!mensaje || cantidad <= 0) {
      alert("Por favor escribe un mensaje y selecciona una cantidad válida.");
      return;
    }

    if (cantidad > 1000) {
      alert("Límite de seguridad: El máximo de repeticiones permitido es 1000.");
      return;
    }

    console.log("Enviando a AWS:", {
      mensaje,
      cantidad,
      tipo: cantidadCustom !== "" ? "Manual" : "Preset"
    });

    alert(`Proceso iniciado: ${cantidad} repeticiones.`);
  };

  return (
    <div className="min-h-screen bg-blue-900 flex items-center justify-center p-4 font-sans text-slate-800">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-xl border-t-8 border-blue-500"
      >
        {/* Encabezado */}
        <div className="flex items-center gap-2 mb-2">
          <MessageSquare className="text-blue-600" size={28} />
          <h1 className="text-3xl font-black text-blue-900 tracking-tight">Utiliware</h1>
        </div>

        <div className="space-y-6">
          {/* Área del Mensaje */}
          <div className="relative group">
            <textarea
              className="w-full p-5 pr-14 rounded-2xl border-2 border-slate-100 focus:border-blue-500 
              focus:ring-4 focus:ring-blue-100 outline-none h-36 resize-none transition-all bg-slate-50"
              placeholder="Escribe el mensaje que deseas procesar..."
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
            />
            <label className="absolute right-4 bottom-4 cursor-pointer p-2 bg-white 
            rounded-xl shadow-md border border-slate-100 text-blue-500 hover:text-blue-700 hover:scale-110 transition-all">
              <input type="file" className="hidden" accept="image/*" />
              <ImagePlus size={24} />
            </label>
          </div>

          {/* Selector de Repeticiones Dinámico */}
          <div>
            <label className="text-sm font-bold text-slate-500 mb-3 block ml-1 uppercase tracking-tight">
              Número de Repeticiones
            </label>

            <div className="flex flex-wrap gap-3">
              {/* Botones rápidos (Presets) */}
              <div className="flex gap-2 flex-grow">
                {presets.map(num => (
                  <motion.button
                    key={num}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCantidad(num);
                      setCantidadCustom(""); // Limpia el manual si eliges un botón
                    }}
                    className={`flex-grow py-3 rounded-xl font-bold transition-all ${cantidad === num && cantidadCustom === ""
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                      : 'bg-slate-100 text-slate-400 hover:bg-blue-50 hover:text-blue-600'
                      }`}
                  >
                    {num}
                  </motion.button>
                ))}
              </div>

              {/* Entrada Manual Custom */}
              <div className="w-24 relative">
                <input
                  type="number"
                  placeholder="Otro"
                  value={cantidadCustom}
                  onChange={(e) => handleCustomChange(e.target.value)}
                  className={`w-full py-3 px-2 rounded-xl border-2 font-bold text-center
                     outline-none transition-all ${cantidadCustom !== ""
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-slate-100 bg-slate-50 text-slate-400'
                    }`}
                />
              </div>
            </div>
          </div>

          {/* Botón de Acción Principal */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleEnviar}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl 
            flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-900/20"
          >
            <Send size={22} />
            INICIAR PROCESAMIENTO
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default App;