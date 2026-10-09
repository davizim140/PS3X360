# Build no Windows 10/11

## Dependências
- CMake 3.21+
- Visual Studio 2022 com o workload **Desenvolvimento para desktop com C++** (ou compilador C++17 compatível).

Abra PowerShell na raiz do repositório e execute:

```powershell
cmake -S . -B build
if ($LASTEXITCODE -ne 0) { throw "CMake configure failed" }
cmake --build build --config Release
if ($LASTEXITCODE -ne 0) { throw "Build failed" }
ctest --test-dir build -C Release --output-on-failure
if ($LASTEXITCODE -ne 0) { throw "Tests failed" }
```

Esse build produz a biblioteca do modelo e o executável de testes para PC. Não gera um XEX.
