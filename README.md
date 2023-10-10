# Map Application

## Overview

This project is a Python/Django-based map application that allows users to interact with a map. Users can perform various actions such as creating points on the map, adding/editing labels to these points, and updating the positions of points. The application also provides advanced features like user authentication, distinct markers for each user, and an admin interface.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Testing](#testing)
- [Deployment](#deployment)

## Prerequisites

Before you can run the application using `docker-compose`, you should have the following prerequisites installed on your system:

- Docker
- Docker Compose

## Getting Started

### Running the Application

1. Clone this repository to your local machine.
```bash
   git clone https://github.com/ChanhNguyen17/map-application.git
```

2. Change your working directory to the project folder.
```bash
cd map-application 
```

3. Start the application using `docker-compose`.
```bash
docker-compose up
```

4. Once the services are running, you can access the application in your web browser at `http://localhost:8080`.

### Accessing the Admin Interface

The application includes an admin interface that allows administrators to manage points and users. To access the admin interface:

1. Open your web browser and go to `http://localhost:8000/admin`.

2. Log in using the admin credentials.

3. You will now have access to the admin dashboard, where you can manage points and users.

## Usage

### Interacting with the Map

- Upon accessing the application, you will see a map as the main screen.
- You can scroll the map to explore different areas (map extent is not limited).
- You can create points on the map by clicking on the map pane.
- To edit labels for each point, click on the point marker.
- To update the position of points you created, drag them to the desired location.

### Creating Points

- Click anywhere on the map to create a point.
- A prompt will appear, allowing you to enter a label for the point.
- Once you've entered the label, the point will be created on the map.

### Updating Points

- To update the position of a point, simply drag the point marker to a new location.
- The point's new position will be saved automatically.

## Admin Features

- Admin users have access to the admin site, where they can:
  - View a list of all point objects with their attributes.
  - Filter points by user.
  - Edit point coordinates, properties, and creators.
  - Delete points.
  - See a list of users and the number of points they created.
  - Delete users (points remain).
  - Assign admin rights to other users.

## Testing

You can run tests for both the frontend and backend of the application. 

## Deployment

tbd
