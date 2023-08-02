# Organizer

Building an app with .Net Core and React

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


