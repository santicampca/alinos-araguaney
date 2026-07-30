import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

const ingredientes = [
  { id: "cebolla", nombre: "Cebolla", precio: 1.8 },
  { id: "cebollin", nombre: "Cebollín", precio: 2.5 },
  { id: "cilantro", nombre: "Cilantro", precio: 3.2 },
  { id: "aji", nombre: "Ají Dulce", precio: 2.9 },
  { id: "ajo", nombre: "Ajo", precio: 8.0 },
  { id: "pimenton", nombre: "Pimentón", precio: 2.7 },
];

const presentaciones = [
  { gramos: 250, envase: 0.4 },
  { gramos: 400, envase: 0.55 },
  { gramos: 500, envase: 0.65 },
  { gramos: 1000, envase: 1.0 },
];

export default function Personalization() {
  const [objetivo, setObjetivo] = useState(400);

  const [gramos, setGramos] = useState({
    cebolla: 0,
    cebollin: 0,
    cilantro: 0,
    aji: 0,
    ajo: 0,
    pimenton: 0,
  });

  const totalGramos = useMemo(() => {
    return Object.values(gramos).reduce((a, b) => a + b, 0);
  }, [gramos]);

  const precioIngredientes = useMemo(() => {
    return ingredientes.reduce((total, ing) => {
      return total + (ing.precio / 1000) * gramos[ing.id];
    }, 0);
  }, [gramos]);

  const envase =
    presentaciones.find((p) => p.gramos === objetivo)?.envase ?? 0;

  const preparacion = 1.2;

  const utilidad = 1.8;

  const total = (
    precioIngredientes +
    envase +
    preparacion +
    utilidad
  ).toFixed(2);

  const porcentaje = Math.min((totalGramos / objetivo) * 100, 100);

  return (
    <section
      id="personalizacion"
      className="py-section-gap-mobile md:py-section-gap-desktop"
    >
      <div className="max-w-[1440px] mx-auto px-grid-margin">

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >

          <p className="text-secondary uppercase tracking-widest mb-3">

            Constructor Inteligente

          </p>

          <h2 className="font-headline-lg text-primary mb-4">

            Diseña tu propio aliño

          </h2>

          <p className="mb-8 text-on-surface-variant">

            Escoge la presentación y distribuye los gramos entre los
            ingredientes.

          </p>

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <label className="font-bold">

              Presentación

            </label>

            <select
              className="w-full mt-3 mb-6 border rounded-xl p-3"
              value={objetivo}
              onChange={(e) => setObjetivo(Number(e.target.value))}
            >

              {presentaciones.map((p) => (

                <option
                  key={p.gramos}
                  value={p.gramos}
                >

                  {p.gramos} gramos

                </option>

              ))}

            </select>

            <div className="mb-6">

              <div className="flex justify-between mb-2">

                <strong>

                  {totalGramos} g

                </strong>

                <strong>

                  {objetivo} g

                </strong>

              </div>

              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">

                <div
                  className="h-4 bg-green-600 transition-all"
                  style={{
                    width: `${porcentaje}%`,
                  }}
                />

              </div>

              <p className="mt-2 text-sm">

                {totalGramos < objetivo &&
                  `Faltan ${objetivo - totalGramos} gramos`}

                {totalGramos === objetivo &&
                  "✅ Tu receta está lista"}

                {totalGramos > objetivo &&
                  `⚠️ Te excediste por ${
                    totalGramos - objetivo
                  } gramos`}

              </p>

            </div>            <div className="space-y-4">

              {ingredientes.map((ing) => (

                <div
                  key={ing.id}
                  className="flex items-center justify-between border rounded-xl p-4"
                >

                  <div>

                    <h3 className="font-bold">
                      {ing.nombre}
                    </h3>

                    <p className="text-sm text-gray-500">
                      ${ing.precio.toFixed(2)} / kg
                    </p>

                  </div>

                  <input
                    type="number"
                    min="0"
                    className="w-24 border rounded-lg p-2 text-center"
                    value={gramos[ing.id]}
                    onChange={(e) =>
                      setGramos({
                        ...gramos,
                        [ing.id]: Number(e.target.value),
                      })
                    }
                  />

                </div>

              ))}

            </div>

            <div className="mt-8 rounded-2xl bg-green-50 p-6 border">

              <div className="flex justify-between mb-2">
                <span>Ingredientes</span>
                <strong>${precioIngredientes.toFixed(2)}</strong>
              </div>

              <div className="flex justify-between mb-2">
                <span>Envase</span>
                <strong>${envase.toFixed(2)}</strong>
              </div>

              <div className="flex justify-between mb-2">
                <span>Preparación</span>
                <strong>${preparacion.toFixed(2)}</strong>
              </div>

              <div className="flex justify-between mb-4">
                <span>Utilidad</span>
                <strong>${utilidad.toFixed(2)}</strong>
              </div>

              <hr className="mb-4" />

              <div className="flex justify-between text-xl font-bold">

                <span>Total estimado</span>

                <span>${total}</span>

              </div>

            </div>

            <button
              disabled={totalGramos !== objetivo}
              className={`w-full mt-6 py-4 rounded-xl font-bold transition ${
                totalGramos === objetivo
                  ? "bg-primary text-white"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >

              {totalGramos === objetivo
                ? "Agregar al carrito"
                : "Completa los gramos"}

            </button>

          </div>

        </motion.div>

      </div>

    </section>

  );

}
