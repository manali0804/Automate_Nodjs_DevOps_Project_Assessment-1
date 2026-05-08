pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
        SSH_CREDENTIALS = credentials('ec2-ssh-key')
        IMAGE_NAME = "manalitekawade0804/nodejsapp"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: "${env.BRANCH_NAME}",
                credentialsId: 'github-cred',
                url: 'https://github.com/manali0804/Automate_Nodjs_DevOps_Project_Assessment-1'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t $IMAGE_NAME:${env.BRANCH_NAME} ./App"
            }
        }

        stage('Login to DockerHub') {
            steps {
                sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
            }
        }

        stage('Push Image') {
            steps {
                sh "docker push $IMAGE_NAME:${env.BRANCH_NAME}"
            }
        }

        stage('Deploy to Staging') {
            when {
                branch 'develop'
            }
            steps {
                sshagent(['ec2-ssh']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ubuntu@YOUR_EC2_IP '
                    cd /home/ubuntu/devops &&
                    docker pull $IMAGE_NAME:develop &&
                    docker compose -f docker-compose_staging.yml down &&
                    docker compose -f docker-compose_staging.yml up -d
                    '
                    """
                }
            }
        }

        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                sshagent(['ec2-ssh']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ubuntu@YOUR_EC2_IP '
                    cd /home/ubuntu/devops &&
                    docker pull $IMAGE_NAME:main &&
                    docker compose -f docker-compose_production.yml down &&
                    docker compose -f docker-compose_production.yml up -d
                    '
                    """
                }
            }
        }
    }
}
