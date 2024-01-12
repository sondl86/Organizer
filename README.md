# Personal Organizer

**Personal Organizer** is an app using .Net 7.0, React 18 (with TypeScript) and MobX.

## BACKEND 

* Clean Architecture and the CQRS + Mediator pattern. This is for separate reads and writes operations in applications. In this pattern read processes are called ‘Queries’ and Write processes are called ‘Commands’. 

* Setting up and configuring ASP.NET Core identity for authentication

* Adding Photo Upload widget and creating user profile pages 
* Entity Framework as the Object Relational Mapper (C# code generates SQL queries to communicate with SQL database)

* Using AutoMapper in ASP.NET Core

* Seeding data for Developing process

* Migrations: generates code for the schema of the DB (Designer creates the migration)

* Services give us more functionality to our logic. We use dependency injection to use Services in other classes inside our app

* HTTP – Middleware: things we can do with the HTTP request when it comes in and when it goes out


## FRONTEND

* single page application with React framework and TypeScript

* client side login and register function 

* MobX as State Management System

* UI using Semantic UI library


### How to start the app

# to start the Frontend
got to client-app folder
npm start

# to start the Backend
got to API Folder
dotnet watch --no-hot-reload
or
dotnet watch run

# create database
dotnet ef database -s API -p Persistence

# drop database
dotnet ef database drop -p Persistence -s API

# add a migration
dotnet ef migrations add <NameOfMigration> -s API -p Persistence

# remove last migration
dotnet ef migrations remove -p Persistence -s API

# to create a new class library
dotnet new classlib -n <NameOfTheProject>

# add new project to the solution
dotnet sln add <NameOfTheProject>

# set up references to the new project
go inside project cd <NameOfTheProject>
dotnet add reference ../<NameOfTheRefererencedPRoject>
For example Infrastructure needs a refernece to the Application project
and API project needs access to the Infrastructure project

# after adding project
dotnet restore

# in order to use the service of a project in another we need an interface


