# Geografia Rabisco — Amazonas e Terremotos

Material de apoio para aulas de Geografia de 6º e 7º anos: caderno de leitura,
mapa oficial da ANA, fotografia NASA, duas investigações guiadas, cinco questões
com explicação, ficha imprimível e plano de 50 minutos. Inclui o laboratório 3D
da paisagem amazônica. Relação parcial com a BNCC, sem certificação curricular.

Segundo caderno: **Terremotos**, em `/terremotos.html`. Mapa USGS das placas,
laboratório 3D de duas torres, dois experimentos, cinco questões com feedback,
ficha `/ficha-terremotos.html` e plano de 50 minutos. Inclui sismos no Brasil,
magnitude versus intensidade, ressonância, ocupação do território e vulnerabilidade.
BNCC: apoio parcial a EF06GE11; complementações no plano. Não há piloto com turma real.

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

Publicado em https://geografia.rabisco.net/ (Hostinger). A raiz abre a apresentação
e o caderno; `/escola.html` também abre o caderno, `/ficha.html` a ficha e
`/laboratorio.html` a exploração livre. Sem WebGL, caderno e ficha continuam utilizáveis.

## Uso em escola e distribuição

O professor encontra objetivos, sequência, respostas esperadas, critérios de
observação e complementações para EF06GE04, EF06GE09 e EF07GE11 no caderno.
Registros guardam apenas configurações/índices no `sessionStorage` desta aba;
respostas às perguntas ficam em memória. Sem contas, backend ou envio de respostas. No domínio público há GTM
`GTM-TT2J9B4B` para estatísticas de acesso; em localhost ele não carrega.

Em localhost ou HTTPS, espere “Materiais disponíveis sem internet” na seção do
professor, desligue a rede e confira o mesmo endereço antes da aula. O cache pode
ser apagado pelo navegador. Links externos exigem internet. Em HTTP de rede local,
o service worker pode ser indisponível; use o pacote servido no próprio computador.

`npm run pack` cria `output/rio-amazonas-escolas/amazonas-geografia-escolas.zip`
no hub. Extraia inteiro e execute `python3 iniciar.py` (`py iniciar.py` no Windows).
Precisa de Python 3; não precisa de npm, Node ou internet. O servidor abre apenas
localhost, mantém os recursos locais e encerra com Ctrl+C. A ficha também pode ser
impressa para uma aula sem equipamento. A apresentação usa a identidade Rabisco.

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

## Laboratório de terremotos

Inicia pausado. “Ritmo da torre A/B” escolhe a frequência natural ilustrativa e
inicia um ensaio de 20 segundos. Registre ao terminar. Altere andares, reforços,
frequência e amortecimento uma variável de cada vez; uma alteração reinicia e pausa
o ensaio. Há vibração composta e impulso sintéticos, duas vistas e órbita.
Últimos 12 registros ficam no `sessionStorage` da aba; sem WebGL, controles,
modelo numérico, picos textuais, leitura e ficha permanecem disponíveis.

Um oscilador por torre, elástico, sem danos. Hz não é magnitude. Pico é deslocamento
relativo dividido pela amplitude da mesa; balanço visual ampliado 3 vezes. Nenhum
resultado certifica uma construção ou prevê terremotos. Modelo e arte independentes,
inspirados em [Earthquake Tower, Ryan Sael](https://sael.net/earthquake-tower/),
arquivado em `swipe/earthquake-tower`, todos os direitos do original preservados.
Mapa integral USGS, domínio público, créditos/hashes em `public/terremotos/SOURCE.json`.
O pacote local e o cache offline incluem os dois cadernos e as duas fichas.
