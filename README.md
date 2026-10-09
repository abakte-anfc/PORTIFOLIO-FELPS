# Portfólio de Felipe Godinho

Site em React e Vite, com vídeos, navegação por seções e retrato interativo.

## Rodar localmente

```powershell
npm.cmd install
npm.cmd run dev
```

Abra http://127.0.0.1:5173/.

## Estrutura

- `src/`: aplicação, estilos, dados e componentes do site.
- `portfolio-parts/`: componentes das pastas, navegação, apresentação e contato usados pela aplicação.
- `public/`: nove vídeos do site, duas fotos e a fonte Martian Mono.
- `imagedele/vídeo/`: sete vídeos originais em HEVC, preservados em qualidade original. As versões H.264 compatíveis com navegador estão em `public/videos/`.
- `tests/`: testes de componentes, vídeos e interação no navegador.
- `dist/`: versão compilada, gerada por `npm run build`.

Edite `src/data/portfolio.js` para alterar títulos, vídeos, apresentação e contatos. O retrato usa `public/images/cabeca-padrao.png` e `public/images/cabecinha-ain.png`. Os títulos usam Martian Mono hospedada localmente.

## Verificação

```powershell
npm.cmd run build
npm.cmd test
# Com o servidor local ativo e Chrome instalado:
npm.cmd run test:e2e
node tests/about-3d-browser.mjs
```

Para usar outro executável Chromium nos testes de navegador, configure `PLAYWRIGHT_EXECUTABLE_PATH` com o caminho do navegador.

Os testes recriam `.test-build/`, `dist/components/` e `artifacts/` quando necessário. Esses arquivos são gerados e não fazem parte do código-fonte.

## Clonar do GitHub

Os arquivos MP4 usam Git LFS. Instale Git LFS antes de clonar e execute `git lfs pull` caso os vídeos não sejam baixados automaticamente.
