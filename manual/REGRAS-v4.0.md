# Regras do Firestore para a v4.0 (ambientes compartilhados)

**Sem estas regras, o app continua funcionando, mas "Compartilhar" e "Aceitar convite" são negados.** Nada do que já existe muda.

## Ordem para publicar (regra 46 do Livro)
1. No console do Firebase > Firestore > Regras, **copie as regras atuais para um arquivo de backup**.
2. Use o arquivo **`firestore.rules`** (completo): são as suas regras atuais (v4.8) com o bloco de ambientes compartilhados já encaixado antes de `dados_pessoais`. Nada do que existia foi alterado. (O arquivo `firestore-bloco-ambientes-compartilhados.rules` é só o bloco isolado, para conferência.)
3. Rode o roteiro abaixo no **Playground de regras**.
4. Publique as regras.
5. Só então publique o app v4.0 (pasta `publicar/`).
6. Abra o app, compartilhe um ambiente de teste, convide uma segunda conta e confira.
7. Se algo falhar, recoloque o backup das regras.

## Roteiro do Playground (usuário de teste logado)
Use como `uid` de teste: gestor = `G1`, cuidador = `C1`, leitor = `L1`, estranho = `X1`. Ambiente `amb1` com `dono: G1`, `membrosUids: [G1, C1, L1]`, `papeis: {G1:{p:'gestor'}, C1:{p:'cuidador'}, L1:{p:'leitor'}}`.

| # | Quem | Ação | Esperado |
|---|------|------|----------|
| 1 | G1 | criar `amb1` com `dono: G1`, `membrosUids: [G1]`, `papeis: {G1:{p:'gestor'}}` | permitido |
| 2 | X1 | criar um ambiente com `dono: G1` | negado |
| 3 | X1 | criar um ambiente com `papeis: {X1:{p:'cuidador'}}` | negado |
| 4 | C1 | ler `amb1` | permitido |
| 5 | X1 | ler `amb1` | negado |
| 6 | C1 | gravar em `amb1/dados/estoque__a` | permitido |
| 7 | L1 | gravar em `amb1/dados/estoque__a` | negado |
| 8 | L1 | ler `amb1/dados/estoque__a` | permitido |
| 9 | X1 | ler `amb1/dados/estoque__a` | negado |
| 10 | C1 | alterar `papeis.C1.p` para `gestor` em `amb1` | negado |
| 11 | C1 | criar `amb1/convites/qualquer` | negado |
| 12 | G1 | criar `amb1/convites/tk1` com `papel: 'cuidador'` e `ate` no futuro | permitido |
| 13 | G1 | criar `amb1/convites/tk2` com `papel: 'gestor'` | negado |
| 14 | X1 | ler `amb1/convites/tk1` (get) | permitido |
| 15 | X1 | listar `amb1/convites` | negado |
| 16 | X1 | atualizar `amb1` adicionando a si como `cuidador`, `aceiteToken: 'tk1'` (convite existente e válido) | permitido |
| 17 | X1 | o mesmo, mas como `gestor`, ou com `aceiteToken` de um convite que não existe ou vencido | negado |
| 18 | X1 | o mesmo, mexendo também em `nome` ou `dono` | negado |
| 19 | C1 | atualizar `amb1` removendo só a si mesmo (`papeis.C1` e `membrosUids`) | permitido |
| 20 | C1 | atualizar `amb1` removendo `L1` | negado |
| 21 | G1 | atualizar `amb1` removendo `L1` | permitido |
| 22 | G1 | apagar `amb1` | permitido |
| 23 | C1 | apagar `amb1` | negado |
| 24 | L1 | ler `dados_pessoais/G1/...` | negado (regra que já existia) |

Observação importante: não foi possível rodar o emulador do Firebase no ambiente onde a v4.0 foi feita, por isso o app foi testado contra uma cópia dessas regras escrita à mão; o Playground é o teste definitivo. Os itens 16 a 18 e 11 a 13 merecem atenção especial.
