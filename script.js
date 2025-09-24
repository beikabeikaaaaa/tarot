const sampleCards = [
  {id:1,name:"The Fool",img:"assets/cards/fool.svg",upright:"Beginnings, innocence, spontaneity, a free spirit.",reversed:"Recklessness, taken advantage of, inconsideration."},
  {id:2,name:"The Magician",img:"assets/cards/magician.svg",upright:"Manifestation, resourcefulness, power, inspired action.",reversed:"Manipulation, poor planning, latent talents."},
  {id:3,name:"The High Priestess",img:"assets/cards/highpriestess.svg",upright:"Intuition, sacred knowledge, divine feminine, the subconscious mind.",reversed:"Secrets, disconnected from intuition, withdrawal."},
  {id:4,name:"The Empress",img:"assets/cards/empress.svg",upright:"Femininity, beauty, nature, nurturing, abundance.",reversed:"Creative blocks, dependence on others."},
  {id:5,name:"The Emperor",img:"assets/cards/emperor.svg",upright:"Authority, establishment, structure, a father figure.",reversed:"Domination, excessive control, rigidity."},
  {id:6,name:"The Lovers",img:"assets/cards/lovers.svg",upright:"Love, harmony, relationships, values alignment.",reversed:"Disharmony, imbalance, misalignment of values."}
];

let deck = [];
let drawn = [];
const deckEl = document.getElementById('deck');
const slots = document.querySelectorAll('.slot');
const shuffleBtn = document.getElementById('shuffleBtn');
const drawBtn = document.getElementById('drawBtn');
const resetBtn = document.getElementById('resetBtn');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const cardDetail = document.getElementById('cardDetail');

function initDeck(){
  deck = [...sampleCards];
  drawn = [];
  slots.forEach(s=>s.innerHTML='');
}
function shuffleDeck(){
  for(let i=deck.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [deck[i],deck[j]]=[deck[j],deck[i]];
  }
}
function drawThree(){
  if(deck.length < 3) return alert("Not enough cards. Reset.");
  drawn = [];
  for(let i=0;i<3;i++){
    const card = deck.pop();
    const isReversed = Math.random() < 0.5;
    drawn.push({...card,isReversed});
  }
  showDrawn();
}
function cardNode(card){
  const node = document.createElement('div');
  node.className = 'card back';
  const inner = document.createElement('div');
  inner.className = 'inner';
  const img = document.createElement('img');
  img.src = card.img;
  img.alt = card.name;
  inner.appendChild(img);
  node.appendChild(inner);
  if(card.isReversed){
    node.style.transform = 'rotate(180deg)';
  }
  return node;
}
function showDrawn(){
  slots.forEach((slot,idx)=>{
    slot.innerHTML='';
    const node = cardNode(drawn[idx]);
    node.style.transitionDelay = (idx*180)+'ms';
    slot.appendChild(node);
    setTimeout(()=>{
      node.classList.add('flipped','revealed');
      node.classList.remove('back');
    }, 200 + idx*220);
    slot.onclick = ()=>openModal(drawn[idx]);
  });
}
function openModal(card){
  modal.classList.remove('hidden');
  const meaning = card.isReversed ? card.reversed : card.upright;
  const state = card.isReversed ? 'Reversed' : 'Upright';
  cardDetail.innerHTML = `<h2>${card.name} — ${state}</h2><p>${meaning}</p>`;
}
closeModal.addEventListener('click',()=>modal.classList.add('hidden'));
shuffleBtn.addEventListener('click',()=>shuffleDeck());
drawBtn.addEventListener('click',()=>drawThree());
resetBtn.addEventListener('click',()=>initDeck());
initDeck();
