## Blog - Users • Posts • Comments

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

#### Regras de negócio

- [x] Somente login de usuário cadastrado
- [x] Listagem de comentários por postagens
- [ ] Validaçao de campos de formulário

#### Dependências

- _tailwindcss_: Velocidade no css
- _json-server_: FakeDatabase
- _axios_: Conexão com DB
- _radix-ui_: componentes HTML sem estilização e mais acessibilidade
- _react-router-dom_: Rotas da aplicação
- _react-hook-form_: Gerencimaneto de formulários
- _zod_: Tipagem de formulário
- _date-fns_: Converter datas
- _phosphor-react_: Icones

---

### Step by step

```sh
git clone https://github.com/ngrpedro/posts-ts.git
```

```sh
cd posts-ts
```

#### Start client

```sh
npm run dev
```

#### Start server

```sh
npm run server
```
