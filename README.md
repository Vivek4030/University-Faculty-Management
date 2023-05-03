# University-Faculty-Management

## Tech Stack Used:- 
Frontend:- HTML, CSS, Javascript, Typescript, Angular
Backend:- Nodejs, Expressjs
Database:- MySQL

## Description
UFM is an angular based web application that enables an admin user to add, edit or delete any faculty profile and generates the portfolio for that faculty/scholar automatically.
It has two access levels:- Admin User who can add, edit or delete profiles. 
                           Normal Users who can just read the profiles and can't operate on it.
                           
## SetUp and Run Locally
1. Clone the Repository to your local system.
2. Make sure you have node, npm installed on your system.
3. cd to the backend and run npm install in cmd.
4. Install MySql community server and set it up locally creating a root user and password.
5. Create a new database named "facultydb" in your database server.
6. Go to config file in backend and enter your root password for database server in the development block
7. Run npm install sequelize-cli to install sequelize-cli
8. Run command sequelize db:migrate
9. Run npm run start to start your backend server

10. For frontend, open a new terminal and run npm install in that terminal by cd to frontend
11. Run npm run start to start your frontend
12. http://localhost:4200/ -> frontend

## Screenshot of running app
### Landing Page
![image](https://user-images.githubusercontent.com/132473370/235988486-e3c10adc-739e-4402-8492-64372bb01454.png)


### About Us Page
![image](https://user-images.githubusercontent.com/132473370/235988721-e907dd94-ec61-4225-9cf2-a73da7e5c5a8.png)


### Contact Us Page
![image](https://user-images.githubusercontent.com/132473370/235988941-d9efdd45-f6db-4454-b8ca-967c1fcdacfa.png)


### Faculty Profiles page
![image](https://user-images.githubusercontent.com/132473370/235989232-5e097316-137d-47d5-9b3a-7a7db7085b00.png)


### Scholar Profiles page
![image](https://user-images.githubusercontent.com/132473370/235989506-8a643d4b-66ad-4f25-84f3-3875acee6594.png)


### Portfolio Details Page
![image](https://user-images.githubusercontent.com/132473370/235989693-27a8ff69-fca6-4f44-ab22-9777551ab139.png)

                           
### Login to Admin Panel
Admin User has password preset for it and can be accessed at http://localhost:4200/login
Admin username -> admin@123.com
Password -> 12345678
![image](https://user-images.githubusercontent.com/132473370/235984519-dbd8452d-8d50-414e-b19f-78ffbbb99cae.png)


### Add New Member Page
![image](https://user-images.githubusercontent.com/132473370/235989948-f8b52e61-94a8-43ae-a562-bbb2dd95ffb6.png)


### Add Member Form
![image](https://user-images.githubusercontent.com/132473370/235990160-2665a768-b942-45da-a44e-3ee822b68549.png)


### Update Member Form
![image](https://user-images.githubusercontent.com/132473370/235990235-01057a85-37ff-4858-88dd-c85b8d228b08.png)

