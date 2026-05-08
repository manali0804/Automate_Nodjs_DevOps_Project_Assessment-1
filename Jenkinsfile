pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
        SSH_KEY = credentials('ec2-ssh-key')
        IMAGE_NAME = "manalitekawade0804/nodejsapp"
        EC2_HOST = "3.108.196.139"
        EC2_USER = "ubuntu"
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Set Branch') {
            steps {
                script {
                    env.BRANCH = env.GIT_BRANCH?.replace("origin/", "") ?: "main"
                    echo "Building branch: ${env.BRANCH}"
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:${env.BRANCH} ./App"
            }
        }

        stage('Login to DockerHub') {
            steps {
                sh """
                    echo ${DOCKERHUB_CREDENTIALS_PSW} | docker login -u ${DOCKERHUB_CREDENTIALS_USR} --password-stdin
                """
            }
        }

        stage('Push Image') {
            steps {
                sh "docker push ${IMAGE_NAME}:${env.BRANCH}"
            }
        }

        stage('Deploy') {
            when {
                anyOf {
                    branch 'main'
                    branch 'stage'
                }
            }

            steps {
                sshagent(['ec2-ssh-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} '
                            cd /home/ubuntu/devops &&

                            docker pull ${IMAGE_NAME}:${env.BRANCH} &&

                            if [ "${env.BRANCH}" = "stage" ]; then
                                docker compose -f docker-compose_staging.yml down &&
                                docker compose -f docker-compose_staging.yml up -d
                            fi

                            if [ "${env.BRANCH}" = "main" ]; then
                                docker compose -f docker-compose_production.yml down &&
                                docker compose -f docker-compose_production.yml up -d
                            fi
                        '
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
