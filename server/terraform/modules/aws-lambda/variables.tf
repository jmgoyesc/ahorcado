variable "path" {
    description = "Location of lambda's source code"
    type = string
}

variable "name" {
    type = string
}

variable "description" {
  type = string
}

variable "region" {
  type = string
}

variable "variables" {
  type = map
}

variable "policies" {
  type = map
}