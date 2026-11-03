# Regras do Firestore — Controle de Compras v4.3

**Não há regra nova.** Cartões, contas fixas, forma de pagamento e categoria da despesa ficam em
`dados_pessoais/{uid}/fenix-controle-de-compras/{tabela}__{id}` (tabelas `cartoes` e `contas`, e campos novos em `compras` e `config`),
coberto pela regra de dados pessoais que você já tem: só o dono do uid lê e grava. Nada disso vai para ambientes compartilhados.
Pode manter o `firestore.rules` publicado (v12).
