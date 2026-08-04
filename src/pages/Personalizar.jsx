import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getProductById, priceForWeight } from "../data/products.js";
import { useUpsell } from "../context/UpsellContext.jsx";

// Únicos ingredientes aprobados para el Aliño Personalizado.
const INGREDIENTES_APROBADOS = ["Cebollín", "Ají", "Cilantro", "Pimentón", "Ajoporro"];

const INCREMENTO_GRAMOS = 10;
const MINIMO_GRAMOS_POR_INGREDIENTE = 10;
const TOTAL_PASOS = 5;

export default function Personalizar() {
  // El Aliño Personalizado vive en data/products.js igual que cualquier
  // otro producto — sus presentaciones (250g/400g/500g) son la misma fuente
  // que usa el catálogo, y su precio se calcula con priceForWeight, la
  // MISMA función que usa el carrito. Así nunca hay un precio distinto
  // entre el personalizador y lo que termina cobrándose.
  const alinoPersonalizado = getProductById("alino-personalizado");
  const presentaciones = alinoPersonalizado?.presentaciones ?? [];

  const { solicitarAgregado } = useUpsell();

  const [paso, setPaso] = useState(1);
  const [tamanoId, setTamanoId] = useState(alinoPersonalizado?.defaultWeight ?? presentaciones[0]?.id);
  const tamanoActual = presentaciones.find((p) => p.id === tamanoId) ?? presentaciones[0];

  const [ingredientesSeleccionados, setIngredientesSeleccionados] = useState([]);
  const [gramosPorIngrediente, setGramosPorIngrediente] = useState({});

  // Redistribuye los gramos disponibles en partes iguales cada vez que
  // cambia la lista de ingredientes elegidos o el tamaño del envase. Los
  // ajustes manuales del paso 3 se mantienen mientras no cambie ninguno
  // de los dos (ver dependencias del efecto).
  useEffect(() => {
    if (!tamanoActual || ingredientesSeleccionados.length === 0) {
      setGramosPorIngrediente({});
      return;
    }
    const total = tamanoActual.gramos;
    const n = ingredientesSeleccionados.length;
    const base = Math.max(MINIMO_GRAMOS_POR_INGREDIENTE, Math.floor(total / n / INCREMENTO_GRAMOS) * INCREMENTO_GRAMOS);

    const distribucion = {};
    let acumulado = 0;
    ingredientesSeleccionados.forEach((nombre, idx) => {
      if (idx === ingredientesSeleccionados.length - 1) {
        distribucion[nombre] = Math.max(MINIMO_GRAMOS_POR_INGREDIENTE, total - acumulado);
      } else {
        distribucion[nombre] = base;
        acumulado += base;
      }
    });
    setGramosPorIngrediente(distribucion);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredientesSeleccionados.join("|"), tamanoId]);

  const gramosUsados = Object.values(gramosPorIngrediente).reduce((a, b) => a + b, 0);
  const gramosDisponibles = tamanoActual?.gramos ?? 0;

  function toggleIngrediente(nombre) {
    setIngredientesSeleccionados((prev) =>
      prev.includes(nombre) ? prev.filter((n) => n !== nombre) : [...prev, nombre]
    );
  }

  // Nunca deja superar el peso máximo del envase, ni bajar un ingrediente
  // por debajo del mínimo.
  function ajustarGramos(nombre, delta) {
    setGramosPorIngrediente((prev) => {
      const actual = prev[nombre] ?? 0;
      const nuevoValor = actual + delta;
      if (nuevoValor < MINIMO_GRAMOS_POR_INGREDIENTE) return prev;

      const totalActual = Object.values(prev).reduce((a, b) => a + b, 0);
      const totalNuevo = totalActual - actual + nuevoValor;
      if (totalNuevo > gramosDisponibles) return prev;

      return { ...prev, [nombre]: nuevoValor };
    });
  }

  // Mismo cálculo que usa el carrito: priceForWeight(producto, presentación).
  const precio = alinoPersonalizado ? priceForWeight(alinoPersonalizado, tamanoId) : 0;

  function handleAgregarAlCarrito() {
    if (!alinoPersonalizado) return;

    const ingredientesConfig = ingredientesSeleccionados.map((nombre) => ({
      nombre,
      gramos: gramosPorIngrediente[nombre] ?? 0,
    }));

    // Mismo punto de entrada al carrito que usan ProductCard y Producto.
    // Como este producto es el disparador configurado de venta adicional,
    // acá es donde aparece el popup de hierbas.
    solicitarAgregado(alinoPersonalizado, tamanoId, 1, precio, ingredientesConfig);

    // Deja el personalizador listo para armar otro aliño desde cero.
    setPaso(1);
    setIngredientesSeleccionados([]);
  }

  return (

<section className="min-h-screen bg-[#F7F6F2]">

<div className="max-w-7xl mx-auto px-8 py-20">

<motion.div

initial={{opacity:0,y:40}}

animate={{opacity:1,y:0}}

transition={{duration:.6}}

className="text-center"

>

<p className="uppercase tracking-[8px] text-green-700 font-bold">

ALIÑOS ARAGUANEY

</p>

<h1 className="mt-6 text-6xl font-black leading-tight text-[#143A18]">

Diseña

<br/>

tu propio aliño

</h1>

<p className="mt-8 text-xl text-gray-500 max-w-2xl mx-auto">

Selecciona el tamaño y luego personaliza tu mezcla exactamente como la deseas.

</p>

</motion.div>

<div className="mt-20 bg-white rounded-[42px] overflow-hidden shadow-2xl">

<div className="grid lg:grid-cols-2">

<div className="bg-gradient-to-br from-green-50 to-white p-14 flex items-center justify-center">

<img

src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=900"

alt="Aliño"

className="rounded-[32px] shadow-xl"

/>

</div>

<div className="p-14">

<div className="flex items-center gap-3 mb-10">
  {Array.from({ length: TOTAL_PASOS }, (_, i) => i + 1).map((n) => (
    <div key={n} className={`flex-1 h-2 rounded-full transition-colors duration-300 ${n <= paso ? "bg-green-700" : "bg-gray-200"}`} />
  ))}
</div>

<AnimatePresence mode="wait">

{paso===1 && (

<motion.div

key="paso1"

initial={{opacity:0,x:30}}

animate={{opacity:1,x:0}}

exit={{opacity:0,x:-30}}

transition={{duration:.35}}

>

<span className="text-green-700 font-bold uppercase tracking-widest">

Paso 1

</span>

<h2 className="text-5xl font-black mt-3 text-[#143A18]">

Escoge el tamaño

</h2>

<p className="mt-4 text-gray-500">

Selecciona el tamaño del envase antes de personalizar los ingredientes.

</p>

<div className="grid grid-cols-3 gap-5 mt-12">

{presentaciones.map((item)=>{

const activo=tamanoId===item.id;

return(

<button

key={item.id}

onClick={()=>setTamanoId(item.id)}

className={`rounded-[28px] p-8 transition-all duration-300 text-2xl font-black border-2

${activo

? "bg-green-700 border-green-700 text-white scale-105 shadow-xl"

: "bg-white border-gray-200 hover:border-green-700 hover:text-green-700"

}`}

>

{item.etiqueta}

</button>

);

})}

</div>

<div className="mt-10 rounded-3xl bg-green-50 p-7">

<p className="text-gray-500">

Tamaño seleccionado

</p>

<p className="text-5xl font-black text-green-700 mt-2">

{tamanoActual?.etiqueta}

</p>

</div>

<button

onClick={()=>setPaso(2)}

className="mt-12 w-full bg-[#143A18] hover:bg-[#1B4D22] transition py-5 rounded-3xl text-white text-xl font-bold"

>

Continuar →

</button>

</motion.div>

)}

{paso === 2 && (

  <motion.div
    key="paso2"
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -30 }}
    transition={{ duration: .35 }}
  >

    <span className="text-green-700 font-bold uppercase tracking-widest">
      Paso 2
    </span>

    <h2 className="text-5xl font-black mt-3 text-[#143A18]">
      Ingredientes
    </h2>

    <p className="mt-4 text-gray-500">
      Elige los ingredientes de tu aliño personalizado.
    </p>

    <div className="grid grid-cols-2 gap-5 mt-12">
      {INGREDIENTES_APROBADOS.map((nombre) => {
        const activo = ingredientesSeleccionados.includes(nombre);
        return (
          <button
            key={nombre}
            onClick={() => toggleIngrediente(nombre)}
            className={`rounded-[28px] p-8 transition-all duration-300 text-2xl font-black border-2 ${
              activo
                ? "bg-green-700 border-green-700 text-white scale-105 shadow-xl"
                : "bg-white border-gray-200 hover:border-green-700 hover:text-green-700"
            }`}
          >
            {nombre}
          </button>
        );
      })}
    </div>

    <div className="mt-10 rounded-3xl bg-green-50 p-7">
      <p className="text-gray-500">
        Ingredientes seleccionados
      </p>
      <p className="text-2xl font-black text-green-700 mt-2">
        {ingredientesSeleccionados.length > 0 ? ingredientesSeleccionados.join(", ") : "Ninguno todavía"}
      </p>
    </div>

    <div className="flex gap-4 mt-12">
      <button
        onClick={() => setPaso(1)}
        className="flex-1 border-2 border-green-700 text-green-700 py-5 rounded-3xl text-xl font-bold hover:bg-green-700 hover:text-white transition"
      >
        ← Volver
      </button>
      <button
        onClick={() => setPaso(3)}
        disabled={ingredientesSeleccionados.length === 0}
        className="flex-1 bg-[#143A18] hover:bg-[#1B4D22] transition py-5 rounded-3xl text-white text-xl font-bold disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continuar →
      </button>
    </div>

  </motion.div>

)}

{paso === 3 && (

  <motion.div
    key="paso3"
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -30 }}
    transition={{ duration: .35 }}
  >

    <span className="text-green-700 font-bold uppercase tracking-widest">
      Paso 3
    </span>

    <h2 className="text-5xl font-black mt-3 text-[#143A18]">
      Distribuye los gramos
    </h2>

    <p className="mt-4 text-gray-500">
      Ajusta cuántos gramos lleva cada ingrediente. No puedes superar {gramosDisponibles} g en total.
    </p>

    <div className="mt-8">
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <span>{gramosUsados} g usados</span>
        <span>{gramosDisponibles} g disponibles</span>
      </div>
      <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
        <div
          className="h-full bg-green-700 transition-all duration-300"
          style={{ width: `${gramosDisponibles > 0 ? Math.min(100, (gramosUsados / gramosDisponibles) * 100) : 0}%` }}
        />
      </div>
    </div>

    <div className="mt-8 space-y-4">
      {ingredientesSeleccionados.map((nombre) => (
        <div key={nombre} className="flex items-center justify-between rounded-2xl border-2 border-gray-200 p-5">
          <span className="text-lg font-bold text-[#143A18]">{nombre}</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => ajustarGramos(nombre, -INCREMENTO_GRAMOS)}
              className="w-10 h-10 rounded-full border-2 border-green-700 text-green-700 font-black text-xl flex items-center justify-center hover:bg-green-700 hover:text-white transition"
            >
              −
            </button>
            <span className="w-16 text-center font-black text-green-700">{gramosPorIngrediente[nombre] ?? 0} g</span>
            <button
              onClick={() => ajustarGramos(nombre, INCREMENTO_GRAMOS)}
              className="w-10 h-10 rounded-full border-2 border-green-700 text-green-700 font-black text-xl flex items-center justify-center hover:bg-green-700 hover:text-white transition"
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>

    <div className="flex gap-4 mt-12">
      <button
        onClick={() => setPaso(2)}
        className="flex-1 border-2 border-green-700 text-green-700 py-5 rounded-3xl text-xl font-bold hover:bg-green-700 hover:text-white transition"
      >
        ← Volver
      </button>
      <button
        onClick={() => setPaso(4)}
        className="flex-1 bg-[#143A18] hover:bg-[#1B4D22] transition py-5 rounded-3xl text-white text-xl font-bold"
      >
        Continuar →
      </button>
    </div>

  </motion.div>

)}

{paso === 4 && (

  <motion.div
    key="paso4"
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -30 }}
    transition={{ duration: .35 }}
  >

    <span className="text-green-700 font-bold uppercase tracking-widest">
      Paso 4
    </span>

    <h2 className="text-5xl font-black mt-3 text-[#143A18]">
      Tu precio
    </h2>

    <p className="mt-4 text-gray-500">
      El precio se calcula según el tamaño elegido — la misma lógica que usa el carrito.
    </p>

    <div className="mt-10 rounded-3xl bg-green-50 p-8 text-center">
      <p className="text-gray-500">Precio total</p>
      <p className="text-6xl font-black text-green-700 mt-2">${precio.toFixed(2)}</p>
      <p className="mt-2 text-gray-500">Tamaño: {tamanoActual?.etiqueta}</p>
    </div>

    <div className="flex gap-4 mt-12">
      <button
        onClick={() => setPaso(3)}
        className="flex-1 border-2 border-green-700 text-green-700 py-5 rounded-3xl text-xl font-bold hover:bg-green-700 hover:text-white transition"
      >
        ← Volver
      </button>
      <button
        onClick={() => setPaso(5)}
        className="flex-1 bg-[#143A18] hover:bg-[#1B4D22] transition py-5 rounded-3xl text-white text-xl font-bold"
      >
        Continuar →
      </button>
    </div>

  </motion.div>

)}

{paso === 5 && (

  <motion.div
    key="paso5"
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -30 }}
    transition={{ duration: .35 }}
  >

    <span className="text-green-700 font-bold uppercase tracking-widest">
      Paso 5
    </span>

    <h2 className="text-5xl font-black mt-3 text-[#143A18]">
      Resumen
    </h2>

    <p className="mt-4 text-gray-500">
      Revisa tu aliño personalizado antes de agregarlo al carrito.
    </p>

    <div className="mt-8 rounded-3xl bg-green-50 p-8 space-y-6">
      <div>
        <p className="text-gray-500">Peso</p>
        <p className="text-3xl font-black text-green-700 mt-1">{tamanoActual?.etiqueta}</p>
      </div>
      <div>
        <p className="text-gray-500">Ingredientes</p>
        <ul className="mt-2 space-y-1">
          {ingredientesSeleccionados.map((nombre) => (
            <li key={nombre} className="text-lg font-bold text-[#143A18]">
              • {nombre} — {gramosPorIngrediente[nombre] ?? 0} g
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-gray-500">Precio</p>
        <p className="text-4xl font-black text-green-700 mt-1">${precio.toFixed(2)}</p>
      </div>
    </div>

    <div className="flex gap-4 mt-12">
      <button
        onClick={() => setPaso(4)}
        className="flex-1 border-2 border-green-700 text-green-700 py-5 rounded-3xl text-xl font-bold hover:bg-green-700 hover:text-white transition"
      >
        ← Volver
      </button>
      <button
        onClick={handleAgregarAlCarrito}
        className="flex-1 bg-[#143A18] hover:bg-[#1B4D22] transition py-5 rounded-3xl text-white text-xl font-bold"
      >
        Agregar al carrito
      </button>
    </div>

  </motion.div>

)}

            </AnimatePresence>

          </div>

        </div>

      </div>

  </div>

    </section>

  );

}
