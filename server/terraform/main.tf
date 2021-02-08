terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "3.27.0"
    }
    archive = "~> 2.0.0"
    random  = "~> 3.0.0"
  }
}

provider "aws" {
  profile = "default"
  region  = var.region
}