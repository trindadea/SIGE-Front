# Sistema de Monitoramento de Insumos da Universidade de Brasília - S.M.I.

## About

The Sistema de Monitoramento de Insumos of the Universidade de Brasília (SMI-UnB), is a web application developed to assist in the monitoring and management of Universidade de Brasília's power consumption and distribution.

The idea is to monitor, collect and display data of each campus power supply, allowing a much better comprehension of the usage patterns and energy quality received from the distribution station.

The system is divided into three main layers:

- the presentation layer, which holds the front-end of the application, including the dashboard for researchers.
- the master layer, which is responsible for all the data management, data processing, and database redundancy.
- the slave layer is responsible for the communication with energy transductors and data collection.

## Installation

## Locally installing

### Install the dependencies

Instal Yarn using [this link](https://yarnpkg.com/lang/pt-br/docs/install/#debian-stable), and:

```bash
yarn install
```

### Serve the app in development mode

```bash
yarn start
```

### Lint the files

```bash
yarn lint
```

### Build the app for production

```bash
yarn build
```

## Using Docker

### Docker

First install Docker following the instructions according to your Operational System, [here](https://docs.docker.com/install/).

### Docker Compose

After installing Docker, you can install Docker-Compose, also according to your Operational System [here](https://docs.docker.com/compose/install/).

### Runnning SMI Master

If you have already lifted up [SMI Slave's API](https://gitlab.com/lappis-unb/projects/SMI/smi-slave). All you have to do is:

``` bash
sudo docker-compose up
```
If you haven't you must create the docker network needed for Master to connect. As:


``` bash
sudo docker network create smi-network
```

and you can lift up you Master environment with:

``` bash
sudo docker-compose up
```

And, that's it! You have SMI up and running!