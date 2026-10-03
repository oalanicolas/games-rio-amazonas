# Amazonas — um rio vivo

Protótipo de um laboratório 3D da paisagem amazônica, com floresta de várzea,
corrente animada, sedimentos, cheia/vazante e migração ilustrativa do canal.

## Abrir

Da raiz do workspace:

```bash
python3 framework/scripts/game.py serve prototypes/rio-amazonas
```

O comando imprime a URL conferida e serve a build de `dist/`. Primeiro uso:

```bash
npm ci
npm run doctor
```

Os comandos npm são executados nesta pasta. Desenvolvimento: `npm run dev`.

## Experimentar

Mude corrente e sedimento, avance os anos e compare vazante e cheia. “Mapa” mostra
o canal de cima; “Corte” revela o solo. Arraste para girar, role para aproximar.
“Recomeçar o experimento” restaura todos os controles. No celular, “Ajustar o rio”
abre o painel. “Ambiente” liga uma gravação opcional de água, pássaros e sapos.

Espaço pausa; V alterna vistas; R reinicia; N alterna legendas; setas voltam ou
avançam 10 anos. Preferência de movimento reduzido inicia com o relógio parado.

## Verificar

```bash
npm run doctor
npm run qa
```

QA usa o Chrome instalado e o Playwright da bancada Metal Assault; é headless
por padrão, com GPU Metal. Capturas e relatório vão ao `output/` ignorado do hub,
com arquivo no acervo do Drive. Não exige dependências do Swipe para rodar.

Direção, arquitetura, números e créditos: [game-design.md](game-design.md).
Provas e limitações: [QA.md](QA.md).

O modelo é didático e geométrico, sem calibração de campo ou trecho geográfico
exato. Os números são relativos. Não usar para prever cheias ou erosão real.
Referência de experiência: [River Bend, de Ryan Sael](https://sael.net/river-bend/),
arquivado separadamente em `swipe/river-bend`; código e arte deste protótipo são próprios.
