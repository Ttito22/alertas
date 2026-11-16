# Alertas de passagens · casal

App pessoal (PWA) que mostra os preços das passagens acompanhadas, sempre para 2 adultos, em reais.

**Abrir:** https://ttito22.github.io/alertas/

## Rotas acompanhadas

| Viagem | Trecho | Datas cadastradas |
|---|---|---|
| Europa (20 dias) | Salvador → Madri | ida de 01/03 a 31/05/2027 |
| Europa (20 dias) | São Paulo → Barcelona | ida de 01/03 a 31/05/2027 |
| Europa (20 dias) | Roma → São Paulo/Salvador | 20 dias depois da ida |
| Lençóis Maranhenses | Salvador ↔ São Luís | ida de 27 a 30/07/2027, volta 02/08/2027 |

Fontes de preço: somente Google Voos e Skyscanner.

## Arquivos

| Arquivo | Para que serve |
|---|---|
| `index.html` | O app. Os preços ficam só no bloco `<script id="alertas">` |
| `sw.js` | Funciona sem internet e recebe as notificações |
| `manifest.webmanifest`, `icon-*.png`, `apple-touch-icon.png` | Instalação no celular e ícone |
| `.github/workflows/notificar.yml` + `.github/notificar.js` | Envia a notificação ao celular quando os preços mudam |

## Atualização

Uma tarefa agendada confere os preços 3 vezes por dia (7h41, 15h41 e 20h41, horário da Bahia), atualiza o bloco de dados com a data e a hora da verificação e publica aqui.
