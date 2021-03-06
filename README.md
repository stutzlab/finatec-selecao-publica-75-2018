# FINATEC - SELEÇÃO PÚBLICA Nº 075/2018 - Protótipo funcional

Para testar, acesse https://finatec.stutz.com.br/ e faça algumas buscas de teste. Exemplo:

```
criança direito a creche
```

```
conceder indulto presidente
```

```
estabilidade servidor publico
```

O protótipo implementado e aqui disponibilizado é relevante e aderente pois procura demonstrar um o embrião de nossa proposta sobre a implementação do produto final da Constituição Federal Anotada, já exercitando questões de interação (UX), tecnologias de Frontend e Backend, infraestrutura, organização do projeto, segurança e acesso a dados.

Nesse exercício, apresentamos uma tela simples em que a Constituição Federal é apresentada com uma ferramenta de busca e com o formulário para criação de anotações. Ao realizar a busca, o conteúdo da Constituição é filtrado inline, com feedback imediato, dando a sensação de controle e agilidade para o usuário, um dos pilares da UX. As notas, de semelhante modo, são criadas, editas e excluídas totalmente inline, sem muitas interações intermediárias, mas com sinalização da conclusão dessas operações, o que proporciona ao usuário uma percepção de resposta em tempo real aos seus comandos, uma outra boa prática de UX.

A **Arquitetura da Informação** pensada trata o texto e a interação com ele de forma predominante pois é o tipo de interação que o público alvo da ferramenta está mais familiarizado, o que faz com que o usuário tenha menores barreiras cognitivas em entender do que se trata a ferramenta já que o texto da Constituição - que é o que lhe interessa - já é apresentado sem distrações. Há basicamente **3 níveis na hierarquia da informação**: 
**Nível 1**: texto da Constituição, isolado por espaços em branco e com maior área de ocupação na tela. 
**Nível 2**: anotações realizadas, com segundo maior espaço disponível, delimitado por uma linha vertical com borda
**Nível 3**: ferramentas. Ferramenta de busca e de criação e manipulação da anotação são colocados em último nível por meio de uso de escala de cinza em suas cores e redução do tamanho da fonte, além de serem posicionados com menos espaço

Foi escolhida apenas **uma fonte - fonte Lato -** que é uma fonte bem difundida e familiar para os usuários e que possui um alto grau de conforto da leitura, por se tratar de uma fonte com ligaduras suaves e bem definidas entre os caracteres, com limites bem claros e definidos no desenho de cada letra. Além disso, foi utilizado um **espaçamento de 150% entre as linhas** para que os espaços em branco entre as linhas reduzam o esforço óptico na focalização da leitura. A cor preta da fonte com fundo levemente cinza é **um contraste simples e que se assemelha bastante ao contraste encontrado em livros de papel** tradicional. O contraste preto e branco é bom também, mas o fundo branco proporciona uma claridade que pode ser excessiva dependendo do dispositivo, irritando a vista do leitor. Além disso a paleta de cores é basicamente cinza pois como trata-se de uma ferramenta que será usada para leitura longa, o uso de cores que exijam uma carga cognitiva e processamento óptico maior deve ser evitado.

Como o protótipo não apresenta muitas funcionalidades, optou-se por deixar visíveis o conteúdo da Constituição e sua navegação e o formulário de anotações, para que o usuário possa transitar sem muito esforço de navegação por mouse entre as funcionalidades. Mas, havendo necessidade de acrescentar mais ferramentas, que demandaria mais espaço na parte do texto da Constituição, poderia-se ter adotado uma abordagem de colocar o formulário de anotações em uma aba escondida, acionada e trazida a frente quando o usuário precisasse.

A implementação do protótipo está dividida basicamente em duas partes: **Frontend** e **Backend**. O Frontend utiliza tecnologia **HTML5, CSS3 e ReactJS**. O Backend é uma **API REST em NodeJS que utiliza ExpressJS** e realiza as operações de persistência e recuperação dos dados em um banco de dados **MongoDB**. Para deployment do aplicativo, tanto o web server do Frontend, como o NodeJS do Backend e o MongoDB foram levantados usando-se **Container Docker** na AWS, mais especificamente, Containers levantados em um mesmo compose (docker-compose) com rede privada entre eles e sem mapeamento de portas externas. O **HTTPS (TLS)** é fechado por um outro servidor provido pelo serviço fly.io que faz o handshake com **Let's Encrypt** e conecta-se via túnel ssh com seu aplicativo, que fica completamente protegido sem nenhum porta aberta disponível.
No Frontend, além do ReactJS, utilizou-se a biblioteca `Rhelena` para controle do estado da View e integração com a API e a lib `manuh` para comunicação entre componentes via evento. Os estilos foram feitos com CSS3 e utilizando recursos de **flex-box** para alinhamento e disposição dos elementos na tela.

No Backend utilizou-se a biblioteca ExpressJS para export a API REST com as operações identificadas pelos “verbos" HTTP, isto é, **POST, GET, PUT, DELETE**. Além disso, utilizou-se a biblioteca **mongoose** para conexão com o Banco de dados MongoDB. Também foi implementado um **mecanismo de segurança utilizando-se token JWT** em que é verificado se no cabeçalho das requisições esse token é recebido e se ele possui as informações que dão ao cliente permissão de acesso e execução daquela operação naquele recurso.

Foi implementada a funcionalidade de login a partir do cadastramento de usuários no MongoDB com senha criptografara usando-se a **técnica bcrypt**, que é um método adaptativo a evolução do hardware pois é possível calibrar o custo computacional para gerar - e portanto quebrar - a senha.

