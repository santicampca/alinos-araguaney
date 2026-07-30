import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Personalizar() {

  const [paso, setPaso] = useState(1);

  const [tamano, setTamano] = useState({
    gramos: 400,
    nombre: "400 g"
  });

  const tamanos = [
    {
      gramos: 250,
      nombre: "250 g"
    },
    {
      gramos: 400,
      nombre: "400 g"
    },
    {
      gramos: 500,
      nombre: "500 g"
    },
    {
      gramos: 1000,
      nombre: "1 Kg"
    }
  ];

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

<div className="w-44 h-2 rounded-full bg-green-700"/>

<div className="flex-1 h-2 rounded-full bg-gray-200"/>

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

<div className="grid grid-cols-2 gap-5 mt-12">

{tamanos.map((item)=>{

const activo=tamano.gramos===item.gramos;

return(

<button

key={item.gramos}

onClick={()=>setTamano(item)}

className={`rounded-[28px] p-8 transition-all duration-300 text-3xl font-black border-2

${activo

? "bg-green-700 border-green-700 text-white scale-105 shadow-xl"

: "bg-white border-gray-200 hover:border-green-700 hover:text-green-700"

}`}

>

{item.nombre}

</button>

);

})}

</div>

<div className="mt-10 rounded-3xl bg-green-50 p-7">

<p className="text-gray-500">

Tamaño seleccionado

</p>

<p className="text-5xl font-black text-green-700 mt-2">

{tamano.nombre}

</p>

</div>

<button

onClick={()=>setPaso(2)}

className="mt-12 w-full bg-[#143A18] hover:bg-[#1B4D22] transition py-5 rounded-3xl text-white text-xl font-bold"

>

Continuar →

</button>

</motion.div>

)}              {paso === 2 && (

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
                    El tamaño seleccionado fue:
                  </p>

                  <div className="mt-8 rounded-3xl bg-green-50 p-8">

                    <p className="text-gray-500">
                      Envase
                    </p>

                    <p className="text-5xl font-black text-green-700 mt-2">
                      {tamano.nombre}
                    </p>

                  </div>

                  <button
                    onClick={() => setPaso(1)}
                    className="mt-12 w-full border-2 border-green-700 text-green-700 py-5 rounded-3xl text-xl font-bold hover:bg-green-700 hover:text-white transition"
                  >
                    ← Cambiar tamaño
                  </button>

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