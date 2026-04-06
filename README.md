# ArtConnect (Mobile)

## Guia para Desenvolvedores

Guia de apoio para equipe de desenvolvedores: [Guia](https://github.com/CorallusEtec/.github/blob/main/profile/DEV.md)

## Dados do projeto
- Início de desenvolvimento: 19/02/2026
- Linguagem e tecnologias: Javascript, TailwindCSS
- Usar a biblioteca de icones do Expo https://icons.expo.fyi/Index
## Regras de Desenvolvimento
- Se é a primeira vez baixando o repositório para a sua máquina, use os seguintes comando:
1. <code>git clone https://github.com/SamuMeneDev/artConnectMobile.git</code>
2. Entre no diretório do projeto e use o seguinte comando para carregar as dependências <code>npm i</code>
- Antes de começar a programar, use <code>git pull origin &lt;nome-da-branch&gt; </code> para garantir o versionamento.
- Usar camelCase.
- Usar nome de variáveis em português.
- Identação no código.
- Funções e variáveis com nomes claros e se possível comente.
## Padrões de código
- Comentar quando possível para clareza do código
- Antes de criar uma branch, use o `git pull origin main` para atualizar a sua `branch` main com a do repositório remoto
### Usar a seguinte notação para a cria a branch:
- Para correções de erros, use o prefixo na branch: `fix/`
- Para atualizações no projeto, use o prefixo na branch: `feature/`
- Crie a sua branch a partir da `main`: estando na `main`, use o comando `git checkout -b <nome-da-branch>`
- **Não** comittar direto na `main`, crie uma branch específica para a sua tarefa
- Após terminar a tarefa, faça o `git add .`, depois `git commit -m "<nome-commit>"`e depois `git push origin <sua-branch>`.
  uando finalizar as terafas totalmente, no Github abra o pull request
