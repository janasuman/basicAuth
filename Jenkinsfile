pipeline {
    agent any

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies...'
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                echo 'Building the project...'
                sh 'npm run build' // Replace with your actual build command
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying to server...'
                // sshagent(credentials: ['deploy-key']) {
                //     sh """
                //         ssh $DEPLOY_USER@$DEPLOY_SERVER 'mkdir -p $DEPLOY_PATH'
                //         rsync -avz --delete . $DEPLOY_USER@$DEPLOY_SERVER:$DEPLOY_PATH
                //         ssh $DEPLOY_USER@$DEPLOY_SERVER 'cd $DEPLOY_PATH && npm install --production && pm2 restart all' // Adjust the command as needed
                //     """
                // }
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
