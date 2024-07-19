
## Installation

Clone the project

```bash
  git clone https://github.com/AhmadHafidz1316/TestingExpressAPI.git
```

Location
```bash
  cd to your location TestingExpressAPI
```

 Install using NPM
```bash
  npm install
```

## How to using this API to your Local

First, run your MYSQL 

Settings your ENV file, change your .env.example to .env

```bash
DB_DATABASE=your_database
DB_HOST=your_host
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_CONNECTION=your_connection
PORT=your_port

JWT_SECRET=  your_secret_code
JWT_EXPIRES_IN = your_expires_time
```

Create the Database
```bash
  npx sequelize-cli db:create  
```

Migrate to your Database
```bash
  npx sequelize-cli db:migrate  
```

Seed your data to your Database
```bash
  npx sequelize-cli db:seed:all
```


## You can see the routes in routes/routes.js








    