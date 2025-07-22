# Atividades Treinamento React

## Atividade 1 - TODOList

A atividade consiste em criar um TO DO List (Lista de a fazeres) utilizando os conhecimentos já adquiridos no ecossistema React.

![Print tela inicial](./images/todolist/todoListMainPage.png)

A atividade irá envolver desde a criação do workspace até os atendimentos dos requisitos do sistema.

Um a fazer possui a seguinte estrutura:

```ts
interface IToDo {
  idToDo: number;
  title: string;
  createdAt: Date;
  conclusion: Date;
  concluded: boolean;
}
```

Será necessário a criação do projeto usando o preset fornecido pelo `Vite` da mesma forma que foi criado dentro dos treinamentos. Também será necessário a instalação e configuração manual de bibliotecas como o `React Hook Form`, `Yup`, `TailwindCSS` e `Material UI` (MUI Core, MUIX DataGrid e MUIX Date pickers).

Única biblioteca necessária a mais da qual não vimos no treinamento é a [json-server](https://github.com/typicode/json-server). Ela é uma biblioteca sensacional que nos permite fazer um "mock" de uma API para uso na nossa aplicação. Após instalada no projeto, deve-se copiar o arquivo [server.json](./files/todoList/server.json) presente em `/files/todoList` no repositório atual e colar na raiz do seu projeto. Após a copia, basta executarmos o seguinte comando:

```
yarn json-server --watch ./server.json --delay 1000 --id idToDo
```

Assim iremos criar uma API falsa que fica rodando na porta 3000, escutando requests na rota `/todos`. Será possível fazer as seguintes operações:

- `GET /todos` - Busca todos os a fazeres;
- `POST /todos` - Recebe um a fazer pelo body e salva esse registro novo;
- `PUT /todos/:idToDo` - Recebe um a fazer pelo body e um id como variável de caminho e atualiza esse registro no banco caso ele existir;
- `DELETE /todos/:idToDo` - Recebe um id como variável de caminho e exclui esse registro caso ele existir;

Mais funcionalidades do `json-server` podem ser encontradas na sua [documentação](https://github.com/typicode/json-server)

Dentro do pasta `/files/todoList` pode ser encontrada também o arquivo [api.ts](./files/todoList/api.ts) que é o arquivo de configuração do `axios` que já possui middleware que auxiliam no uso de campos de data vindos do backend. Esses campos já virão como `Date` para dentro da aplicação mesmo sendo salvos como strings no formato ISO-8601 (Ex: "2023-05-17T20:50:19.831Z").

> A interface pode ser baseada a partir dos prints informados aqui. Pontos extras se conseguir chegar próximo ou fazer ainda melhor que a estilização do print ^-^

### Requisitos do sistema

- Listagem
  - Listar todos os a fazeres em um `DataGrid`
    - Campo de concluído deve ser mostrado usando uma `Checkbox`, onde caso clicada, irá efetuar a troca do valor;
    - Campo de criação e prazo final devem mostrar a data no formato pt-BR;
    - Deve ser possível selecionar os elementos usando a coluna de checkbox do componente na intenção de excluí-los quando for clicado no botão "Excluir";
    - Deve ser possível clicar em um botão de "Editar" presente no final da tabela que abrirá o form de edição desse registro. Após editado, a mudança deve refletir na listagem;
    - Botão de excluir só deve ficar habilitado caso houver elementos selecionados;
    - Botão de salvar só deve ficar habilitado caso houver elementos novos ou editados;
- Form
  - Form será aberto em formato de `Dialog` dentro da tela como mostrado nos prints na próxima sessão
    - Dentro da dialog, deve ser possível informar um `title` e o `conclusion` de um a fazer;
    - O campo `conclusion` deve iniciar seu valor padrão como a data atual + 1 dia;
    - Quando clicado no botão de Salvar/Concluído dentro do form, o valor deve aparecer na listagem sendo criado com: Os dois dados informados, createdAt como o momento atual e o campo de conclusão como falso;
    - Deve ser possível clicar em um botão de "Limpar" dentro do form que irá reiniciar os valores dos campos para os valores padrão;
    - Deve ser possível clicar em um botão "Cancelar" que irá fechar a dialog;
    - Quando clicado no botão de "Editar" em algum elemento na listagem, a dialog deve abrir com os campos preenchidos com os respectivos valores e o título da dialog deverá mudar para "Editar a fazer";

**OBS:** Tirando a operação de `DELETE`, todas as outras devem só ser persistidas no banco de dados só apenas clicado o botão "Salvar" na tela principal.

### Prints do Form

![Print form](./images/todolist/todoListDialog.png)
![Print form](./images/todolist/todoListDialogEdicao.png)

## Algumas dicas

- Será necessário criar um controle de quais elementos da listagem foram editados ou adicionados. Isso pode ser controlado guardando os identificadores dos respectivos elementos de alguma forma;

- Elementos novos não irão possuir um ID pois esses só serão gerados quando as entidades forem enviadas para a API com o idToDo nulo. Para isso, pode ser criado uma variável numérica incremental e negativa que a cada elemento criado, o seu valor é atribuído para o campo identificador;

  - Lembre-se de remover essa informação na hora de salvar na API. O campo de ID deve ser mandado como `null` para que seja entendido que é um registro novo;
  - Da mesma forma, caso for selecionado para excluir um registro novo com id negativo, esse não pode ser mandado pra API pois ele não existe no banco ocasionando um possível erro.

- Para manipulações de data, usar a biblioteca `date-fns` que é usada globalmente que adiciona funções para manipulações de datas como `addDays`, `addHours`, `format`, etc.
