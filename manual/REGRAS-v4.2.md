# Regras do Firestore — Controle de Compras v4.2

**Não há regra nova.** Os veículos, as peças e os abastecimentos de um ambiente compartilhado usam a mesma
subcoleção `ambientes_compartilhados/{id}/dados/{tabela}__{id}` que o estoque e a lista (tabelas `veiculos`, `pecas`, `abast`).
A regra `match /dados/{reg}` já vale para qualquer tabela: membros leem; gestor e cuidador gravam; leitor só consulta.

Os dados pessoais (veículos fora de ambiente compartilhado) ficam em `dados_pessoais/{uid}/fenix-controle-de-compras/{tabela}__{id}`,
coberto pela regra de dados pessoais que você já tem.

Pode manter o `firestore.rules` da v4.1 publicado. Se quiser conferir no Playground, repita o caso do cuidador e do leitor do REGRAS-v4.0.md
usando o caminho `ambientes_compartilhados/{id}/dados/veiculos__X`.
