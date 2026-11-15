// Envia a notificação do app para o celular, com os preços do index.html.
const fs = require('fs');
const webpush = require('web-push');

const PUBLICA = 'BPvkP4lDxZDdncfS5HcYAtJhbB10l_zbDb6RhWZNQhCRvAMJvRGCQ_LM4Dg0PoXkPjD1Rf-myt2LbRKSfN2aY8A';
const privada = (process.env.VAPID_PRIVATE_KEY || '').trim();
const brutas = (process.env.PUSH_SUBSCRIPTION || '').trim();
if (!privada || !brutas) {
  console.log('Notificação ainda não configurada (faltam os segredos VAPID_PRIVATE_KEY ou PUSH_SUBSCRIPTION).');
  process.exit(0);
}
webpush.setVapidDetails('mailto:Ttito22@users.noreply.github.com', PUBLICA, privada);

// Aceita um ou mais códigos (um por linha), copiados do app.
function ler(codigo) {
  codigo = codigo.trim();
  if (!codigo) return null;
  if (codigo.startsWith('{')) return JSON.parse(codigo);
  const b64 = codigo.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(Buffer.from(b64, 'base64').toString('utf8'));
}
const inscricoes = brutas.split(/\s+/).map(ler).filter(Boolean);

const html = fs.readFileSync('index.html', 'utf8');
const m = html.match(/<script id="alertas" type="application\/json">([\s\S]*?)<\/script>/);
const D = JSON.parse(m[1]);
const reais = n => n == null ? 'sem tarifa' : 'R$ ' + Math.round(n).toLocaleString('pt-BR');
const seta = { baixou: ' ⬇', subiu: ' ⬆', igual: '' };
const curto = { mad: 'Madri', bcn: 'Barcelona', rom: 'Roma (volta)', slz: 'Lençóis' };

const linhas = D.rotas.map(r => `${curto[r.id] || r.nome}: ${reais(r.valor)}${seta[r.tend] || ''}`);
const baixou = D.rotas.filter(r => r.tend === 'baixou').map(r => curto[r.id] || r.nome);

const aviso = {
  title: baixou.length ? `⬇ Baixou: ${baixou.join(', ')}` : `✈️ Passagens do casal · ${D.periodo || ''}`.trim(),
  body: linhas.join('\n'),
  url: './'
};

(async () => {
  let ok = 0;
  for (const s of inscricoes) {
    try {
      await webpush.sendNotification(s, JSON.stringify(aviso), { TTL: 6 * 3600 });
      ok++;
    } catch (e) {
      console.log('Falha ao enviar para um aparelho:', e.statusCode, e.body || e.message);
    }
  }
  console.log(`Notificação enviada para ${ok} de ${inscricoes.length} aparelho(s).`);
})();
