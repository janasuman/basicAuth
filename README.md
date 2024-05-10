# E-Commerce Web Application

# Basic Authentication Web Application

This web application provides a basic authentication system for users. Authentication is a fundamental aspect of web security, ensuring that only authorized users can access certain resources or perform specific actions within an application.

The purpose of this project is to demonstrate how to implement basic authentication functionalities in a web application. Users can sign up for an account, log in with their credentials, and access protected content. This project serves as a foundation for more complex authentication systems and can be used as a learning tool for developers interested in understanding authentication principles and practices.



## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Installation

To run the E-Commerce Web Application locally using Docker and Docker Compose, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/janasuman/basicAuth.git
    ```

2. Navigate to the project directory:

    ```bash
    cd basicAuth
    ```

3. Run the application with Docker Compose:

    ```bash
    docker-compose up -d
    ```

This command will build and start the Docker containers for the web application, database, and any other services defined in the `docker-compose.yml` file.

4. Once the containers are up and running, you can access the E-Commerce Web Application at `http://localhost:3000` in your web browser.

5. To stop the application and remove the containers, run:

    ```bash
    docker-compose down
    ```




## Usage

### User Perspective:

1. **Sign Up/Login**: 
    - Navigate to the application's URL (`http://localhost:3000` by default).
    - If you're a new user, click on the "Sign Up" button and provide the required information to create an account.
    - If you're an existing user, log in with your credentials.

2. **API DOCS**:
    - For API Reference `http://localhost:3000/api-docs`


## Features

List the main features of the application and any additional functionalities.

- Feature 1: Description
- Feature 2: Description
- ...

## Contributing

Explain how others can contribute to the project. Include guidelines for pull requests, reporting issues, and code style.

1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Make changes and commit them (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Create a pull request

## License

Specify the license under which the project is distributed.

This project is licensed under the [MIT License](LICENSE).
