---
title: "Entorno de desarrollo con WSL, VS Code, Windows Terminal, NerdFonts, ZSH, P10K..."
date: "2 Mayo, 2022"
excerpt: "Configura un entorno de desarrollo con Windows Subsystem for Linux, VS Code con las mejores extensiones y terminal con ZSH, NerdFonts con Powerlevel 10k y otras utilidades."
cover_image: "/images/articles/1/img1.jpg"
---

## Windows Subsystem for Linux (WSL)
WSL nos permite disponer de todo lo que nos ofrece Linux junto a Windows en nuestra PC sin arranque dual. Como requisitos, nos pide Windows 10 versión 2004 y posteriores (compilación 19041 y posteriores) o Windows 11. Para su instalación, simplemente buscaremos desde la barra de tareas "Powershell", ejecutaremos como Administrador, y escribiremos los siguientes comandos:

&nbsp;

- Instalación de WSL (requiere reincio), luego por defecto instala Ubuntu en su versión WSL 2.
```bash
wsl --install
```

&nbsp;

- Para cambiar o instalar otra distribución diferente:
```bash
wsl --install -d Ubuntu-20.04
```

&nbsp;

- Listar la distribuciones online disponibles para instalar con el comando:
```bash
wsl -l -o
```

&nbsp;

- Mostrar distribuciones actualemente en ejecución y su versión:
```bash
wsl -l -v
```

&nbsp;

- Apagar WSL (desde Powershell) y todas la distribuciones (corriendo en segundo plano):
```bash
wsl --shutdown
```

&nbsp;

En el proceso de instalación indicaremos el nombre de usuario, host y contraseña. Al finalizar, deberíamos tener un directorio /home/usuario y una interfaz simple como esta:

![WSL install](/images/articles/1/wsl_install.jpg)


## Windows Terminal con Nerd Fonts
Con esta herramienta mejoraremos la interfaz de línea de comando de WSL, ya que nos permite abrir varias ventanas o interfaces a la vez, colocar una imagen de fondo, utilizar fuentes con iconos en consola gracias a las <a href="https://www.nerdfonts.com" target="_blank"> Nerd Fonts</a> y muchas más funciones. Así que una vez instalado cualquiera de las Nerd Fonts y Windows Terminal desde Microsoft Store, procedemos a su personalización, que se puede hacer o bien desde la propia interfaz gráfica de la terminal (Configuración > Perfiles/apariencia.. etc) o abriendo el configurable .JSON:

&nbsp;

- Para abrir ubuntu desde Windows Terminal generamos y pegamos su identificar único (GUID/UUID), para ello generamos un UUID desde la interfaz de ubuntu con el siguiente comando:
```bash
uuidgen
```

&nbsp;

- Pegamos el UUID generado, por ejemplo '1e977c71-c8b6-40dd-a76f-39e12dccb30e' en el JSON.
```json
// Perfil por defecto al abrir Windows Terminal, pegamos el UUID de Ubuntu
  "defaultProfile": "{1e977c71-c8b6-40dd-a76f-39e12dccb30e}",
  "language": "es-ES",
  "launchMode": "fullscreen",
  "profiles": {
    "defaults": {
      "font": {
        // El nombre de la fuente descargada de NerdFonts, en este caso 'Hack NF Mono'
        "face": "Hack NF"
      }
    },
    "list": [
      {
        // Ruta de la imagen de fondo que queremos en consola  
        "backgroundImage": "D:\\Documents\\Wallpapers\\ciri-cyberpunk-2077-tv.jpg",
        // Opacidad
        "backgroundImageOpacity": 0.080000000000000002,
        // El UUID de ubuntu
        "guid": "{1e977c71-c8b6-40dd-a76f-39e12dccb30e}",
        "hidden": false,
        "name": "Ubuntu",
        "source": "Windows.Terminal.Wsl"
      }
    ]
  },
```

&nbsp;

Ahora al abrir windows terminal deberíamos tener algo así:
![WSL install](/images/articles/1/windows_terminal.jpg)


## Tuneando la interfaz de línea de comandos (CLI).
Es momento de personalizar la CLI, aquí las posibilidades son infinítitas, en esta ocasión mostraremos como instalar algunas de las herramientas más populares.
- ZSH - una shell más potente.
```bash
sudo apt install zsh
```

&nbsp;

- Powerlevel10k - un tema para zsh. Instalación manual. Clonamos el repositorio en el directorio /home/usuario.
```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ~/powerlevel10k
echo 'source ~/powerlevel10k/powerlevel10k.zsh-theme' >>~/.zshrc
```

&nbsp;

- Abrimos zsh, y seguimos el proceso de configuración. Deberíamos de ver los iconos gracias a las NerdFonts. Esta configuración se puede repetir tanto como queramos editando/borrando el fichero configurable .p10k.zsh que se crea en el directorio /home/usuario o con el comando "p10k configure".
```bash
zsh
p10k configure
```

&nbsp;

- Asignamos zsh como Shell por defecto del sistema para el usuario.
```bash
chsh -s /bin/zsh
```

&nbsp;

- Repetimos los 3 pasos anteriores para el usuario root y creamos un enlace simbólico del fichero .zshrc del usuario en el directorio root, si ya existe, borramos el antiguo.
```bash
sudo su
cd /home/root
ln -s /home/usuario/.zshrc .zshrc
```

&nbsp;

- BAT, un clon de la herramienta 'cat' mejorado.
```bash
wget https://github.com/sharkdp/bat/releases/download/v0.20.0/bat_0.20.0_amd64.deb
sudo dpkg -i bat_0.20.0_amd64.deb
```

&nbsp;

- LSD, un 'ls' con colores, iconos y más característas. 
```bash
wget https://github.com/Peltoche/lsd/releases/download/0.21.0/lsd_0.21.0_amd64.deb
sudo dpkg -i lsd_0.21.0_amd64.deb
```

&nbsp;

- ZSH-Plugins: ZSH-Autosuggestions,

- Aliases para BAT y LSD, añadir al fichero .zshrc
```bash
alias cat='/bin/bat'
alias catn='/bin/cat'
alias catnl='/bin/bat --paging=never'
alias ll='lsd -lh --group-dirs=first'
alias la='lsd -a --group-dirs=first'
alias l='lsd --group-dirs=first'
alias lla='lsd -lha --group-dirs=first'
alias ls='lsd --group-dirs=first'
```

&nbsp; 

- FZF, un buscador en la línea de comando.
```bash
git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf
~/.fzf/install
```

&nbsp;

- HTTPie, cliente http para interactuar con API's.
```bash
curl -SsL https://packages.httpie.io/deb/KEY.gpg | apt-key add -
curl -SsL -o /etc/apt/sources.list.d/httpie.list https://packages.httpie.io/deb/httpie.list
apt update
apt install httpie
apt upgrade httpie
```

&nbsp;


