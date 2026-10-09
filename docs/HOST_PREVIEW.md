# Prévia interativa para Windows

A prévia de terminal permite experimentar o modelo de navegação XMB sem hardware Xbox e sem XDK. É um utilitário de desenvolvimento para PC, **não é um XEX**.

## Compilar e executar no Windows 10/11

Requisitos: CMake 3.21+ e compilador C++17 (por exemplo, Visual Studio Build Tools com workload C++).

```powershell
cmake -S . -B build
cmake --build build --config Release
ctest --test-dir build -C Release --output-on-failure
.`buildReleaseps3x360_host_demo.exe
```

Comandos: A/D mudam de categoria; W/S mudam de item; E confirma e mostra o identificador; Q sai. Use letras e pressione Enter.

A próxima etapa de interface nativa ainda requer uma toolchain Xbox 360 adequada e integração específica com gráficos e controle.
