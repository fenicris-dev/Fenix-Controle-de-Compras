# Regras do Firestore para a v4.1 (Catálogo Fênix)

O arquivo `firestore.rules` desta entrega é o seu (v4.8) **com os dois blocos novos**: `ambientes_compartilhados` (v4.0) e `catalogo_produtos` + `catalogo_denuncias` (v4.1). Nada do que existia mudou. Se você já publicou o da v4.0, basta publicar este (ele inclui o anterior).

## Antes de publicar o catálogo
1. Backup das regras atuais do console.
2. **Crie o seu documento de administrador**, se ainda não existe: Firestore > coleção `admins` > documento com o **seu uid** (o ID do documento é o uid da sua conta, em Authentication > Usuários). Qualquer campo serve. Sem ele, as fotos não são distribuídas e você não consegue ler as denúncias.
3. Cole o `firestore.rules`, rode o roteiro abaixo no Playground e publique.
4. Publique os Termos e a Política (pasta `termos/`) **antes ou junto** do app v4.1, porque o aviso do app fala deles.
5. Publique o app v4.1.

## Roteiro do Playground (usuário logado de teste)
Use `U1` (usuário comum), `ADM` (com documento em `admins/ADM`).

| # | Quem | Ação | Esperado |
|---|------|------|----------|
| 1 | U1 | ler `catalogo_produtos/7891000100103` | permitido |
| 2 | sem login | ler `catalogo_produtos/7891000100103` | negado |
| 3 | U1 | criar `catalogo_produtos/7891000100103` com `ean` igual, `nome: 'Nescau'`, `modo: 'emb'`, `unidade: 'un'`, `conteudo: {v: 400, u: 'g'}` | permitido |
| 4 | U1 | criar com um campo a mais (`preco`, `uid`, `estab`) | negado |
| 5 | U1 | criar com `foto` | negado |
| 6 | ADM | criar com `foto` | permitido |
| 7 | U1 | criar com id `ABC` (não numérico) ou com `ean` diferente do id | negado |
| 8 | U1 | criar com `nome` de 1 letra ou com mais de 80 | negado |
| 9 | U1 | criar com `modo: 'xyz'` ou `unidade: 'litro'` | negado |
| 10 | U1 | sobrescrever um código que já existe | negado |
| 11 | U1 | apagar um código | negado |
| 12 | ADM | alterar ou apagar um código | permitido |
| 13 | U1 | criar `catalogo_denuncias/x` com `ean`, `motivo: 'nome'`, `por: uid de U1` | permitido |
| 14 | U1 | criar denúncia com `por` de outro usuário, ou `motivo` fora da lista | negado |
| 15 | U1 | ler `catalogo_denuncias` | negado |
| 16 | ADM | ler `catalogo_denuncias` | permitido |
| 17 | U1 | ler `admins/ADM` | negado (só lê o próprio) |
| 18 | U1 | ler `dados_pessoais/OUTRO/...` | negado (já era assim) |

Mais os 24 testes do `REGRAS-v4.0.md` (ambientes compartilhados), que continuam valendo.

Como na v4.0, as regras só foram testadas contra uma cópia escrita à mão; o Playground é o teste definitivo.
