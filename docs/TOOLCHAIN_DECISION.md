# Decisão de toolchain — Windows 10/11, XEX iniciado pelo Aurora

## Requisito de saída
O alvo atual é um executável Xbox 360 no formato XEX, iniciado como homebrew pelo Aurora. Compilar apenas para Windows não atende esse requisito.

## Opções verificadas

### 1. XexForge + Xbox 360 XDK
Projeto de scaffolding/build com CMake para chamar as ferramentas do XDK, incluindo `cl`, `link` e `imagexex`. Requer um XDK instalado e acessível via `XEDK` ou caminho padrão. Não inclui nem substitui o SDK proprietário.
Referência: https://github.com/xeghosted/XexForge

### 2. RXDK-360
Projeto para integrar um XDK Xbox 360 existente a Visual Studio moderno. A documentação declara como pré-requisito um XDK completo e que o conteúdo proprietário não é redistribuído.
Referência: https://github.com/Team-Resurgent/RXDK360

### 3. libXenon
Toolchain homebrew open source para Xbox 360, mas é um caminho bare-metal e não deve ser tratado como equivalente automático a um XEX convencional iniciado pelo Aurora. O README oficial descreve instalação da toolchain com dependências de distribuições Linux e também oferece uso via Docker; isso não corresponde diretamente à restrição de Windows sem Linux/Docker.
Referência: https://github.com/Free60Project/libxenon

## Decisão atual
Não fixar uma toolchain no projeto até confirmar que ela pode produzir o tipo de artefato e modo de execução exigidos. No estado atual:
- C++17 do núcleo pode ser compilado e testado em PC.
- Nenhum alvo XEX está configurado.
- Nenhuma integração de gráficos/controle do Xbox foi compilada.
- Não há artefato validado no console.

## Próximo ponto de decisão
Se houver acesso legítimo a um Xbox 360 XDK compatível, testar o scaffold mínimo do XexForge e só depois ligar o núcleo do PS3X360 a um entry point XEX. Se não houver XDK, será necessário reavaliar a restrição de toolchain/ambiente e demonstrar primeiro um artefato real carregável pelo Aurora; não renomear ELF/EXE como XEX.
