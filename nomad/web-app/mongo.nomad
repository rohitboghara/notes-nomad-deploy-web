job "mongodb" {
  datacenters = ["dc1"]
  type        = "service"

  group "database" {
    count = 1
    constraint {
      attribute = "${node.class}"
      operator  = "="
      value     = "database"
    }
    volume "mongodb_data" {
      type      = "host"
      read_only = false
      source    = "mongodb_data"
    }

    network {
      port "db" {
        static = 27017
      }
    }
    task "mongodb" {
      driver = "docker"

      config {
        image = "mongo:4.4"
        ports = ["db"]
        mount {
          type   = "volume"
          target = "/data/db"
          source = "mongodb_data"
        }
      }
      env {
        MONGO_INITDB_DATABASE = "notesapp"
      }
      resources {
        cpu    = 256
        memory = 256
      }
    }
  }
}
