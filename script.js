// Intercepta o clique no botão "SORTEAR"
document.getElementById('btn-sort').addEventListener('click', function (event) {
  event.preventDefault();

  const numeros = sortearNumeros();
  displayResults(numeros);
});

// Botão que permite novo sorteio
document.getElementById('btn-reset').addEventListener('click', function () {
  document.getElementById('form-container').style.display = 'block';
  document.getElementById('result').style.display = 'none';
  document.getElementById('result-numbers').innerHTML = '';
});

function sortearNumeros() {
  const quantidade = parseInt(document.getElementById('number').value);
  const de = parseInt(document.getElementById('from').value);
  const ate = parseInt(document.getElementById('to').value);

  // Se o checkbox estiver marcado, NÃO se permite números repetidos
  const permitirRepetidos = !document.getElementById('toggle').checked;

  const numeros = [];

  if (permitirRepetidos) {
    for (let i = 0; i < quantidade; i++) {
      const numero = Math.floor(Math.random() * (ate - de + 1)) + de;
      numeros.push(numero);
    }
  } else {
    if (quantidade > ate - de + 1) {
      alert('A quantidade de números é maior que o intervalo disponível!');
      return [];
    }
    while (numeros.length < quantidade) {
      const numero = Math.floor(Math.random() * (ate - de + 1)) + de;
      if (!numeros.includes(numero)) {
        numeros.push(numero);
      }
    }
  }

  return numeros;
}

function displayResults(numbers) {
  const resultContainer = document.getElementById('result-numbers');
  resultContainer.innerHTML = '';

  numbers.forEach((number, index) => {
    // Cria cada bloco do número
    const numberSquare = document.createElement('div');
    numberSquare.className = 'number-square';

    const inner = document.createElement('div');
    inner.className = 'number-square-inner';

    const front = document.createElement('div');
    front.className = 'number-square-front';

    const back = document.createElement('div');
    back.className = 'number-square-back';
    back.textContent = number;

    inner.appendChild(front);
    inner.appendChild(back);
    numberSquare.appendChild(inner);
    resultContainer.appendChild(numberSquare);

    // Anima a rotação com atraso sequencial
    setTimeout(() => {
      inner.style.animation = 'spin 1s ease-out forwards';
    }, index * 200);
  });

  document.getElementById('form-container').style.display = 'none';
  document.getElementById('result').style.display = 'block';
}

const btn = document.querySelector('.luck-btn');
let angle = 0;

function tick(){
  angle = (angle + 1) % 360;
  btn.style.setProperty('--angle', angle + 'deg');
  requestAnimationFrame(tick);
}
tick();

const resultDiv = document.getElementById('result');
const btnSort = document.getElementById('btn-sort');
const btnReset = document.getElementById('btn-reset');

btnSort.addEventListener('click', () => {
  document.body.classList.add('has-result');
  resultDiv.classList.add('show');
});

btnReset.addEventListener('click', () => {
  document.body.classList.remove('has-result');
  resultDiv.classList.remove('show');
});

