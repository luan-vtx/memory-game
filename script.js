// Variáveis usadas para salvar os pontos do jogador, a ordem das cores geradas aleatoriamente
// e a ordem das cores clicadas pelo jogador
let score = 0;
let order = [];
let clickedOrder = [];

// Código das cores usadas no disco do jogo:
// 0 - blue
// 1 - red
// 2 - yellow
// 3 - green

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const green = document.querySelector('.green');

// Função que acende e apaga a cor dos elementos adicionado e removendo a classe selected
const lightColor = (element, number) => {
  number *= 1000;

  setTimeout(() => {
    element.classList.add("selected");
  }, number);

  setTimeout(() => {
    element.classList.remove("selected");
  }, number + 500);
}

// Retorna o elemento de acordo com o numero recebido como parâmetro
// Essa função auxilia a função click (linha 94) a adicionar ou remover a classe selected
// ao elemento clicado pelo jogador
const createColorElement = (number) => {
  if(number == 0) {
    return blue;
  } else if(number == 1) {
    return red;
  } else if(number == 2) {
    return yellow;
  } else if(number == 3) {
    return green;
  }
}

// Cria a ordem aleatória das cores que irão acender no disco
// Cada vez que essa função é inicializada, ela salva um número aleatório entre 0 e 3
// na última posição do array order
const shuffleOrder = () => {
  let sortedColor = Math.floor(Math.random() * 4);
  order[order.length] = sortedColor;

  // O array com os cliques do jogador é reiniciado a cada nova ativação dessa função
  clickedOrder = [];

  // Para cada indice do array order esse loop irá a acionar a função que acende e apaga a cor
  // do elemento que possui o valor igual daquele indice em específico.
  // Ex: se o indíce possuir o número 0, a função lightColor irá acender e apagar o elemento blue,
  // se posuir o indíce 1, a função irá acender e apagar o elemento red, e assim por diante.
  for(let i in order) {
    let elementColor = createColorElement(order[i]);
    lightColor(elementColor, Number(i) + 1);
  }
}

// Cria o próximo nível do jogo
// Incrementa o score e inicializa a função que acende as cores aleatoriamente
const nextLevel = () => {
  score += 1;
  shuffleOrder();
}

// Inicializa o jogo. Essa função é executada automaticamente na linha 113
const playGame = () => {
  alert('Bem vindo ao jogo de memória Gênesis! Boa sorte!');
  score = 0;
  nextLevel();
}

// Função ativada quando o jogador perde a partida
const gameOver = () => {
  alert(`Pontuação: ${score}\n Você perdeu o jogo!\nClique em 'OK' para iniciar uma nova partida`);
  order = [];
  clickedOrder = [];
  playGame();
}

// Checa se as cores clicadas pelo jogador são iguais as que foram geradas pela função shuffle
const checkOrder = () => {
  for(let i in clickedOrder) {
    if(clickedOrder[i] != order[i]) {
      gameOver();
      break;
    }
  }
  if(clickedOrder.length == order.length) {
    alert(`Pontuação: ${score}\nVocê acertou!\nIniciando próximo nível!`);
    nextLevel();
  }
}

// Adiciona o elemento clicado ao array clickedOrder e chama a função que verifica se a ordem está correta
const click = (color) => {
  // Adiciona o número do elemento clicado à última posição do array clickedOrder
  clickedOrder[clickedOrder.length] = color;

  // Adiciona a classe que acende o elemento
  createColorElement(color).classList.add('selected');

  // Remove a classe que acendo o elemento depois de 300 milissegundos
  setTimeout(() => {
      createColorElement(color).classList.remove('selected');
      checkOrder();
  }, 300);
}

// Adiciona escutadores de evento nos elementos do disco
// O número passado como parâmetro da função click é a número escolhido para aquela cor
// as especificações do número de cada cor está na linha 5
blue.addEventListener('click', () => click(0));
red.addEventListener('click', () => click(1));
yellow.addEventListener('click', () => click(2));
green.addEventListener('click', () => click(3));

// Inicializa o jogo assim que o script é carregado
playGame();