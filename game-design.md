# Amazonas — um rio vivo

## Visão, brief e design

Pedido: arquivar `https://sael.net/river-bend/` no Swipe e criar em `prototypes/`
uma experiência desse tipo sobre o Rio Amazonas. A pergunta deste protótipo é se
um diorama interativo explica, por observação direta, a relação entre corrente,
sedimentos, migração das margens e pulso de inundação.

Extensão autorizada: Alan pediu preparação para uso em escolas em Geografia.
Público adotado: 6º e 7º anos; complementar ao currículo e à mediação docente.
Escala: product. Gênero: simulation. Plataforma: navegador desktop e móvel.
Lente: Aprender. A pessoa observa o canal, muda corrente ou sedimento, corre os
etapas, compara cheia/vazante e reinicia o experimento. Não há vitória nem derrota.

Escopo: um diorama; três ciclos das águas; três vistas; evolução de 0 a 300
etapas; velocidades de 2, 8 e 24 etapas/s; pausa, retrocesso, reinício, legendas e
ambiente sonoro opcional. O início também permite arrastar para orbitar e usar a
roda para aproximar. No celular, o painel abre por “Ajustar o rio”.

## Hipóteses de experiência

A cheia deve inundar visivelmente mais floresta que a vazante. A alteração da
corrente deve modificar a geometria ao avançar o tempo. A rampa da margem interna
e o barranco externo devem permitir entender deposição e erosão sem abrir a ajuda.
Voltar para a mesma etapa com os mesmos controles deve recuperar a mesma paisagem.

## Arquitetura e modelo

Three.js 0.183.2, Vite e JavaScript ES modules. `src/model.js` define estado,
centro do canal, margens e métricas. `src/main.js` constrói a cena, liga controles e
anima a corrente. `index.html` e `src/style.css` contêm a interface. Não há backend,
conta, telemetria ou recurso remoto necessário em execução. Na versão escolar,
registros anônimos de configurações ficam em sessionStorage; quiz fica em memória.
O caderno e a ficha não importam Three.js e permitem leitura sem WebGL/JavaScript.
Um service worker guarda a build inteira, com cache identificado pelo hash dos
arquivos. A confirmação offline espera ativação da nova versão. Pacote ZIP contém
servidor localhost Python e todos os materiais, sem depender de Node.

O centro do canal soma duas senoides e varia amplitude/fase com etapa, corrente e
sedimento. A largura aumenta com pouca carga sedimentar; as margens derivam da
distância ao canal e do sinal da curvatura. Cheia/transição/vazante escolhem o nível
de água. Sinuosidade é comprimento amostrado dividido por comprimento longitudinal;
área alagada é fração das amostras de terra cobertas pela água; migração é um índice
relativo de deslocamento. Não são medidas de um trecho real.

Todas as constantes de geometria, relógio e arte são `assumed`: escolhas próprias
para uma demonstração didática, não parâmetros copiados da referência nem calibrados
por dados de campo. Comprimento/largura do diorama (180/108 unidades), canal (13–20
unidades), etapas (0–300) e controles relativos (10–100% e 0–100%) constam em `src/model.js`.
O identificador interno `year` é histórico: na interface e na proposta escolar,
não corresponde a ano ou duração física. Cheia/vazante não avançam esse eixo.
O terreno tem relevo exagerado. Não há solução hidrodinâmica, previsão de risco,
rompimento de meandros ou reconstrução cartográfica do Amazonas.

## Design system e arte

Verde profundo de laboratório, papel quente, areia dourada e água ocre. Tipografia
Georgia no título; Barlow e IBM Plex Mono, do acervo compartilhado, no HUD.
Floresta de copas largas, palmeiras, sub-bosque e margens expostas; três camadas de
copas por árvore, sombra real, solo estratificado, reflexos procedurais e partículas
de transporte. HUD compacto e evolução horizontal. A planta enquadra a paisagem de cima;
o corte usa câmera mais baixa para mostrar o solo. Sem modo visual simplificado.

Reuso: fontes de `shared/studio-fonts`, som CC0 de `shared/sfx` e Three.js MIT.
Não usar `shared/rabisco`: a experiência não pertence ao universo Rabisco.
Lacuna que justifica arte nova: não existe neste alvo uma paisagem amazônica aprovada.
Terreno, plantas, água, placa e interface foram construídos para este protótipo.

## Proveniência

- Cartografia escolar: ANA, Região Hidrográfica Amazônica, publicação de 11/12/2017;
  PDF integral e prévia JPEG sem recorte ou edição cartográfica. Portal declara
  CC BY-ND 3.0; conversão de formato conserva conteúdo e atribuição, sem endosso.
  Escala numérica da folha original não se aplica ao redimensionamento na tela.
- Foto: NASA/ISS, ISS064-E-14990, 23/12/2020, região de Parintins. Arquivo e
  proveniência em `public/geografia/fontes.json`. Sem alegação de imagem atual.
- Currículo: MEC, BNCC, Geografia, páginas impressas 385 e 387 do PDF oficial.
  Apoio parcial a EF06GE04/EF06GE09/EF07GE11; complementações explícitas no plano.
- Ciclo da água: USGS Water Science School, ciclo e infiltração, links no caderno.

- Conceito de meandros: [USGS](https://www.usgs.gov/educational-resources/find-feature-meander).
- Sedimentos e várzea amazônica: [NASA](https://science.nasa.gov/earth/earth-observatory/muddy-water-and-a-wide-floodplain-151078/).
- Referência de experiência indicada por Alan: [River Bend, Ryan Sael](https://sael.net/river-bend/).
  Snapshot separado, todos os direitos do autor preservados; nenhum código ou asset
  proprietário foi incorporado aqui. Este modelo geométrico é independente do modelo
  científico usado pelo original. Não reivindicar equivalência física ou visual exata.
- Barlow, Jeremy Tribby, e IBM Plex Mono, IBM: SIL Open Font License 1.1.
- Three.js: MIT. Fontes conservam as licenças em `public/fonts/Barlow-OFL.txt` e
  `public/fonts/IBMPlexMono-OFL.txt`; engine em `node_modules/three/LICENSE`.
- Ambiente: [Park ambiences, Thimras](https://opengameart.org/content/park-ambiences),
  CC0-1.0, acervo `thimras-park-park-ambience-river`. Original WAV SHA-256
  `da0c0c9b1249a83a1611cc116d5737b0864a8db9f45f1ae8dcc079d0f7c0bbbf`.
  Derivação: primeiros 36 segundos, fades de dois segundos, Opus 128 kbit/s,
  estéreo 48 kHz. Gravação australiana, identificada como ambiente ilustrativo,
  não como áudio captado no Amazonas. Reprodução só após ação explícita.

## Decisões tomadas sem Alan

Implementação própria do laboratório, modelo ilustrativo com controles relativos,
nome Amazonas — um rio vivo, assets procedurais, execução local e fontes offline.
Sem banco. Público 6º/7º anos, aulas em dupla ou por projetor, registros sem
identidade e material imprimível; não há piloto com turma real ou validação docente.
Trabalho fica local; criação de remoto, push e deploy
exigem pedido de publicação. Nenhuma dessas escolhas equivale a aceite visual.

## QA e continuidade

`npm run doctor` testa regras que diferenciam os estados e gera a build.
`npm run qa` verifica entrada, relógio, pausa, retrocesso, ciclos, controles,
vistas, órbita, áudio real, ajuda, reinício, teclado, responsividade e movimento
reduzido no navegador. Recibo e limites em `QA.md` após execução.

Extensão escolar inclui duas comparações com variáveis controladas, cinco questões
formativas com tentativa novamente, leitura cartográfica, explicação dos limites,
sequência docente e ficha. Critério de entrega: todo o fluxo no navegador, materiais
offline, impressão legível e build servida conferida. Aplicação com turma real e
aceite visual de Alan permanecem fora da evidência técnica.
