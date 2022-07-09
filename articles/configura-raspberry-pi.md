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

- Encendemos y conectamos la Raspberry-Pi al router, modem o punto de acceso, mediante cable ethernet y averiguamos su dirección IP local asignada por DHCP desde la consola PowerShell o WSL, con el siguiente comando:
  
```bash
# PowerShell
arp -a | findstr "b8-27-eb dc-a6-32 e4-5f-01" 

# WSL
arp -na | grep -i  "b8:27:eb\|dc:a6:32\|e4:5f:01" 
```

&nbsp;

- Conexión remota por protocolo SSH con la dirección IP obtenida. La primera vez, nos pedirá la contraseña por defecto "ubuntu" y nos forzará a cambiarla:
  
```bash
ssh ubuntu@192.168.1.x
```

&nbsp;

- Si queremos cambiamos nombre del host ubuntu por raspi, por ejemplo:

```bash
sudo su
echo "raspi" > /etc/hostname
reboot
```

&nbsp;

- Creamos llave ssh para conexión remota sin contraseña. Abrimos otra consola PowerShell o WSL y escribimos:

```bash
ssh-keygen -t rsa -b 4096
```

&nbsp;

- Copiamos el contenido de la llave pública generada en ~/.ssh/id_rsa.pub, podemos cambiarle el nombre a uno más amigable, como por ejemplo: ssh_key_raspi_server.pub.

```bash
cd ~/.ssh
cat ./ssh_key_raspi_server.pub
```

&nbsp;

- Pegamos el contenido de la llave ssh pública generada de la máquina windows o linux en la raspberry-pi (consola previamente conectada por ssh).
  
```bash
cd ~/.ssh/
nano ./authorized_keys
ctrl + v
```

&nbsp;

- Método alternativo, comando "scp" para copiar y pegar archivos entre máquina y servidor por ssh.

```bash
scp -r ~/.ssh/ssh_key_raspi_server.pub ubuntu@192.168.1.x:/home/ubuntu/.ssh/authorized_keys
```

&nbsp;

- Actualización de paquetes, como buena práctica:
  
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

- Instalación de docker engine y docker compose:
  
```bash
 sudo apt-get update
 sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

&nbsp;

- Añadimos el usuario al grupo docker para disponer de los permisos necesarios.
```bash
sudo usermod -aG docker $USER
```

&nbsp;

- Comprobamos que funciona Docker Engine:
  
```bash
docker run hello-world
// Hello from Docker!
// This message shows that your installation appears to be working correctly
```

&nbsp;

- Instalamos docker compose, que nos permite definir y ejecutar varios contenedores a la vez.

```bash
 sudo apt-get update
 sudo apt-get install docker-compose-plugin
```

&nbsp;

- Aliases para docker compose que nos ayudan en la productividad.

```bash
echo "alias dcup='docker-compose -f ~/docker-compose.yml up -d'
alias dcdown='docker-compose -f ~/docker-compose.yml stop'
alias dcpull='docker-compose -f ~/docker-compose.yml pull'
alias dclogs='docker-compose -f ~/docker-compose.yml logs -tf --tail="50" '
alias dtail='docker logs -tf --tail="50" "$@"'" > ~/.bash_aliases
```


## (ACTUALIZANDO) Creación y configuración del fichero docker-compose.yml, con los servicios Pi-Hole, OwnCloud, WireGuard, Portainer.
- Creamos el fichero docker-compose.yml en el directorio ~/home/ubuntu.

```bash
touch ~/docker-compose.yml
```

&nbsp;

- Dentro de docker-compose.yml, añadimos la imagen de pi-hole según el repositorio de <a href="https://github.com/pi-hole/docker-pi-hole#quick-start" target="_blank" rel="noreferrer"> docker-pi-hole </a>.

```bash
version: "3"

services:
  pihole:
    container_name: pihole
    image: pihole/pihole:latest
    # For DHCP it is recommended to remove these ports and instead add: network_mode: "host"
    ports:
      - "53:53/tcp"
      - "53:53/udp"
      - "80:80/tcp"
    environment:
      TZ: 'Europe/Madrid'
      WEBPASSWORD: 'aqui_PASSWORD_para_el_panel_web_admin'   
    # Volumes store your data between container upgrades
    volumes:
      - './etc-pihole:/etc/pihole'
      - './etc-dnsmasq.d:/etc/dnsmasq.d'

    restart: unless-stopped
```


## Información adicional.
- Como instalar <a href="https://ubuntu.com/tutorials/how-to-install-ubuntu-on-your-raspberry-pi#1-overview" target="_blank" rel="noreferrer"> Ubuntu Server en Raspberry Pi  </a>.
- Raspberry Pi Documentation <a href="https://www.raspberrypi.com/documentation/computers/" target="_blank" rel="noreferrer"> Ubuntu Server en Raspberry Pi  </a>.
- Documentación de <a href="https://docs.docker.com/engine/install/ubuntu/" target="_blank" rel="noreferrer"> Docker Engine </a> y <a href="https://docs.docker.com/compose/install/compose-plugin/#install-using-the-repository" target="_blank" rel="noreferrer"> Docker Compose </a>.
- Documentación de <a href="https://docs.pi-hole.net/" target="_blank" rel="noreferrer"> Pi-hole </a> 
