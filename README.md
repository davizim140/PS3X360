# PS3X360 — recomeço limpo

Esta branch `fresh-start` inicia uma nova implementação da interface inspirada no XMB original do PlayStation 3. A interface web é independente do código C++ antigo que continua na branch `main`.

## Abrir no StackBlitz

Abra: https://stackblitz.com/github/davizim140/PS3X360/tree/fresh-start

O projeto usa Vite e JavaScript, sem instalação local. Se o preview não iniciar automaticamente, execute no terminal integrado do StackBlitz:

```sh
npm run dev
```

Para validar a compilação web:

```sh
npm run build
```

## Estado honesto do projeto

- Interface web: primeira base funcional, com categorias XMB, seleção por teclado, relógio, ondas animadas e mensagens de estado.
- Os itens de mídia, usuários, rede e configurações são atualmente demonstrativos; não alegam acesso a recursos nativos do console.
- XEX: **ainda não produzido nem validado**.
- A workflow experimental OpenXeChain na branch `main` apenas tenta construir a toolchain. Toolchain construída não é o mesmo que compilar este projeto como XEX.
- O próximo passo de portabilidade será identificar a API gráfica/input do runtime compatível e criar um alvo nativo mínimo. Nenhum binário será declarado válido sem artefato real, inspeção e teste.

Mantenha o Aurora como dashboard de recuperação até um XEX real ser compilado e testado no console.
