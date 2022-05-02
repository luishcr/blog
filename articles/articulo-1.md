---
title: "Entorno de trabajo para desarrolladores (WSL, VS Code, ZSH, P10K, Windows Terminal...) "
date: "2 Mayo, 2022"
excerpt: "Configura un entorno de trabajo con Windows Subsystem for Linux,VS Code con las mejores extensiones y terminal con ZSH, Powerlevel 10k, HackNerdFonts y otras utilidades."
cover_image: "/images/articles/img1.jpg"
---

## Windows Subsystem for Linux (WSL)
El primer paso sera instalar WSL, para ello abriremos una consola PowerShell con privilegios de administrador.
Existen varias formas de hacer esto:
- Click derecho (Icono Windows) ➡ Windows Powershell (Admin)
- Tecla Windows + s (Buscar) ➡ Powershell ➡ Run/Abrir como Administrador
  
Una vez la shell abierta, debemos escribir/pegar los siguientes comandos:
1. Instalamos WSL, por defecto instala Ubuntu
```bash
wsl --install
```
2. Si queremos cambiar la distribución debemos indicarlo asi:
```bash
wsl --install -d Debian
```
