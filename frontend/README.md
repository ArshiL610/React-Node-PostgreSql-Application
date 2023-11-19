# Focus Flow - a note taking application

Focus Flow is a robust fullstack note-taking application meticulously crafted to empower users in organizing and managing their notes efficiently. We prioritize the security and convenience of our users, ensuring a seamless and protected note-taking experience.

## Technologies Used

- Frontend: React.js, Material-UI
- Backend: Node.js (Express.js)
- Database: PostgreSQL
- Api Testing: Postman

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

1. Navigate to the `[React-Node-PostgreSql-Application]`(https://github.com/ArshiL610/React-Node-PostgreSql-Application.git) directory: `cd frontend`.
2. Install the dependencies: `npm install`.
3. Configure the backend API endpoints in the files/components. (Example: APP_API_URL=http://localhost:5000/api`)
4. Start the development server: `npm start`.
5. Access the app in your browser at `http://localhost:3000`.

### Backend

1. Navigate to the `[React-Node-PostgreSql-Application-Backend]`(https://github.com/ArshiL610/React-Node-PostgreSql-Application-Backend.git) directory: `cd backend`.
2. Configure the database connection details in `index.js` file.
3. Install the dependencies(including nodemon for development server, during production build remove the nodemon dev dependency): `npm install`.
4. Start the backend server: `npm run serve`.
5. The backend server will start at `http://localhost:5000`, with the port number specified as `5000`, you can change it according to your requirements.

## Database Setup

1. Create a new PostgreSQL database for the `Focus Flow` application.
2. Update the database connection details in the backend's `index.js` file.
3. Create the tables based on the understanding upon viewing the 

## Screenshots
![home]()
*Home Page/ Login Page*

![signup]()
*Sign Up Page*

![signupemail]()
*Welcome Email*

![reset]()
*Email input for password reset*

![resetemail]()
*Reset Password OTP*

![passwordreset]()
*Password Reset Page*

![login]()
*Login Page with credentials*

![tasks]()
*Tasks Page*


## License

This project is licensed under [Arshil Akkala](LICENSE). You are free to use, modify, and distribute the code as per the terms of the license.

## Contact

If you have any questions or suggestions regarding the Focus Flow application, please feel free to reach out to us at [focusflow244@gmail.com](mailto:focusflow244@gmail.com) or [arshilakkala@gmail.com](mailto:arshilakkala@gmail.com).


Thank you for choosing Focus Flow as your note-taking companion.