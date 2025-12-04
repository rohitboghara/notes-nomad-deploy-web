job "notes-app-deploy" {
  datacenters = ["dc1"]
  type        = "service"

  group "frontend" {
    constraint {
      attribute = "${node.class}"
      operator  = "="
      value     = "web"
    }


    count = 1

    network {
      port "frontend" {
        static = 3000
        to     = 80
      }
    }

    task "frontend" {
      driver = "docker"

      config {
        image = "root938/nomad-notes-frontend:latest"
        ports = ["frontend"]
      }
      resources {
        cpu    = 100
        memory = 256
      }
    }
  }

  group "backend" {
    count = 1
    constraint {
      attribute = "${node.class}"
      operator  = "="
      value     = "web"
    }

    network {
      port "backend" {
        static = 5000
      }
    }
    task "backend" {
      driver = "docker"

      config {
        image = "root938/nomad-notes-backend:v1"
        ports = ["backend"]
      }
      resources {
        cpu    = 100
        memory = 256
      }
    }
  }
}
