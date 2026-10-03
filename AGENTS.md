# Rio Amazonas — protótipo

Laboratório 3D ilustrativo, em português. Arte procedural e código próprios.
Não importar código, shaders, layout, textos ou assets proprietários do River Bend.
O snapshot original fica em `swipe/river-bend`, fora deste módulo.

- Direção: floresta de várzea, águas barrentas, diorama com solo exposto e controles didáticos.
- Cânone: `game-design.md`. Escala jam; gênero simulation; superfície Aprender.
- `npm run doctor`: testes do modelo e build de produção.
- Servir da raiz do hub: `python3 framework/scripts/game.py serve prototypes/rio-amazonas`.
- `npm run qa`: Chrome headless, GPU Metal, sem roubar foco; usa o Playwright da bancada Metal Assault.
- `window.__AMAZONAS__.observe()` expõe estado, renderizador e áudio para QA.
- Capturas ficam no `output/` ignorado do hub e são arquivadas no acervo do Drive.
- Não apresentar os controles relativos como vazão medida, migração real ou previsão de cheia.
- Não alterar a arte para cumprir um orçamento de FPS; comparar em movimento.

## Recusado por Alan

Nenhuma recusa específica registrada nesta primeira criação.

## Aprovação visual

A referência foi escolhida pelo pedido de Alan. O protótipo ainda não recebeu aceite visual dele.
