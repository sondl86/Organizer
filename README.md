# Organizer

Building an app with .Net Core and React

# to start the Frontend
got to client-app folder
npm start

# to start the Backend
got to API Folder
dotnet watch --no-hot-reload

# create database
dotnet ef database -s API -p Persistence

# add a migration
dotnet ef migrations add <NameOfMigration> -s API -p Persistence

