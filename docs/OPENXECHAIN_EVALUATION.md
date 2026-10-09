# Experimento: toolchain aberta para XEX

Este fluxo é uma tentativa isolada de compilar a toolchain pública OpenXeChain nos runners do GitHub Actions. Ele não altera o workflow normal do núcleo C++ nem a prévia web.

## Como executar

1. Abra a aba **Actions** do repositório PS3X360.
2. Selecione **Experimental OpenXeChain toolchain build**.
3. Clique em **Run workflow** e confirme.
4. Acompanhe os logs até a conclusão. Se terminar com sucesso, baixe o artefato chamado `OpenXeChain-toolchain-EXPERIMENTAL-not-validated-on-console`.

## Limites importantes

- A toolchain é um projeto aberto em desenvolvimento; o próprio projeto informa que há recursos ausentes e não garante estabilidade.
- Este fluxo compila a toolchain, não a dashboard PS3X360 como um XEX.
- Mesmo que o artefato seja produzido, isso não prova que um XEX da dashboard será gerado, carregará pelo Aurora ou funcionará no Xbox 360 RGH.
- O próximo marco após uma compilação bem-sucedida é compilar um programa mínimo com a toolchain, verificar o arquivo produzido e só então avaliar a portabilidade do núcleo PS3X360.
- O artefato é temporário (7 dias) e experimental; não substitua o Aurora nem use esse resultado como dashboard principal.

Referência upstream: https://github.com/OpenXeChain/buildscript
