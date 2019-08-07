# Sistema de Monitoramento de Insumos da Universidade de Brasília - S.M.I.
The Sistema de Monitoramento de Insumos of the Universidade de Brasília (SMI-UnB), is a web application developed to assist in the monitoring and management of Universidade de Brasília's power consumption and distribution.

The idea is to monitor, collect and display data of each campus power supply, allowing a much better comprehension of the usage patterns and energy quality received from the distribution station.

The system is divided into three main layers:

- the presentation layer, which holds the front-end of the application, including the dashboard for researchers.
- the master layer, which is responsible for all the data management, data processing, and database redundancy.
- the slave layer is responsible for the communication with energy transductors and data collection.