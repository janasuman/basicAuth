pipeline {
    agent any

    environment {
        FRONTEND_PATH = "frontend"  // Replace with the actual path to your frontend directory
        BACKEND_PATH = "backend"    // Replace with the actual path to your backend directory
        DEPLOY_PATH = "/path/to/deploy"  // Replace with the actual deployment path
    }

    stages {
        stage('Clone Repository') {
            steps {
                echo 'Cloning repository...'
                git branch: 'main', url: 'git@github.com:janasuman/basicAuth.git'
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir(env.FRONTEND_PATH) {
                    echo 'Installing frontend npm dependencies...'
                    sh 'npm install'
                }
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir(env.BACKEND_PATH) {
                    echo 'Installing backend npm dependencies...'
                    sh 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir(env.FRONTEND_PATH) {
                    echo 'Building the frontend project...'
                    sh 'npm start' // Replace with your actual frontend build command
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir(env.BACKEND_PATH) {
                    echo 'Building the backend project...'
                    sh 'npm start' // Replace with your actual backend build command
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying to server...'
                // Assuming frontend and backend build outputs are in dist or build directories
                // sh """
                //     mkdir -p ${env.DEPLOY_PATH}/frontend
                //     mkdir -p ${env.DEPLOY_PATH}/backend
                //     rsync -avz --delete ${env.FRONTEND_PATH}/dist/ ${env.DEPLOY_PATH}/frontend
                //     rsync -avz --delete ${env.BACKEND_PATH}/dist/ ${env.DEPLOY_PATH}/backend
                //     cd ${env.DEPLOY_PATH}/backend
                //     npm install --production
                //     pm2 restart all
                // """
            }
        }
    }

    post {
        always {
            echo 'Cleaning workspace...'
            cleanWs()
        }
        success {
            echo 'Deployment successful'
        }
        failure {
            echo 'Deployment failed'
        }
    }
}
