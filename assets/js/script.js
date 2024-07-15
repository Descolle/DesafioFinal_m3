let dato = {};
const btn = document.querySelector("#btn-1");

async function CambioMonedas() {
  try {
    const res = await fetch("https://mindicador.cl/api/");
    dato = await res.json();
    console.log(dato);
  } catch (error) {
    let response = document.querySelector(".result");
    response.textContent = ` No Podemos atender tu solicitud ahora mismo`;
    console.error(` Se ha presentado un ${error}`);
  }
}
CambioMonedas();

const convertirValor = function () {
  let input = document.querySelector("#input").value;
  let coin = document.querySelector("#moneda").value;
  let valorConvertido = input / dato[coin].valor;
  let response = document.querySelector(".result");
  response.textContent = ` Tienes el equivalente a ${valorConvertido.toFixed(2)}`;
};

btn.addEventListener("click", convertirValor);

//grafica

async function getAndCreateDataToChart(coin) { //se Llama a coin para que sea responsive al momento de pedir los valores a graficar
  const res = await fetch(`https://mindicador.cl/api/${coin}`);
  const valores = await res.json();
  const ultimosDiez = valores.serie.slice(21, 30).reverse(); //el slice es para solo tomar los valores de los últimos 10 días y el reverse para que los muestre de < a >
  //serie porque dentro de valores está la serie

  const labels = ultimosDiez.map((dia) => { //eje X
    return dia.fecha;
  });
  const data = ultimosDiez.map((dia) => { //Eje Y
    return dia.valor;
  });

  const datasets = [
    {
      label: "últimos 10 días", //titulo
      borderColor: "rgb(255, 99, 132)",
      data,
    },
  ];
  return { labels, datasets };
}
async function renderGrafica(coin) { //volver a llamar a la constante coin
  const data = await getAndCreateDataToChart(coin);
  const config = {
    type: "line", //tipo de gr
    data,
  };
  const myChart = document.getElementById("myChart");
  myChart.style.backgroundColor = "white";
  new Chart(myChart, config);
}
btn.addEventListener("click", () => {
  const coin = document.querySelector("#moneda").value;
  renderGrafica(coin);
});

