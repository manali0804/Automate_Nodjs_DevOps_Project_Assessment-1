# Automate Node.js DevOps Project Assessment

# Project Overview
This project demonstrates a complete DevOps workflow for deploying a containerized Node.js application using:

Docker
Docker Compose
Jenkins CI/CD Pipeline
Nginx Reverse Proxy
GitHub Integration
prometheus
grafana

The goal of this project is to automate:

Application build
Docker image creation
Container deployment
Continuous Integration & Continuous Deployment (CI/CD)
Monitor Application (grafana) 


# Architecture
Developer Pushes Code → GitHub Repository
                            ↓
                        Jenkins Pipeline
                            ↓
                    Build Docker Image
                            ↓
                 Docker Compose Deployment
                            ↓
                     Node.js Application
                     
# Technologies used

 Component | Technology 
 Backend | Node.js + Express 
 Database | PostgreSQL 
 Containerization | Docker + Docker Compose 
 CI/CD | Jenkins 
 Reverse Proxy | Nginx 
 Monitoring | Prometheus + Grafana + Node Exporter 
 Cloud Platform | AWS EC2 
 Version Control | GitHub 

---

# Features
Dockerized Node.js application
Automated CI/CD pipeline using Jenkins
Multi-environment deployment
Nginx reverse proxy configuration
GitHub integration with Jenkins
Easy container management using Docker Compose
Monitoring application using prometheus and grafana

# Application Endpoints

Method | Endpoint | Description 

GET | /health | Health check API 
GET | /users | Fetch all users 
POST | /users | Add new user 

---

# Project Structure

```text
DevOps_project/
│
├── App/
│   ├── app.js
│   ├── package.json
    |__ package-lock.json
│   ├── Dockerfile
|   |__ .env
│   └── .env.producation
    |__ .env.staging
    |__ node_modules
    
│__ Monitoring_configuration
    |__ prometheus.yml  
├── docker-compose.yml
|__ docker-compose_production.yml
|__ docker-compose_staging.yml 
├── Jenkinsfile
├── nginx_configurtion/
│   └── nginx.conf

# Prerequisites

Before running the project, install:

Docker
Docker Compose
Jenkins
Git
Node.js (optional for local testing)

# Clone Repository
git clone https://github.com/manali0804/Automate_Nodjs_DevOps_Project_Assessment-1.git

cd Automate_Nodjs_DevOps_Project_Assessment-1
