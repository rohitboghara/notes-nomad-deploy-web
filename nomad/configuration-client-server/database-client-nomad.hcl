# Copyright (c) HashiCorp, Inc.
# SPDX-License-Identifier: BUSL-1.1

# Full configuration options can be found at https://developer.hashicorp.com/nomad/docs/configuration

data_dir  = "/opt/nomad/data"
log_level = "INFO"

client {
  enabled = true
  servers = ["10.54.19.217:4647"]
  node_class = "database"
}
