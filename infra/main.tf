locals {
  project_name = "job-word-map"
}

variable "github_token" {
  type      = string
  sensitive = true
}

provider "aws" {}

resource "aws_amplify_app" "this" {
  name                 = local.project_name
  platform             = "WEB_COMPUTE"
  repository           = "https://github.com/blenz/job-word-map"
  access_token         = var.github_token
  iam_service_role_arn = aws_iam_role.this.arn

  environment_variables = {
    "_" = "",
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

# resource "aws_amplify_webhook" "this" {
#   app_id      = aws_amplify_app.this.id
#   branch_name = aws_amplify_branch.this.branch_name
# }

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

  managed_policy_arns = [
    "arn:aws:iam::aws:policy/service-role/AmplifyBackendDeployFullAccess"
  ]
}
