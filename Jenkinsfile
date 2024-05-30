pipeline {
    agent any

    environment {
        // Define environment variables if needed
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout your code from the repository
                checkout scm
            }
        }

        stage('Build') {
            parallel {
                stage('Build Frontend') {
                    steps {
                        script {
                            // Build the frontend Docker image
                            sh 'cd frontend && docker-compose build'
                        }
                    }
                }
                stage('Build Backend') {
                    steps {
                        script {
                            // Build the backend Docker image
                            sh 'cd backend && docker-compose build'
                        }
                    }
                }
                stage('Build Database') {
                    steps {
                        script {
                            // Build the database Docker image if applicable
                            sh 'cd database && docker-compose build'
                        }
                    }
                }
            }
        }

        stage('Test') {
            parallel {
                stage('Test Frontend') {
                    steps {
                        script {
                            // Run frontend tests
                            sh 'cd frontend && docker-compose run --rm frontend-container npm run test'
                        }
                    }
                }
                stage('Test Backend') {
                    steps {
                        script {
                            // Run backend tests
                            sh 'cd backend && docker-compose run --rm backend-container ./gradlew test'
                        }
                    }
                }
                stage('Test Database') {
                    steps {
                        script {
                            // Run database tests if applicable
                            sh 'cd database && docker-compose run --rm database-container ./test-database.sh'
                        }
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Deploy all services using Docker Compose
                    sh 'docker-compose -f docker-compose.production.yml up -d'
                }
            }
        }
    }

    post {
        always {
            script {
                // Cleanup actions, notifications, etc.
                echo 'Pipeline execution finished.'
            }
        }
        success {
            script {
                // Actions on success
                echo 'Pipeline execution succeeded.'
            }
        }
        failure {
            script {
                // Actions on failure
                echo 'Pipeline execution failed.'
            }
        }
    }
}
