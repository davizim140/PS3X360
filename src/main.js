import './style.css';

const icons = {
  jogos: '<path d="M7 10h10a5 5 0 0 1 4.8 3.6l1.5 5.1a2.5 2.5 0 0 1-4 2.7L15.5 19h-7l-3.8 2.4a2.5 2.5 0 0 1-3.7-2.7l1.5-5.1A5 5 0 0 1 7 10Z"/><path d="M8 13v5m-2.5-2.5h5M16 14h.1m3 3h.1"/>',
  usuarios: '<circle cx="9" cy="8" r="3"/><path d="M3 21v-2a6 6 0 0 1 12 0v2M16 5a3 3 0 0 1 0 6m2 4a5 5 0 0 1 4 5v1"/>',
  rede: '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 9h18M3 15h18"/>',
  amigos: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="10" r="2.5"/><path d="M2 21v-2a7 7 0 0 1 14 0v2m2-5a5 5 0 0 1 4 5"/>',
  configuracoes: '<circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.6a8 8 0 0 1-1.8 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.8-1l-1.7.6-1.4-2.4 1.4-1.1a8 8 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.6a8 8 0 0 1 1.8-1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.8 1l1.7-.6 1.4 2.4-1.4 1.1a8 8 0 0 1 0 2Z"/>',
  musica: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  foto: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8" cy="10" r="1.5"/><path d="m4 17 5-4 4 3 3-3 5 4"/>',
  video: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m10 9 5 3-5 3Z"/>'
};

const groups = [
  { id:'jogos', label:'Jogo', items:[
    ['Continuar jogo','Retome sua aventura a partir do último jogo utilizado.','▸'],
    ['Utilitário de dados de jogo','Gerencie os dados instalados pelos seus jogos.','▤'],
    ['Utilitário de dados salvos','Acesse os dados salvos disponíveis neste sistema.','▣'],
    ['PS3X360 — Informações','Projeto homebrew em desenvolvimento. Ainda não é um executável Xbox.','◇']
  ]},
  { id:'usuarios', label:'Usuários', items:[
    ['Utilizador local','Perfil local de demonstração da interface.','♙'],
    ['Criar novo usuário','Opção visual para uma futura implementação.','＋']
  ]},
  { id:'rede', label:'Rede', items:[
    ['Navegador de Internet','Acesso à rede — integração futura.','◎'],
    ['Pesquisa na Internet','Pesquisa — integração futura.','⌕']
  ]},
  { id:'amigos', label:'Amigos', items:[
    ['Lista de amigos','A lista online não está implementada nesta versão.','♧'],
    ['Mensagens','Mensagens online — integração futura.','✉']
  ]},
  { id:'musica', label:'Música', items:[
    ['Reprodutor de música','Selecione esta opção para ver o estado do módulo.','♫'],
    ['Dispositivo USB','Suporte a dispositivos ainda não implementado.','▤']
  ]},
  { id:'foto', label:'Foto', items:[
    ['Visualizador de fotos','Galeria de imagens — integração futura.','▧'],
    ['Dispositivo USB','Suporte a dispositivos ainda não implementado.','▤']
  ]},
  { id:'video', label:'Vídeo', items:[
    ['Reprodutor de vídeo','Reprodução de mídia — integração futura.','▶'],
    ['Dispositivo USB','Suporte a dispositivos ainda não implementado.','▤']
  ]},
  { id:'configuracoes', label:'Configurações', items:[
    ['Configurações do sistema','Configurações nativas não disponíveis na prévia web.','⚙'],
    ['Configurações de tema','O visual XMB azul está ativo.','◌'],
    ['Controles','Use as setas, Enter e Esc para navegar na prévia.','⌘'],
    ['Sobre o projeto','Interface web separada da futura compilação nativa.','ⓘ']
  ]}
];

let categoryIndex = 0;
let itemIndex = 0;
let toastTimer;
const app = document.querySelector('#app');

app.innerHTML = `
  <div class="sky"></div><div class="waves"><i></i><i></i><i></i><i></i></div><div class="particles" id="particles"></div>
  <header><div class="brand">PS3<span>X360</span></div><div class="right"><span class="online-dot"></span><span>Utilizador local</span><time id="clock">--:--</time></div></header>
  <main><nav class="categories" id="categories" aria-label="Categorias"></nav>
    <section class="menu-area"><div class="menu-title" id="menuTitle"></div><div class="items" id="items"></div></section>
    <aside class="description" aria-live="polite"><div class="desc-line"></div><strong id="descTitle"></strong><p id="descText"></p></aside>
  </main>
  <div class="toast" id="toast" role="status"></div>
  <footer><div class="controls"><span><b>← →</b> Categoria</span><span><b>↑ ↓</b> Selecionar</span><span><b>↵</b> Confirmar</span><span><b>Esc</b> Voltar</span></div><span class="footnote">PS3X360 · interface web experimental</span></footer>
`;

const categoryRoot = document.querySelector('#categories');
categoryRoot.innerHTML = groups.map((g, i) => `<button class="category ${i===0?'active':''}" data-index="${i}" aria-label="${g.label}" title="${g.label}"><svg viewBox="0 0 24 24" aria-hidden="true">${icons[g.id]}</svg><span>${g.label}</span></button>`).join('');

function renderItems() {
  const group = groups[categoryIndex];
  const root = document.querySelector('#items');
  document.querySelector('#menuTitle').textContent = group.label;
  root.innerHTML = group.items.map((it, i) => `<button class="item ${i===itemIndex?'selected':''}" data-index="${i}"><span class="item-icon">${it[2]}</span><span>${it[0]}</span><span class="chevron">›</span></button>`).join('');
  document.querySelectorAll('.category').forEach((el,i) => el.classList.toggle('active', i===categoryIndex));
  const selected = group.items[itemIndex];
  document.querySelector('#descTitle').textContent = selected[0];
  document.querySelector('#descText').textContent = selected[1];
}
function toast(message) {
  const el = document.querySelector('#toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2800);
}
function choose() {
  const [name, description] = groups[categoryIndex].items[itemIndex];
  if (name === 'Sobre o projeto' || name === 'PS3X360 — Informações') {
    toast('PS3X360 do zero: interface web em desenvolvimento. Nenhum XEX foi confirmado.');
  } else if (name === 'Configurações de tema') {
    document.body.classList.toggle('soft-glow');
    toast('Efeito visual alternado.');
  } else {
    toast(description);
  }
}
document.addEventListener('keydown', e => {
  if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Enter','Escape',' '].includes(e.key)) e.preventDefault();
  if (e.key === 'ArrowRight') { categoryIndex = (categoryIndex+1)%groups.length; itemIndex=0; renderItems(); }
  if (e.key === 'ArrowLeft') { categoryIndex = (categoryIndex-1+groups.length)%groups.length; itemIndex=0; renderItems(); }
  if (e.key === 'ArrowDown') { itemIndex=(itemIndex+1)%groups[categoryIndex].items.length; renderItems(); }
  if (e.key === 'ArrowUp') { itemIndex=(itemIndex-1+groups[categoryIndex].items.length)%groups[categoryIndex].items.length; renderItems(); }
  if (e.key === 'Enter' || e.key === ' ') choose();
  if (e.key === 'Escape') toast('Voltar: não há tela anterior nesta prévia.');
});
categoryRoot.addEventListener('click', e => {
  const btn=e.target.closest('.category'); if(!btn) return;
  categoryIndex=Number(btn.dataset.index); itemIndex=0; renderItems();
});
document.querySelector('#items').addEventListener('click', e => {
  const btn=e.target.closest('.item'); if(!btn) return;
  itemIndex=Number(btn.dataset.index); renderItems();
  if (e.detail > 0) choose();
});
function updateClock() {
  const now = new Date();
  document.querySelector('#clock').textContent = now.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
}
updateClock(); setInterval(updateClock, 15000);
const particleRoot = document.querySelector('#particles');
for(let i=0;i<28;i++) {
  const dot=document.createElement('i');
  dot.className='particle';
  dot.style.left=(Math.random()*100)+'%';
  dot.style.animationDuration=(12+Math.random()*24)+'s';
  dot.style.animationDelay=(-Math.random()*30)+'s';
  dot.style.setProperty('--drift',(Math.random()*90-45)+'px');
  particleRoot.appendChild(dot);
}
renderItems();
