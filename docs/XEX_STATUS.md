# Estado da compilação XEX

## Estado atual
**Nenhum XEX é produzido por este repositório neste momento.** O XDK do Xbox 360 não está incluído e não é substituído pelo CMake.

A rota de compilação descrita por projetos como XexForge depende das ferramentas do XDK, incluindo `cl`, `link` e `imagexex`. Sem uma toolchain compatível, não há como afirmar que um XEX válido foi compilado.

## Verificação no PowerShell
```powershell
$env:XEDK
Get-Command cmake -ErrorAction SilentlyContinue
```

A existência de uma variável de ambiente ou do CMake não prova que o XDK está instalado corretamente.

## Critérios para suporte ao Aurora
- Compilar com toolchain compatível com Xbox 360.
- Empacotar com ferramenta apropriada.
- Verificar o artefato gerado.
- Testar no console RGH sem substituir o dashboard de inicialização.
- Documentar e testar o retorno ao Aurora.

Não baixe executáveis aleatórios para contornar dependências ausentes.
