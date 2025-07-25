locals {
  domain_name  = "blenz.dev"
  project_name = "job-word-map"
}

variable "github_token" {
  type      = string
  sensitive = true
}

variable "rapid_api_key" {
  type      = string
  sensitive = true
}

variable "porkbun_api_key" {
  type = string
}

variable "porkbun_secret_api_key" {
  type      = string
  sensitive = true
}

terraform {
  backend "s3" {
    region  = "us-west-2"
    bucket  = "terraform-state-20250613"
    key     = "job-word-map.tfstate"
    encrypt = true
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "6.0.0"
    }
    porkbun = {
      source  = "cullenmcdermott/porkbun"
      version = "0.3.0"
    }
  }
}

provider "aws" {
  default_tags {
    tags = {
      Project = local.project_name
    }
  }
}

provider "porkbun" {
  api_key    = var.porkbun_api_key
  secret_key = var.porkbun_secret_api_key
}

resource "aws_amplify_app" "this" {
  name                 = local.project_name
  platform             = "WEB_COMPUTE"
  repository           = "https://github.com/blenz/job-word-map"
  access_token         = var.github_token
  iam_service_role_arn = aws_iam_role.this.arn

  environment_variables = {
    RAPID_API_KEY = var.rapid_api_key
  }

  build_spec = <<-EOT
    version: 1
    frontend:
      phases:
        preBuild:
          commands:
            - npm ci
        build:
          commands:
            - env | grep RAPID_API_KEY >> .env.production
            - npm run build
      artifacts:
        baseDirectory: .next
        files:
          - '**/*'
      cache:
        paths:
          - .npm/**/*
          - .next/cache/**/*
  EOT
}

resource "aws_amplify_branch" "this" {
  app_id            = aws_amplify_app.this.id
  branch_name       = "main"
  enable_auto_build = false

  framework = "Next.js - SSR"
  stage     = "PRODUCTION"
}

resource "aws_amplify_webhook" "this" {
  app_id      = aws_amplify_app.this.id
  branch_name = aws_amplify_branch.this.branch_name
  description = "terraform"
}

resource "aws_iam_role" "this" {
  name = "${local.project_name}-amplify"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect = "Allow"
      Principal = {
        Service = "amplify.amazonaws.com"
      }
      Action = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy_attachments_exclusive" "this" {
  role_name   = aws_iam_role.this.name
  policy_arns = ["arn:aws:iam::aws:policy/service-role/AmplifyBackendDeployFullAccess"]
}

resource "null_resource" "deploy" {
  triggers = {
    now = timestamp()
  }
  provisioner "local-exec" {
    command = "curl -X POST -H 'Content-Type:application/json' '${sensitive(aws_amplify_webhook.this.url)}'"
  }
}

resource "aws_amplify_domain_association" "this" {
  app_id      = aws_amplify_app.this.id
  domain_name = "${local.project_name}.${local.domain_name}"

  sub_domain {
    branch_name = aws_amplify_branch.this.branch_name
    prefix      = ""
  }
}

resource "porkbun_dns_record" "this" {
  name    = local.project_name
  domain  = local.domain_name
  content = [for sub_domain in aws_amplify_domain_association.this.sub_domain : split(" ", sub_domain.dns_record)[2]][0]
  type    = "CNAME"
}


resource "porkbun_dns_record" "dns_verification" {
  name    = trimsuffix(split(" ", aws_amplify_domain_association.this.certificate_verification_dns_record)[0], ".${local.domain_name}.")
  domain  = local.domain_name
  content = split(" ", aws_amplify_domain_association.this.certificate_verification_dns_record)[2]
  type    = "CNAME"
}
