export function precioPorGramo(precioKilo) {
  return precioKilo / 1000;
}

export function costoIngrediente(precioKilo, gramos) {
  return precioPorGramo(precioKilo) * gramos;
}

export function gramosTotales(lista) {

  return lista.reduce((total, ingrediente) => {

    return total + ingrediente.gramos;

  }, 0);

}

export function costoIngredientes(lista) {

  return lista.reduce((total, ingrediente) => {

    return total + costoIngrediente(
      ingrediente.precioKilo,
      ingrediente.gramos
    );

  }, 0);

}

export function calcularPrecioFinal({

  ingredientes,

  costoEnvase,

  costoPreparacion,

  margen

}) {

  const ingredientesTotal = costoIngredientes(ingredientes);

  return Number(

    (
      ingredientesTotal +
      costoEnvase +
      costoPreparacion +
      margen

    ).toFixed(2)

  );

}
