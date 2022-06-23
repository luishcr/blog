---
title: "Raspberry-Pi con UbuntuServer-ARM, docker, Pi-hole, OwnCloud, WireGuard y Portainer"
date: "22 Junio, 2022"
excerpt: "Configura una Raspberry-pi con Ubuntu Server, docker, servidor DNS (pi-hole), nube local (OwnCloud), servidor VPN (WireGuard) y gestor de contenedores UI (Portainer)"
cover_image: "/images/articles/2/portada.jpg"
---

## Descripción.
La Raspberry-Pi es como un mini ordenador preparado para utilizarse en diversos campos como la domótica, róbotica, IoT, desarrollo de software y con la que podemos crear proyectos interesantes como por ejemplo los presentes en la <a href="https://projects.raspberrypi.org/en" target="_blank" rel="noreferrer"> página oficial de Raspberry Pi </a>. 

En esta ocasión, configuraremos este dispositivo para que funcione como un bloquedor de anuncios o bloqueador de rastreadores en toda nuestra red local (ordenadores, teléfonos, tablets, SmartTVs), y así, obtener una mayor privacidad y seguridad de nuestros datos con <a href="https://pi-hole.net/" target="_blank" rel="noreferrer"> Pi-Hole </a>. Además crearemos una nube para subir documentos o archivos livianos con <a href="https://owncloud.com/" target="_blank" rel="noreferrer"> OwnCloud </a>, que podemos acceder desde cualquier lugar gracias a una VPN <a href="https://www.wireguard.com/" target="_blank" rel="noreferrer"> WireGuard </a>. Instalaremos estas herramientas utilizando contenedores docker que podremos administrar y monitorear con <a href="https://www.portainer.io/" target="_blank" rel="noreferrer"> Portainer</a>.

Como requisitos, simplemente necesitamos una Raspberry Pi 3 o 4, con al menos 2 GB de RAM para instalar <a href="https://ubuntu.com/download/raspberry-pi" target="_blank" rel="noreferrer"> Ubuntu Server 22.04 LTS</a> en una MicroSD (+8 GB), con ayuda del programa <a href="https://www.raspberrypi.com/software/" target="_blank" rel="noreferrer"> Raspberry Pi Imager </a> 


## Instalación de Ubuntu Server, conexión remota y actualización del firmware.
Resumen del procedimiento:

- Instalamos y abrimos Raspberry Pi Imager.
  
![Raspbery Pi Imager](/images/articles/2/raspberry_pi_imager.png)

&nbsp;

- Seleccionamos el sistema operativo descargado (Ubuntu Server ARM64). 
  
![Raspbery Pi Imager select OS](/images/articles/2/raspberry_imager_select_OS.png)

&nbsp;

- Seleccionamos la tarjeta MicroSD conectada al lector de tarjetas del PC, le damos a "WRITE" y cuando termine la instalación, la insertamos en la ranura de la Raspi.
  
![Raspbery Pi Imager storage](/images/articles/2/raspberry_pi_imager_storage.png)

&nbsp;

- Encendemos y conectamos la Raspberry-Pi al router, modem o punto de acceso, mediante cable ethernet y averiguamos su dirección IP local asignada por DHCP desde la consola con el siguiente comando:
  
```bash
# Windows
arp -a | findstr "b8-27-eb dc-a6-32 e4-5f-01" 

# Linux
arp -na | grep -i  "b8:27:eb\|dc:a6:32\|e4:5f:01" 
```

&nbsp;

- Conexión remota por protocolo SSH con la dirección IP obtenida. La primera vez, nos pedirá la contraseña por defecto "ubuntu" y nos forzará a cambiarla:
  
```bash
ssh ubuntu@192.168.1.x
```

&nbsp;

- Actualizamos los paquetes, como buena práctica:
  
```bash
sudo apt update
sudo apt upgrade
```

&nbsp;

- Raspberry Pi 4 Boot EEPROM, actualización manual opcional para modelos Pi 4, 400, Compute Module 4, que mejoran el rendimiento y arreglan bugs. Información detallada en la <a href="https://www.raspberrypi.com/documentation/computers/raspberry-pi.html#raspberry-pi-4-boot-eeprom" target="_blank" rel="noreferrer"> documentación </a> y <a href="https://github.com/raspberrypi/rpi-eeprom" target="_blank" rel="noreferrer"> repositorio de github </a>.
  
```bash
sudo rpi-eeprom-update -a
sudo reboot
```


## Instalación de Docker.
- Seguiremos las instrucciones correspondientes de la documentación de <a href="https://docs.docker.com/engine/install/ubuntu/" target="_blank" rel="noreferrer"> docker engine </a> para ubuntu arm64. Instalaremos el repositorio Docker, el cual nos permite disponer de actualizaciones automáticas de seguridad, al actualizar Ubuntu:
  
```bash
 sudo apt-get update

 sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```

```bash
 sudo mkdir -p /etc/apt/keyrings
 curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```

```bash
 echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

&nbsp;

- Instalación de Docker Engine:
  
```bash
 sudo apt-get update
 sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

&nbsp;

- Comprobamos que funciona Docker Engine:
  
```bash
 sudo docker run hello-world
// Hello from Docker!
// This message shows that your installation appears to be working correctly
```

&nbsp;

- Instalamos docker compose, que nos permite definir y ejecutar varios contenedores a la vez.

```bash
 sudo apt-get update
 sudo apt-get install docker-compose-plugin
```

## Configuración de contenedores de Pi-Hole, OwnCloud, WireGuard, Portainer.


## Información adicional.
- Como instalar <a href="https://ubuntu.com/tutorials/how-to-install-ubuntu-on-your-raspberry-pi#1-overview" target="_blank" rel="noreferrer"> Ubuntu Server en Raspberry Pi  </a>.
- Raspberry Pi Documentation <a href="https://www.raspberrypi.com/documentation/computers/" target="_blank" rel="noreferrer"> Ubuntu Server en Raspberry Pi  </a>.
- Documentación de <a href="https://docs.docker.com/engine/install/ubuntu/" target="_blank" rel="noreferrer"> Docker Engine </a> y <a href="https://docs.docker.com/compose/install/compose-plugin/#install-using-the-repository" target="_blank" rel="noreferrer"> Docker Compose </a>.