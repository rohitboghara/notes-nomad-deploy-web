---

# 🚀 Notes App Deployment Using Nomad, Docker, MongoDB & Nginx

This guide explains how to deploy the **Notes App** (Frontend + Backend) using **Docker**, **Nomad**, **MongoDB**, and **Nginx Reverse Proxy**.

---

## 📦 1. Clone the Repository

```bash
git clone https://github.com/rohitboghara/notes-nomad-deploy-web.git
cd notes-nomad-deploy-web
```

---

## 🗄️ 2. Configure Backend Environment

```bash
cd backend
vim .env
```

Set your backend environment variables:

```
PORT=5000
MONGO_URI=mongodb://<mongodb-server-ip>:27017/notesapp
```

Save & exit.

---

## 🛠️ 3. Build & Push Backend Docker Image

```bash
docker build -t <docker-hub-username>/nomad-notes-backend:latest .
docker push <docker-hub-username>/nomad-notes-backend:latest
```

---

## 🎨 4. Configure Frontend API URL

```bash
cd ../frontend
vim src/App.jsx
```

Find this line:

```js
const API_URL = 'http://10.54.19.152:5000/api';
```

Replace with:

```js
const API_URL = 'http://<backend-server-ip>:5000/api';
```

Save & exit.

---

## 🖼️ 5. Build & Push Frontend Docker Image

```bash
docker build -t <docker-hub-username>/nomad-notes-frontend:latest .
docker push <docker-hub-username>/nomad-notes-frontend:latest
```

---

## 📝 6. Update Nomad Job Files

```bash
cd ../nomad/web-app/
vim frontend-backend-deploy.nomad
```

Update:

```
image = "<docker-hub-username>/nomad-notes-backend:latest"
image = "<docker-hub-username>/nomad-notes-frontend:latest"
```

Save & exit.

---

## 🚀 7. Deploy Services Using Nomad

### Deploy MongoDB

```bash
nomad job run mongo.nomad
```

### Deploy Frontend + Backend

```bash
nomad job run frontend-backend-deploy.nomad
```

### Check Status

```bash
nomad status
```

---

## 🌐 8. Configure Nginx Reverse Proxy

```bash
cd ../../nginx
mv frontend.conf /etc/nginx/conf.d/
systemctl restart nginx
```

---

## 🖥️ 9. Nomad Server & Client Configuration

### 🔹 1. Nomad Server Setup

```bash
cd ../nomad/configuration-client-server/
mv database-client-nomad.hcl /etc/nomad.d/nomad.hcl
systemctl restart nomad
nomad agent -config=/etc/nomad.d/nomad.hcl
```

---

### 🔹 2. Nomad Client 1 (Web Client)

```bash
scp -r web-client-nomad.hcl root@<client1-ip>:/etc/nomad.d/nomad.hcl
systemctl restart nomad
```

---

### 🔹 3. Nomad Client 2 (Database Client)

```bash
scp -r database-client-nomad.hcl root@<client2-ip>:/etc/nomad.d/nomad.hcl
systemctl restart nomad
```

---

## ✅ Deployment Completed

Your Notes App is now deployed using:

* Docker
* Nomad (Server + Client)
* MongoDB
* Nginx Reverse Proxy

---

