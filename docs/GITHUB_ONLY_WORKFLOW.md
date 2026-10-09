# GitHub-only workflow and current build boundary

## What this repository can do today
- The C++ XMB navigation model and its automated tests can be built on GitHub-hosted Windows runners.
- The browser preview in `web-preview/index.html` demonstrates the intended visual direction and keyboard navigation.
- The Windows artifact produced by GitHub Actions is a PC development preview only.

## What it cannot do yet
- The repository does not currently build a valid Xbox 360 `.xex`.
- A Windows runner and CMake do not provide an Xbox 360 compiler, linker, or XEX packager by themselves.
- The browser preview cannot launch games, read Xbox storage, control the console, or replace Aurora.

## Use without installing anything on your PC
1. Open the repository in a browser: https://github.com/davizim140/PS3X360
2. Open `web-preview/index.html` to review the interface source. To run it as an interactive page, enable GitHub Pages for the `/web-preview` directory or use a Pages workflow configured by the repository owner.
3. Open the **Actions** tab and run **Validate PS3X360 core (not XEX)**, or wait for it to run after a push.
4. Open the successful run and download the `PS3X360-Windows-HostPreview` artifact if you want to test the C++ navigation preview on another Windows machine. It is not for the Xbox 360.

## Acceptance criteria before calling it a real Xbox dashboard
1. Identify a legally obtained, compatible Xbox 360 homebrew toolchain that can run in GitHub Actions.
2. Compile and link a minimal native program with that toolchain.
3. Validate that the output is a real XEX using appropriate tooling.
4. Implement Xbox graphics and controller input.
5. Test launching through Aurora on an RGH console and document a safe return path to Aurora.

Do not rename a browser page or Windows executable to `.xex`; the file format and runtime compatibility must be real.
