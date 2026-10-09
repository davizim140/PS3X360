# Plano de testes

## Teste local
Execute os comandos de `docs/BUILD_WINDOWS.md`. O CTest deve reportar 100% dos testes aprovados.

Cobertura:
- categorias e item inicial;
- navegação horizontal/vertical;
- reset da seleção vertical ao trocar de categoria;
- seleção por índice;
- rejeição de índices inválidos;
- navegação circular;
- rejeição de menus vazios ou categorias sem itens.

## CI
O workflow `.github/workflows/core-tests.yml` executa build e testes em Windows e Ubuntu. Veja a aba **Actions** no GitHub.

## Console Xbox 360
Ainda não suportado: não existe XEX neste projeto. Testes de PC não provam compatibilidade com o console.
