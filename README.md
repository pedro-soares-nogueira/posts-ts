## Blog - Users • Posts • Comments

Plataforma (responsiva) de _Blog_ usando reactjs + typescript. Com TailwindCSS para gerar mais velocidade na criação do css. Utilizei o json server como api fake para gerencimaneto de banco de dados. Utilizei também alguns componentes disponibilizados pelo Radix-ui, pois são componentes sem estilização, que me dão total liberdade e segurança no desenvolvimento, garantindo principalmente acessibilidade e performance. Por fim, pela simplicidade da aplicação, usei contextAPI do react para gerenciar seu estado global, mas o estago global de posts esta sendo gerenciado pelo redux-toolkit. 

---

#### Req. Funcionais

- [x] Cadastro de usuários
- [x] Login usúario cadastro
- [x] Logout usuário logado
- [x] CRUD Postagens
  - [x] Listar
  - [x] Cadastrar
  - [x] Editar
  - [x] Excluir
- [x] CRUD Comentários
  - [x] Listar (por post)
  - [x] Cadastrar
  - [x] Editar
  - [x] Excluir
- [x] Rotas seguras
- [x] Loading Skeleton
- [x] Form validation

#### Regras de negócio

- [x] Somente login de usuário cadastrado
- [x] Listagem de postagens
- [x] Listagem de comentários por postagens
- [x] Editar/exclir postagens
- [x] Editar/exclir comentários

#### Dependências

- _tailwindcss_: Velocidade no css
- _json-server_: FakeDatabase
- _axios_: Conexão com DB
- _radix-ui_: componentes HTML sem estilização e mais acessibilidade
- _react-router-dom_: Rotas da aplicação
- _react-hook-form_: Gerencimaneto/validação de formulários
- _zod_: Tipagem/validação de formulário (typescript first)
- _date-fns_: Converter datas
- _phosphor-react_: Icones
- _react-loading-skeleton_: Loading Skeleton para melhorar a experiencia do usuário

---

### Step by step

```sh
git clone https://github.com/ngrpedro/posts-ts.git
```

```sh
cd posts-ts
```

```sh
npm install
```

#### Start client

```sh
npm run dev
```

#### Start server

```sh
npm run server
```
