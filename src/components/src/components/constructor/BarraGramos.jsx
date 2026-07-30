export default function BarraGramos({ actual, objetivo }) {

  const porcentaje = Math.min((actual / objetivo) * 100, 100);

  return (

    <div className="space-y-2">

      <div className="flex justify-between font-semibold">

        <span>
          {actual} g
        </span>

        <span>
          {objetivo} g
        </span>

      </div>

      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">

        <div
          className="bg-green-600 h-4 transition-all duration-300"
          style={{
            width: `${porcentaje}%`
          }}
        />

      </div>

      <p className="text-sm text-gray-600">

        {actual < objetivo
          ? `Faltan ${objetivo - actual} gramos`
          : actual === objetivo
          ? "✅ Tu receta está lista"
          : `⚠️ Te excediste por ${actual - objetivo} gramos`
        }

      </p>

    </div>

  );

}
