export default function IngredienteCard({

  ingrediente,

  gramos,

  onChange

}) {

  return (

    <div className="border rounded-xl p-4 bg-white shadow-sm">

      <div className="flex justify-between items-center">

        <div>

          <h3 className="font-bold">

            {ingrediente.nombre}

          </h3>

          <p className="text-sm text-gray-500">

            ${ingrediente.precioKilo}/kg

          </p>

        </div>

        <input

          type="number"

          min="0"

          value={gramos}

          onChange={(e)=>onChange(Number(e.target.value))}

          className="w-24 border rounded-lg p-2 text-center"

        />

      </div>

      <p className="text-sm mt-2">

        gramos

      </p>

    </div>

  );

}
