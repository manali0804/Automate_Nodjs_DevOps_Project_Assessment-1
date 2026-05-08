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
                checkout scm
            }
        }

        stage('Set Branch Name') {
            steps {
                script {
                    env.BRANCH = env.GIT_BRANCH?.replace("origin/", "") ?: "main"
                    echo "Building branch: ${env.BRANCH}"
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME}:${env.BRANCH} ./App"
                }
            }
        }

        stage('Login to DockerHub') {
            steps {
                sh """
                    echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin
                """
            }
        }

        stage('Push Image') {
            steps {
                script {
                    sh "docker push ${IMAGE_NAME}:${env.BRANCH}"
                }
            }
        }

        stage('Deploy to Staging') {
            when {
                branch 'stage'
            }

            steps {
                sshagent(['ec2-ssh-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@3.108.196.139 << 'EOF'
                        cd /home/ubuntu/devops
                        docker pull ${IMAGE_NAME}:stage
                        docker compose -f docker-compose_staging.yml down
                        docker compose -f docker-compose_staging.yml up -d
                        EOF
                    """
                }
            }
        }

        stage('Deploy to Production') {
            when {
                branch 'main'
            }

            steps {
                sshagent(['ec2-ssh-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@3.108.196.139 << 'EOF'
                        cd /home/ubuntu/devops
                        docker pull ${IMAGE_NAME}:main
                        docker compose -f docker-compose_production.yml down
                        docker compose -f docker-compose_production.yml up -d
                        EOF
                    """
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline SUCCESS ✅"
        }
        failure {
            echo "Pipeline FAILED ❌"
        }
    }
}
