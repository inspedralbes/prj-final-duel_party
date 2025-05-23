# 🎲 DuelParty - Multijugador Local🕹️

## Integrantes:
- **Diego Mujica** 💡
- **Elihu Valdelomar** 💡

## Descripción del Proyecto:
**DuelParty** es un juego de **multijugador local** que ofrece una experiencia interactiva utilizando los **dispositivos móviles** de los jugadores. En este juego, de **2 jugadores**, competirán entre sí jugando diversos **minijuegos** en para conseguir subir cada vez mas una **montaña**. ¡El objetivo es llegar primero a la cima , mientras te diviertes ganando minijuegos!

## 🚀 Estado del Proyecto:
Actualmente, el proyecto se encuentra en **desarrollo**. Estamos trabajando en la implementación de los primeros **minijuegos** ,en la optimización de la interfaz y mejora del diseño. 

## 📅 Herramientas de Trabajo:
- **NODE.JS** : backend servidor sockets.io.
- **NUXT.JS** : frontend

## 🌐 URL de Producción:
- **URL de Producción**: [duelparty.com](https://duelparty.com) (disponible)

## 🛠️ Estado de Desarrollo:
El proyecto está en fase inicial, estamos implementando los minijuegos y la funcionalidad básica del tablero.

## 💻 Com començar (per a nous desenvolupadors):

### 1. Clona el repositori:

`git clone (url del proyecte)`

`cd prj-final-duel_party`

### 2. Assegura't de tenir Docker instal·lat

Si no tens Docker instal·lat, pots seguir aquests passos segons el teu sistema operatiu:

- **Linux (Ubuntu/Debian)**
  
`sudo apt update`

`sudo apt install docker.io docker-compose -y`

`sudo systemctl start docker`

`sudo systemctl enable docker`

- **MacOS / Windows**
  
`Ves a https://www.docker.com/products/docker-desktop`

`Descarrega i instal·la Docker Desktop`

`Reinicia el teu sistema si cal`

**Assegura’t que Docker funciona correctament amb:**

`docker --version`

`docker-compose --version`

### 3. Configuració manual del servidor de Node.js:

Obre el fitxer **front/static/socket.js**.

Comenta i descomenta manualment les rutes del socket segons el context que vulguis provar.

### 4. Executa el projecte en local:

`docker-compose up`

Això arrencarà automàticament els 2 servidors (nuxt i node).

### 5. Accedeix al projecte en el teu navegador:

Nxut: `http://localhost:3000`

Node: `http://localhost:20071`

### 🚀 Desplegament a Producció:

El projecte utilitza una GitHub Action per desplegar automàticament a producció quan es fa push a la branca main.

El sistema s'encarrega del desplegament automàtic.

