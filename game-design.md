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
anima a corrente. `laboratorio.html` e `src/style.css` contêm a interface. Não há backend,
conta ou recurso remoto necessário ao conteúdo didático. No domínio público,
GTM-TT2J9B4B mede acessos; respostas e registros nunca são transmitidos.
Em localhost e no pacote escolar, serviços de estatísticas não carregam. Na versão escolar,
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
Extensão de 04/10/2026 autorizada por Alan: apresentação com skin Rabisco e
publicação em geografia.rabisco.net. Reuso da marca, textura de papel e fonte
Caveat de Universo Rabisco/Distrito; tinta #1018ad, amarelo #ffcf23 e papel
#f6f3e6 do design system da família. Barlow permanece no texto didático.
A cena e o modelo são preservados; `index.html` passa a abrir o caderno.
Origem e hashes dos arquivos reutilizados em `public/marca/SOURCE.json`.
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
Alan autorizou criação de remoto, push e deploy ao pedir geografia.rabisco.net. Nenhuma dessas escolhas equivale a aceite visual.

## QA e continuidade

### Extensão: Terremotos — 04/10/2026

Pedido de Alan: arquivar Earthquake Tower e acrescentar aula de Geografia.
Reuso: marca, papel, tipografia e componentes do caderno Rabisco, Three.js e
OrbitControls já instalados, mecanismo offline e perguntas formativas locais.
Lacuna de arte: não havia torres ou mesa vibratória neste módulo; arquitetura,
janelas, reforços, plantas, molas, mesa e contornos foram feitos proceduralmente.
Não são cópias dos assets da referência. A comparação permite duas respostas sob
a mesma excitação; a referência permanece creditada e separada em Swipe.

Modelo próprio, um grau de liberdade por torre, deslocamento relativo x:
`x'' + 2ζω x' + ω²x = -a_mesa(t)`. Frequência natural ilustrativa:
`10 / andares × sqrt(reforço ? 3 : 1)` Hz. Andares 2–14, amortecimento 2–25%,
mesa 0,3–9 Hz. Amplitude abstrata fixa 0,08; RK4 a 240 Hz, duração 20 s.
Ritmo constante tem rampa de entrada de 2 s, com derivadas incluídas na aceleração;
evita a velocidade inicial artificial da excitação abrupta. A falha inicial no
teste de troca de torre dominante foi corrigida pelo modelo, sem relaxar a asserção.
Composta: soma de 0,65/1,4/2,8/4,4 Hz com pesos 0,4/0,3/0,2/0,1.
Impulso: pulso suave de deslocamento `0,08 sin²(πt/0,4)` entre 0 e 0,4 s,
sem deslocamento posterior. Não são registros sísmicos. Gráfico mostra resposta
teórica estacionária; picos do ensaio incluem transiente. Deformação por altura
é uma escolha visual, não análise por andar; escala visual ×3 explicitada.
Não reivindica paridade com o modelo de vários graus de liberdade da referência.

6º/7º anos, 50 min, localizar placas e Brasil, foco/epicentro, magnitude/intensidade,
comparar ritmos e rigidez, discutir ocupação/vulnerabilidade e limites de modelos.
EF06GE11 parcial, sem cobertura completa da habilidade. Cinco questões permitem
retomada; ficha com hipótese, tabela de três ensaios e interpretação territorial.
Sem WebGL há modelo numérico; sem JavaScript, leitura, atividades escritas e ficha.
Sem contas ou envio de respostas, registros só da aba. Sem certificação curricular,
piloto docente ou aceite visual de Alan.

Fontes primárias: USGS, ciência de terremotos, magnitude/intensidade e modelos
didáticos (links no caderno); mapa de placas This Dynamic Planet, domínio público;
IAG-USP, relatório de sismo no Maranhão de 2017; MEC, BNCC, p. impressa 385;
UNDRR, terminologia de risco e vulnerabilidade. Créditos do mapa em
`public/terremotos/SOURCE.json`; imagens de divulgação saem do próprio renderizador.


`npm run doctor` testa regras que diferenciam os estados e gera a build.
`npm run qa` verifica entrada, relógio, pausa, retrocesso, ciclos, controles,
vistas, órbita, áudio real, ajuda, reinício, teclado, responsividade e movimento
reduzido no navegador. Recibo e limites em `QA.md` após execução.

Extensão escolar inclui duas comparações com variáveis controladas, cinco questões
formativas com tentativa novamente, leitura cartográfica, explicação dos limites,
sequência docente e ficha. Critério de entrega: todo o fluxo no navegador, materiais
offline, impressão legível e build servida conferida. Aplicação com turma real e
aceite visual de Alan permanecem fora da evidência técnica.
