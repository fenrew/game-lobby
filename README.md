# Lobby Server Template

## What is it

This is a template for a server using NodeJS and socketIO that can be used to create lobbies. The initial thought is for it to be much like a gaming lobby where users can join a lobby, start a game together, and clean up after the game once it is finished.

## Run locally

How to run the lobby locally as a developer

### Client

cd app
npm run dev

### Server

cd server
npm run dev

## Components

The major components of the server are:

- A NodeJS server with Express
- SocketIO that can be used for rapid communication between clients
- A Class (Lobby) that contains information on users present in the same lobby, the active game instance and several useful operational methods (See below for more documentation on the Lobby class)

## The Lobby Class

### Methods:

#### Lobby:

- CreateRoom: Create a new Room for the lobby
- DeleteRoom: Delete a Room
- FindRoom: Find a Room
- FindUsersRoom: Find a Room that belongs to a User (takes a userId, string or number)
- ChangeRoomName: Changes the name of the room. It must be a unique name

#### Room:

- AddUser: Add user to lobby
- RemoveUser: Remove user from lobby
- PromoteUser: Promote new lobby creator (for transfering permissions)
- AttachInstance: Attach (game?) instance to lobby
- DetachInstance: Detaches the (game?) instance from the lobby
- ChangeName: Changes the name of the room.

### Room States:

- Closed (Boolean): Prevents the addition of more players (if lobby is full or the game has started)
