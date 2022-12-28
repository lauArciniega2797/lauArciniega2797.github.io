// 1:piedra, 2:papel, 3:tijeras
let victorias = 0
let derrotas = 0
let empates = 0
let jugador = 0
let pc = 0
const bttns_1 = document.querySelector('#buttons button:nth-child(1)')
const bttns_2 = document.querySelector('#buttons button:nth-child(2)')
const bttns_3 = document.querySelector('#buttons button:nth-child(3)')
const pc_answer_emoji = document.querySelector('#pc_response p span:nth-child(1)')
const pc_answer_txt = document.querySelector('#pc_response p span:nth-child(2)')
const notify = document.querySelector('#notify')
const notify_txt = document.querySelector('#notify div p')
const ur_answer_emoji = document.querySelector('#ur_response p span:nth-child(1)')
const ur_answer_txt = document.querySelector('#ur_response p span:nth-child(2)')
const vic_txt = document.querySelector('#marcador p#victorias span:nth-child(1)')
const der_txt = document.querySelector('#marcador p#derrotas span:nth-child(1)')
const emp_txt = document.querySelector('#marcador p#empate span:nth-child(1)')


document.querySelector('#notify').addEventListener('click', () => {
  closeNotify()
})
document.querySelector('#notify div button').addEventListener('click', () => {
  closeNotify()
})

const user_selection = (opc) => {
  if(victorias < 3 && derrotas < 3){
    if (bttns_1.classList.contains('active')) bttns_1.classList.remove('active')
    if (bttns_2.classList.contains('active')) bttns_2.classList.remove('active')
    if (bttns_3.classList.contains('active')) bttns_3.classList.remove('active')
  
    switch (opc) {
      case 1://piedra
        jugador = 1
        bttns_1.classList.add('active')
        ur_answer_emoji.innerHTML = '🪨'
        ur_answer_txt.innerHTML = 'Piedra'
        break;
      case 2://papel
        jugador = 2
        bttns_2.classList.add('active')
        ur_answer_emoji.innerHTML = '📄'
        ur_answer_txt.innerHTML = 'Papel'
        break;
      case 3://tijera
        jugador = 3
        bttns_3.classList.add('active')
        ur_answer_emoji.innerHTML = '✂️'
        ur_answer_txt.innerHTML = 'Tijera'
        break;
    }

    pc_game()
    combate()
  }
  else { 
    combate()
  }
}
const pc_game = () => {
  pc = Math.floor(Math.random() * 3) + 1;
  let answer_e, answer_t
  switch (pc) {
    case 1:
      answer_e = '🪨'
      answer_t = 'Piedra'
      break;
    case 2:
      answer_e = '📄'
      answer_t = 'Papel'
      break;
    case 3:
      answer_e = '✂️'
      answer_t = 'Tijera'
      break;
    default:
      answer_e = '👀'
      answer_t = 'Esperando...'
      break;
  }
  pc_answer_emoji.innerHTML = answer_e
  pc_answer_txt.innerHTML = answer_t
}
const combate = () => {
  let op = jugador - pc
  if (victorias < 3 && derrotas < 3) {
    switch (op) {
      case 0:
        marcador_update(0)
        break;
      case -2: //a esto se le llama fall-through, es como un OR
      case 1:
        marcador_update(1)
        break;
      default:
        marcador_update(2)
        break;
    }
  }
  else {
    // setTimeout(() => {
    notify.classList.add('active')

    if (victorias == 3) {
      notify_txt.innerHTML = '👍 Ganaste!'
    }
    if (derrotas == 3) {
      notify_txt.innerHTML = '👎 Perdiste!'
    }
    // }, 1000)
  }
}
const marcador_update = (res) => {
  switch (res) {
    case 0: //empate
      empates += 1
      emp_txt.innerHTML = empates
      break;
    case 1: //victorias
      victorias += 1
      vic_txt.innerHTML = victorias
      break;
    case 2: //derrotas
      derrotas += 1
      der_txt.innerHTML = derrotas
      break;
  }
}
const restarValues = () => {
  pc_answer_emoji.innerHTML = '👀'
  pc_answer_txt.innerHTML = 'Esperando...'
  ur_answer_emoji.innerHTML = '👀'
  ur_answer_txt.innerHTML = 'Esperando...'
  jugador = 0
  pc = 0
  if (bttns_1.classList.contains('active')) bttns_1.classList.remove('active')
  if (bttns_2.classList.contains('active')) bttns_2.classList.remove('active')
  if (bttns_3.classList.contains('active')) bttns_3.classList.remove('active')

  victorias = 0
  derrotas = 0
  empates = 0
  der_txt.innerHTML = '0'
  vic_txt.innerHTML = '0'
  emp_txt.innerHTML = '0'
}
const closeNotify = () => {
  const notify = document.querySelector('#notify')
  notify.classList.remove('active')

  restarValues()
}

//FALL THROUGH = https://www.google.com/search?q=fall+through+JS&rlz=1C1YTUH_esMX1005MX1005&sxsrf=ALiCzsaOndeNzD2WJA3ykqqGrpNWzeEaHQ%3A1671038270685&ei=PgWaY8OnKauxqtsPotibmAI&ved=0ahUKEwjDvp7Uzvn7AhWrmGoFHSLsBiMQ4dUDCA8&uact=5&oq=fall+through+JS&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzIJCAAQFhAeEPEEMgYIABAWEB4yBggAEBYQHjIGCAAQFhAeOgoIABBHENYEELADOgYIIxAnEBM6BAgAEEM6BQgAEIAEOggIABCABBDLAToICC4QgAQQywE6CAgAEBYQHhAKSgQIQRgASgQIRhgAUPoIWJUPYP4QaAFwAXgAgAF-iAHaApIBAzAuM5gBAKABAcgBB8ABAQ&sclient=gws-wiz-serp
