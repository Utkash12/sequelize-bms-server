# Book Management System

A **Book Management System** built using **Node.js**, with **PostgreSQL** as the database and **Sequelize** as the ORM (Object-Relational Mapping) tool. This system enables users to manage books efficiently, offering functionalities like adding, updating, deleting, and retrieving book records.

## Features

- Add new books to the collection  
- Update book details  
- Remove books from the database  
- List all books  
- Search for books by title

## Technologies Used

- **Node.js** – JavaScript runtime for backend development  
- **Express** – Web framework for handling routes and server logic  
- **PostgreSQL** – Relational database for storing book information  
- **Sequelize** – ORM that simplifies database interactions  

## Prerequisites

Before running this project, ensure you have the following installed:  

- [Node.js](https://nodejs.org/en/) (v14 or later)  
- [PostgreSQL](https://www.postgresql.org/download/) (v12 or later)  
- [Sequelize CLI](https://sequelize.org/docs/v6/cli/) *(Optional, for managing migrations and models)*  

## Installation

### Step 1: Clone the Repository  

Open a terminal and run:  

```bash
git clone https://github.com/Utkash12/sequelize-bms-server
cd bms_sequelize_server
```

### Step 2: Install Dependencies  

Run the following command to install project dependencies:  

```bash
npm install
```

### Step 3: Configure the Database  

Ensure **PostgreSQL** is running and update the database credentials in the `.env` file.

### Step 4: Start the Server  

Run the following command to start the application:  

```bash
npm run dev
```