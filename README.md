# PS3X360 — XMB-inspired Xbox 360 dashboard

Projeto homebrew em desenvolvimento para uma dashboard do Xbox 360 RGH com interface inspirada no XMB clássico do PlayStation 3.

## Estado real
- Núcleo C++17 da navegação XMB, mapeamento lógico de botões e testes automatizados.
- Build de desenvolvimento do núcleo para Windows 10/11 com CMake.
- CI via GitHub Actions para Windows e Ubuntu.
- **Ainda não produz um .xex.** O XDK/toolchain nativa necessária para compilar e empacotar um XEX não está incluída. Não declare este build como executável do Xbox 360.
- Mantenha o Aurora como dashboard de recuperação até haver um XEX real compilado e testado no console.

## Build Windows
Instale CMake 3.21+ e Visual Studio 2022 com “Desenvolvimento para desktop com C++”. No PowerShell, na raiz:

```powershell
cmake -S . -B build
cmake --build build --config Release
ctest --test-dir build -C Release --output-on-failure
```

Isso compila e testa apenas o núcleo C++, não gera XEX.

## Publicar alterações
O projeto está no repositório https://github.com/davizim140/PS3X360.

Veja `docs/BUILD_WINDOWS.md`, `docs/CONTROLLER_INPUT.md`, `docs/XEX_STATUS.md` e `docs/TEST_PLAN.md` antes de qualquer teste no console.
