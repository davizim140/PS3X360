# Camada de entrada do controle

O cabeçalho `src/core/controller_mapper.hpp` define uma tradução pura de botões físicos para ações lógicas de menu:

- D-pad: navegação horizontal e vertical;
- A: confirmar;
- B: voltar;
- outros botões: nenhuma ação.

**Limite importante:** isso não lê um controle real. Não existe ainda integração com XInput, APIs do Xbox 360 ou leitura de estado/edge de botão. Um backend específico da plataforma precisará alimentar `map_button` com os botões pressionados e evitar repetição indesejada.

## Teste

Os testes de mapeamento estão no executável `ps3x360_core_tests`, executado com:

```powershell
cmake -S . -B build
cmake --build build --config Release
ctest --test-dir build -C Release --output-on-failure
```

O build continua sendo de PC e não produz um XEX.
