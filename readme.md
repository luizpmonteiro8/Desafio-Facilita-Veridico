# Desafio Facilita Jurídico - Sistema de Gerenciamento de Clientes

Link da hospedagem na Vercel: [Desafio Facilita Jurídico](https://desafio-facilita-veridico.vercel.app/)
*Observação: o vercel limita solicitações acima de 10 segundos, causando erro algumas vezes quando vai gerar rotas.*

## E por fim
![Finalização](https://github.com/luizpmonteiro8/Desafio-Facilita-Veridico/blob/main/image.png)

## Introdução

Este código foi desenvolvido como parte do desafio proposto pela empresa Facilita Jurídico. O objetivo do desafio é criar um Sistema de Gerenciamento de Clientes, dividido em duas partes. Na Parte 1, é necessário desenvolver um backend em Node.js utilizando PostgreSQL como banco de dados, e um frontend em React. A empresa deseja centralizar as informações dos clientes, como nome, email e telefone, em uma plataforma que permita listar, filtrar e cadastrar novos clientes.

Na Parte 2, além do cadastro e visualização de clientes, a empresa busca otimizar as rotas de atendimento. Um mapa bidimensional representa a localização dos clientes, com coordenadas X e Y. O desafio consiste em calcular a rota mais eficiente partindo da empresa (0,0) e passando por todos os clientes cadastrados no banco de dados, retornando à empresa no final. O algoritmo para calcular essa rota deve ser disponibilizado via rota da API e ser acionado pelo frontend ao clicar em um botão na tela de clientes.

## Vídeo
[Assista ao vídeo](https://drive.google.com/file/d/14w7ZYrQXVyG-Q_dYonUnX5JZbCy4H7m2/view)

## Tecnologias Utilizadas

### Backend
- **Nestjs:** Framework Node.js para o desenvolvimento do backend.
- **Pg:** Biblioteca para acesso ao banco de dados PostgreSQL.

### Frontend
- **Vite React-TS:** Ambiente de desenvolvimento para o frontend React com TypeScript.
- **Formik e Yup:** Utilizados para a criação e validação de formulários.
- **Leaflet e React-Leaflet:** Para a geração de mapas, essenciais na visualização das coordenadas dos clientes.
- **Recharts:** Biblioteca para criação de gráficos.
- **Daisy UI:** Componentes de interface para agilizar o desenvolvimento e responsividade.
- **React Router:** Para a navegação entre diferentes páginas no frontend.
- **React Icons:** Ícones para enriquecer a interface.
- **React Query:** Utilizado para consultas de dados eficientes.

# Instalação

## Baixar do Repositório

- [Repositório no GitHub](https://github.com/luizpmonteiro8/Desafio-Facilita-Veridico.git)
- [Download como ZIP](https://github.com/luizpmonteiro8/Desafio-Facilita-Veridico/archive/refs/heads/main.zip)

## Backend

1. Dentro da pasta `backend`, execute o comando para instalar as dependências:
    ```bash
   npm install ou yarn install
2. Crie um arquivo `.env` com as seguintes informações de acesso ao PostgreSQL:

   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_DATABASE=seu_banco
   DB_SSLENABLED=false
3. No banco de dados, crie a tabela `customers` utilizando o DDL disponível no arquivo `ddl.txt`.
4. Inicie o servidor com o comando:

   ```bash
   npm run start:dev
*Observação: O arquivo `Dll.txt` está localizado na pasta backend.*
## Frontend

1. Dentro da pasta `frontend`, execute o comando para instalar as dependências:
    ```bash
   npm install ou yarn install
2. Crie um arquivo `.env` com a seguinte informação:

   ```env
   VITE_API_URL=http://localhost:3000
3. Inicie o servidor de desenvolvimento com o comando:

   ```bash
   npm run dev
4. Agora é só acessar o endereço fornecido pelo Vite: [http://localhost:5173/](http://localhost:5173/)

## Ambiente Testado

- Banco de dados: PostgreSQL versão 14
- Node.js: Versão 18

## Meu canal do youtube:
[Youtube - Luiz Pedro programador](https://www.youtube.com/@luizpedro-programador)

