# Automate_Nodjs_DevOps_Project_Assessment-1

# Node.js DevOps Project

Production-ready Node.js application deployed using Docker, Jenkins CI/CD, AWS EC2, Nginx reverse proxy, and Prometheus/Grafana monitoring.

---

# Project Overview

This project demonstrates a complete DevOps workflow for deploying a containerized Node.js application with PostgreSQL database on AWS infrastructure.

The implementation includes:

- Node.js
- PostgreSQL database
- Docker containerization
- Jenkins CI/CD pipeline
- AWS EC2 deployment
- Nginx reverse proxy
- Prometheus & Grafana monitoring
- Security best practices
- Environment variable management

---

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

