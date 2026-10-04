# Amazonas — um rio vivo

Material de apoio para aulas de Geografia de 6º e 7º anos: caderno de leitura,
mapa oficial da ANA, fotografia NASA, duas investigações guiadas, cinco questões
com explicação, ficha imprimível e plano de 50 minutos. Inclui o laboratório 3D
da paisagem amazônica. Relação parcial com a BNCC, sem certificação curricular.

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

Na URL impressa, abra `/escola.html` para o caderno, `/ficha.html` para a ficha
ou `/` para exploração livre. Sem WebGL, caderno e ficha continuam utilizáveis.

## Uso em escola e distribuição

O professor encontra objetivos, sequência, respostas esperadas, critérios de
observação e complementações para EF06GE04, EF06GE09 e EF07GE11 no caderno.
Registros guardam apenas configurações/índices no `sessionStorage` desta aba;
respostas às perguntas ficam em memória. Sem contas, backend ou envio de dados.

Em localhost ou HTTPS, espere “Materiais disponíveis sem internet” na seção do
professor, desligue a rede e confira o mesmo endereço antes da aula. O cache pode
ser apagado pelo navegador. Links externos exigem internet. Em HTTP de rede local,
o service worker pode ser indisponível; use o pacote servido no próprio computador.

`npm run pack` cria `output/rio-amazonas-escolas/amazonas-geografia-escolas.zip`
no hub. Extraia inteiro e execute `python3 iniciar.py` (`py iniciar.py` no Windows).
Precisa de Python 3; não precisa de npm, Node ou internet. O servidor abre apenas
localhost, mantém os recursos locais e encerra com Ctrl+C. A ficha também pode ser
impressa para uma aula sem equipamento. Publicação web não executada.

## Experimentar

Mude corrente e sedimento, avance as etapas e compare vazante e cheia. “Planta” mostra
o canal de cima; “Corte” revela o solo. Arraste para girar, role para aproximar.
“Recomeçar o experimento” restaura todos os controles. No celular, “Ajustar o rio”
abre o painel. “Ambiente” liga uma gravação opcional de água, pássaros e sapos.

Espaço pausa; V alterna vistas; R reinicia; N alterna legendas; setas voltam ou
avançam 10 etapas. Etapas não representam anos reais. Preferência de movimento
reduzido inicia e reinicia com o relógio parado. Investigações também iniciam pausadas.

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
