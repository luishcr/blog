---
title: "Raspberry-Pi con UbuntuServer-ARM, docker, Pi-hole, OwnCloud, WireGuard y Portainer"
date: "21 Junio, 2022"
excerpt: "Configura una Raspberry-pi con Ubuntu Server, docker, servidor DNS (pi-hole), nube local (OwnCloud), servidor VPN (WireGuard) y gestor de contenedores UI (Portainer)"
cover_image: "/images/articles/2/portada.jpg"
---

## Descripción.
La Raspberry-Pi es como un mini ordenador preparado para utilizarse en diversos campos como la domótica, róbotica, IoT, desarrollo de software, etc, con la que podemos crear proyectos interesantes como por ejemplo los que podemos encontrar en la [página oficial de Raspberry Pi](https://projects.raspberrypi.org/en). 

En este post, explicaré como configurar este aparatito para que funcione como un bloquedor de anuncios o bloqueador de rastreadores en toda nuestra red local, y así, obtener una mayor privacidad y seguridad en todos nuestros dispositivos conectados a internet (ordenadores, teléfonos, tablets, SmartTVs...) con [Pi-Hole](https://pi-hole.net/). Además crearemos una nube local con [OwnCloud](https://owncloud.com/) que podremos conectarnos desde cualquier lugar del mundo gracias a una VPN [WireGuard](https://www.wireguard.com/). Instalaremos estas herramientas utilizando contenedores docker que podremos administrar y monitorear con [Portainer](https://www.portainer.io/).


## Primeros pasos, instalación del SO Ubuntu Server y actualización del firmware.
Para no extender demasiado el artículo, nos saltaremos el paso del montaje de una Raspberry-Pi, puesto que existe una infinidad de tutoriales y reviews en internet sobre los modelos actuales, carcasas, disipadores, etc. Simplemente tendremos en cuenta que necesitaremos una Raspberry Pi 3 o 4, con al menos 2 GB de RAM para instalar [Ubuntu Server 22.04 LTS](https://ubuntu.com/download/raspberry-pi) dentro de una MicroSD con mínimo 16 GB de espacio libre, utilizando el programa [Raspberry Pi Imager](https://www.raspberrypi.com/software/).

&nbsp;

El procedimiento es el siguiente:

- Instalamos y abrimos Raspberry Pi Imager.
  
![Raspbery Pi Imager](/images/articles/2/raspberry_pi_imager.png)

&nbsp;

- Selecionamos el sistema operativo descargado (Ubuntu Server ARM64). 
  
![Raspbery Pi Imager select OS](/images/articles/2/raspberry_imager_select_OS.png)

&nbsp;

- Seleccionamos la tarjeta MicroSD y le damos a "WRITE".
  
![Raspbery Pi Imager storage](/images/articles/2/raspberry_pi_imager_storage.png)

&nbsp;



## Instalación de Pi-Hole.


## Instalación de OwnCloud.


## Instalación de de WireGuard.