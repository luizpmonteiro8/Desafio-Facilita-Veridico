# Desafio Facilita Jurídico - Sistema de Gerenciamento de Clientes

## Introdução

Este código foi desenvolvido como parte do desafio proposto pela empresa Facilita Jurídico. O objetivo do desafio é criar um Sistema de Gerenciamento de Clientes, dividido em duas partes. Na Parte 1, é necessário desenvolver um backend em Node.js utilizando PostgreSQL como banco de dados, e um frontend em React. A empresa deseja centralizar as informações dos clientes, como nome, email e telefone, em uma plataforma que permita listar, filtrar e cadastrar novos clientes.

Na Parte 2, além do cadastro e visualização de clientes, a empresa busca otimizar as rotas de atendimento. Um mapa bidimensional representa a localização dos clientes, com coordenadas X e Y. O desafio consiste em calcular a rota mais eficiente partindo da empresa (0,0) e passando por todos os clientes cadastrados no banco de dados, retornando à empresa no final. O algoritmo para calcular essa rota deve ser disponibilizado via rota da API e ser acionado pelo frontend ao clicar em um botão na tela de clientes.

## Tecnologias Utilizadas

### Backend
- **Nestjs:** Framework Node.js para o desenvolvimento do backend.
- **Pg:** Biblioteca para acesso ao banco de dados PostgreSQL.

### Frontend
- **Vite React-TS:** Ambiente de desenvolvimento para o frontend React com TypeScript.
- **Formik e Yup:** Utilizados para a criação e validação de formulários.
- **Leaflet e React-Leaflet:** Para a geração de mapas, essenciais na visualização das coordenadas dos clientes.
- **Recharts:** Biblioteca para criação de gráficos.
- **Daisy UI:** Componentes de interface para agilizar o desenvolvimento.
- **React Router:** Para a navegação entre diferentes páginas no frontend.
- **React Icons:** Ícones para enriquecer a interface.
- **React Query:** Utilizado para consultas de dados eficientes.