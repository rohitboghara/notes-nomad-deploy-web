data_dir = "/opt/nomad/data"
log_level = "INFO"

client {
  enabled = true
  servers = ["10.54.19.217:4647"]
  node_class = "web"
  host_volume "pgdata" {
    path      = "/opt/pgdata"
    read_only = false
  }
}

plugin "docker" {
  config {
    volumes {
      enabled = true
    }

    allow_privileged = false
    extra_labels = ["job_name", "task_group_name", "task_name"]
  }
}

