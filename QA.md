# Verificação — 03/10/2026

## Resultado

- `npm run doctor`: testes do modelo e build de produção passaram.
- `npm run qa`: 26 de 26 cenários passaram; 0 erros de console/rede.
- 7 de 7 recursos servidos comparados por SHA-256 com a build local: iguais.
- Chrome headless, renderizador `ANGLE (Apple, ANGLE Metal Renderer: Apple M3 Ultra, Unspecified Version)`.
- Capturas finais: 14, cobrindo desktop, tablet, celular vertical e horizontal.
- Swipe: 12 arquivos, 2634396 bytes, integridade SHA-256 conferida.
- `python3 swipe/indice.py --check`: 100 referências e 100 capas; paridade passou.
- `python3 -m unittest discover -s squads/swipe/tests`: passou.

## Cenários executados

- entrada HTTP 200 e renderização real: passou.
- o relógio avança em tempo real: passou.
- pausar congela a simulação: passou.
- retomar volta a avançar os anos: passou.
- linha do tempo muda a paisagem e pausa: passou.
- retroceder recupera a geometria do mesmo ano: passou.
- vazante, transição e cheia alteram a área alagada: passou.
- a corrente altera a migração: passou.
- sedimentos respondem nos extremos do controle: passou.
- todas as velocidades de tempo são selecionáveis: passou.
- legendas podem ser desligadas e religadas: passou.
- áudio inicia apenas por ação e reproduz de fato: passou.
- mapa enquadra o canal de cima: passou.
- corte expõe as camadas do solo: passou.
- arrastar orbita e rolar aproxima: passou.
- explicação abre, contém fontes e fecha com Esc: passou.
- reinício restaura o experimento: passou.
- atalhos de teclado funcionam: passou.
- fim do experimento pausa no ano 300: passou.
- tablet sem rolagem horizontal: passou.
- celular sem rolagem horizontal: passou.
- controles móveis abrem e alteram o ciclo: passou.
- celular em paisagem preserva título, observação e rodapé: passou.
- movimento reduzido inicia pausado: passou.
- recursos locais e console sem erros: passou.
- HTML e todos os assets servidos iguais à build de produção: passou.

## Revisão visual

Comparativo `reference-comparison.png`: River Bend em Studio à esquerda, protótipo
Amazonas em Diorama à direita, capturas de mesma resolução, 1600 × 1000.
Diferenças intencionais: água azul → água ocre com sedimentos; vegetação temperada
esparsa → copas tropicais e palmeiras; tanque do original → bloco de planície
aluvial; HUD em inglês → identidade Atlas Vivo em português. Modelo de migração
próprio e ilustrativo, sem equivalência com a simulação científica da referência.
Não houve aceite visual de Alan nesta rodada.

A inspeção encontrou sobreposição no celular horizontal: título, observação e
painel se sobrepunham e o rodapé saía da tela. Corrigido por layout compacto e
painel recolhível; a verificação nomeada “celular em paisagem preserva título,
observação e rodapé” passou. Também corrigidos enquadramento, colisão entre
legendas e rotação residual ao concluir a transição da câmera para o mapa.
Nenhuma asserção ou limiar de teste foi relaxado.

## Evidência e acervo

Relatório: `<repo-root>/output/rio-amazonas-qa/browser-report.json`.
Fonte/cópia: `<repo-root>/output/river-bend-qa/comparison.json`.
Recibo: `<repo-root>/output/river-bend-media-receipt.json`.

Pacote salvo no Google Drive para desktop, no acervo montado:
`Acervo por projeto — 2026-09-09/rio-amazonas-river-bend-qa-20261003.zip`.
38 arquivos, 31414974 bytes; ZIP reaberto e íntegro.
SHA-256: `09015374318d44ee9b7ebb99d985c04214312c33e2568a0c0d91cab68a4b3a5e`.
[Acervo por projeto](https://drive.google.com/drive/folders/1WeHTXkRt10kuXNsWTdLu1wKdGy6l6Hhn).
O cliente ainda não informou um ID remoto do ZIP; sincronização em nuvem não
confirmada nesta passagem. Capturas temporárias permanecem no output ignorado,
sem mídias de QA no repositório.

## Limites

- Celular emulado; não testado em aparelho físico.
- Sem alegação de FPS: não foi feito benchmark com três execuções intercaladas.
- Geometria didática, sem mapa de um trecho real, dados de campo ou previsão de cheia.
- Ambiente sonoro CC0 captado na Austrália, identificado na interface como ilustrativo.
- No Swipe, 2 endpoints de telemetria falharam no GET. O núcleo da cena
  renderizou também com todas as conexões externas bloqueadas. Recomendações e
  telemetria continuam remotas, sem igualdade de pixels/estado entre inicializações.
- Build JavaScript gera aviso de tamanho do chunk; o build conclui sem erros.

## Estado da entrega

Protótipo e captura salvos em commits locais. Registro do protótipo em
`workspace.json`. Remoto, push, deploy e conversão em submódulo publicado ficam
para um pedido de publicação. Nenhuma sessão alheia ou branch existente foi alterada.

A próxima decisão era experimentar a cena em movimento e julgar a direção.

## Extensão escolar — 2026-10-03

Pedido de Alan: preparar para uso em escolas em Geografia. Público adotado: 6º/7º
anos. `escola.html` é a entrada escolar; `ficha.html` é o material imprimível.

- `npm run doctor`: 5 de 5 testes do modelo e build de produção aprovados.
- `scripts/qa-escola.mjs`: 26 de 26 verificações escolares aprovadas.
- `scripts/qa.mjs`: 26 de 26 verificações do diorama aprovadas.
- Total: 52 de 52 verificações de navegador; zero erros nos percursos normais.
- Browser verifica os bytes servidos contra `dist/`, por SHA-256. O recibo da
  entrega final, com commit/URL, fica no output ignorado do hub.
- Offline testado com `context.setOffline(true)`: reabertura de caderno, cena,
  mapa, fotografia e ficha. O cache guarda todos os materiais de execução.
- Pacote ZIP: 21 de 21 arquivos servidos pelo launcher Python sem npm e com
  rede externa bloqueada; cena realmente renderizada e investigação pausada.
- Comparação visual: `before-after-school.png`, mesma vista, etapa 0, corrente
  55, sedimentos 60 e tamanho 1600×1000. Arte e enquadramento preservados; diferenças
  intencionais: acesso ao caderno, Planta/Etapa e identificação dos índices do modelo.
- Capturas de caderno, atividades, professor, registros, impressão e três tamanhos
  emulados inspecionadas. Ampliação CSS de 200% e controles nativos por teclado
  verificados. A prova de impressão cobre o estilo visual, não uma impressora física.

Correções de verificação: o roteiro de QA tinha um seletor ambíguo entre dois
links para a mesma investigação; foi delimitado à seção de atividades. A navegação
das abas foi sincronizada com a mudança de hash. Não foram relaxadas asserções ou
limites para obter aprovação.

O modelo não representa tempo físico: “Ano” passou a “Etapa”. A planta do diorama
não se confunde com o mapa oficial da ANA. As correspondências com EF06GE04,
EF06GE09 e EF07GE11 são parciais e incluem complementações para o professor.
Os registros guardam apenas configurações e índices nesta aba, com limpeza explícita.

Na conferência do pacote Python, apareceu uma requisição 404 de favicon ausente.
O ícone embutido foi acrescentado ao caderno e à ficha; a checagem de distribuição
passou a rejeitar respostas HTTP de erro e erros de console, além de falhas de script.

Mídias de QA arquivadas no Drive em `rio-amazonas-escolas-qa-20261003-final.zip`;
recibo com contagem e hashes em `output/rio-amazonas-escolas/arquivo-receipt.json`.
Sincronização remota depende do cliente Drive; não há confirmação de ID remoto.
Material ainda sem aplicação com turma real, avaliação de aprendizagem ou aceite
visual de Alan. Celular permanece emulado. Publicação externa não executada.
# Geografia Rabisco — publicação de 04/10/2026

Skin aplicada à apresentação e ao caderno; marca, papel e Caveat reutilizados.
Comparação antes/depois em 1440 × 1000 e 390 × 844 no acervo desta rodada.
A cena e o modelo mantêm geometria, materiais, câmeras e controles anteriores.
Entrada pública escolar, navegação ao laboratório, canonical e imagem 1200 × 630
ganham verificações próprias no QA. Metadados e hashes públicos são conferidos
após o deploy da revisão no GitHub, por `gameops deploy`.
GTM mede somente acessos no domínio público; pacote localhost sem telemetria.
Não houve teste em dispositivo físico, turma real ou aceite artístico de Alan.
