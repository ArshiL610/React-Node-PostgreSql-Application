# Focus Flow - a note taking application

Focus Flow is a robust fullstack note-taking application meticulously crafted to empower users in organizing and managing their notes efficiently. We prioritize the security and convenience of our users, ensuring a seamless and protected note-taking experience.

## Technologies Used

- Frontend: React.js, Material-UI
- Backend: Node.js (Express.js)
- Database: PostgreSQL
- Api Testing: Postman

## Repositories

- Frontend Repo: https://github.com/ArshiL610/React-Node-PostgreSql-Application.git
- Backend Repo: https://github.com/ArshiL610/React-Node-PostgreSql-Application-Backend.git

## Key Features

- **Secure Data Storage**: Focus Flow employs standard encryption techniques to safeguard user data, ensuring that all notes and personal information are stored securely.

- **Password Encryption**: User passwords are securely encrypted using industry-standard hashing algorithms, providing an extra layer of protection for user accounts.

- **One-Time Password (OTP) Mechanism**: For added security, Focus Flow implements OTP mechanisms for password reset. Users can reset their passwords securely through a one-time code sent to their registered email address.

- **Email Notifications**: Stay informed with automatic email notifications for essential account activities, such as successful password changes and user sign-ups.

- **User-Friendly Interface**: Focus Flow is designed with a clean and intuitive user interface, providing a seamless experience for users of all technical backgrounds.

- **Effortless Note Management**: Create, edit, and delete notes with ease. The application's intuitive design allows users to focus on their thoughts without unnecessary complexities.

## Prerequisites

Before running the Focus Flow App, ensure you have the following prerequisites installed:

- Node.js: Make sure you have Node.js and npm (Node Package Manager) installed.
- React.js : Make sure you install npm with the relevant version.
- PostgreSQL: Set up a PostgreSQL database and configure the connection details.

## Getting Started

Follow the steps below to get the Focus Flow application up and running:

### Frontend

1. Navigate to the `[React-Node-PostgreSql-Application]`(https://github.com/ArshiL610/React-Node-PostgreSql-  Application.git) directory:
```bash
cd frontend
```

2. Install the dependencies:
```bash
npm install
```

3. Configure the backend API endpoints in the files/components. (Example: APP_API_URL=http://localhost:5000/api`)
4. Start the development server:
```bash
npm start
```

5. Access the app in your browser at `http://localhost:3000`.

### Backend

1. Navigate to the `[React-Node-PostgreSql-Application-Backend]`(https://github.com/ArshiL610/React-Node-PostgreSql-Application-Backend.git) directory:
```bash
cd backend
```

2. Configure the database connection details in `index.js` file.
3. Install the dependencies(including nodemon for development server, during production build remove the nodemon dev dependency):
```
npm install
```

4. Start the backend server:
```
npm run serve
```

5. The backend server will start at `http://localhost:5000`, with the port number specified as `5000`, you can change it according to your requirements.

## Database Setup

1. Create a new PostgreSQL database for the `Focus Flow` application.
2. Update the database connection details in the backend's `index.js` file.
3. Create the tables based on the understanding upon viewing the 

## Screenshots
![home](https://github.com/ArshiL610/React-Node-PostgreSql-Application/assets/91752244/bfa470fc-d54f-424b-8689-33de5be5391a)
*Home Page/ Login Page*


![signup](https://github.com/ArshiL610/React-Node-PostgreSql-Application/assets/91752244/9aec32e6-3c20-4539-8f10-ae0603a876ce)
*Sign Up Page*


![image](https://github.com/ArshiL610/React-Node-PostgreSql-Application/assets/91752244/b7a8de4f-7f72-43b7-b8d2-57987552f0a9)
*Welcome Email*


![image](https://github.com/ArshiL610/React-Node-PostgreSql-Application/assets/91752244/7f8f5aed-d7b3-419e-9fb7-c458ee46603d)
*Email input for password reset*


![image](https://github.com/ArshiL610/React-Node-PostgreSql-Application/assets/91752244/ea14d25c-e210-41c4-891c-7fe66c39392f)
*Reset Password OTP*


![image](https://github.com/ArshiL610/React-Node-PostgreSql-Application/assets/91752244/1d81170c-4039-472d-861d-556cb41e590c)
*OTP Input Page*


![image](https://github.com/ArshiL610/React-Node-PostgreSql-Application/assets/91752244/d79dc236-d829-448f-9d4d-b7d41a6749aa)
*Password Reset Page*


![image](https://github.com/ArshiL610/React-Node-PostgreSql-Application/assets/91752244/d4f42397-5de9-48ad-b076-46ad27af2149)
*Login Page after password reset*


![image](https://github.com/ArshiL610/React-Node-PostgreSql-Application/assets/91752244/17eca66e-857e-472b-90d6-cd6b0bd5eebf)
*Password update email*


![image](https://github.com/ArshiL610/React-Node-PostgreSql-Application/assets/91752244/f5fa1e3d-cd18-4d8a-8233-ac9dc3554f37)
*Tasks Page after login*


![image](https://github.com/ArshiL610/React-Node-PostgreSql-Application/assets/91752244/4f41aeab-a43d-42b4-9ab1-aad3cbdfa2b9)
![image](https://github.com/ArshiL610/React-Node-PostgreSql-Application/assets/91752244/044ecfe8-e937-4e72-9f30-1ccefba9f207)
*Add task feature*


![image](https://github.com/ArshiL610/React-Node-PostgreSql-Application/assets/91752244/c2cda9ef-c27e-4ae4-ac69-d9a2d99e0025)
![image](https://github.com/ArshiL610/React-Node-PostgreSql-Application/assets/91752244/1e7db02c-ed30-4b84-afba-6321fec9dbc9)
*Edit task feature*


![image](https://github.com/ArshiL610/React-Node-PostgreSql-Application/assets/91752244/d3bf456b-a831-4a7e-afff-ab31969271e0)
*Click the green check icon to mark the task as complete*


![image](https://github.com/ArshiL610/React-Node-PostgreSql-Application/assets/91752244/65b457a8-88ea-4362-9507-8194afdf4da5)
*Click the same check icon to mark the task as incomplete*


![image](https://github.com/ArshiL610/React-Node-PostgreSql-Application/assets/91752244/923f887a-de3c-4ef3-98a7-d823c531237b)
![image](https://github.com/ArshiL610/React-Node-PostgreSql-Application/assets/91752244/a6c27da9-7305-458f-9d4a-313b03767e57)
*Click the delete icon to delete the task*


![image](https://github.com/ArshiL610/React-Node-PostgreSql-Application/assets/91752244/3f5b467b-ec94-417d-b65f-977765b14303)
*Click the info icon on the left to view the instructions about this application*


![image](https://github.com/ArshiL610/React-Node-PostgreSql-Application/assets/91752244/b0637bac-1dce-471e-ba28-1bd50a968768)
*LogOut option in the navbar to log out of the session*


![image](https://github.com/ArshiL610/React-Node-PostgreSql-Application/assets/91752244/1ca2c264-bc76-4bea-bb11-3dd0d86ef74c)
*Click on the link at the bottom-right of the login page to give a review/feedback*


## License

This project is licensed under [Arshil Akkala](LICENSE). You are free to use, modify, and distribute the code as per the terms of the license.

## Contact

If you have any questions or suggestions regarding the Focus Flow application, please feel free to reach out to us at [focusflow244@gmail.com](mailto:focusflow244@gmail.com) (this is embedded in the application as well) or [arshilakkala@gmail.com](mailto:arshilakkala@gmail.com).


Thank you for choosing Focus Flow as your note-taking companion.
