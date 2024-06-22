variable "github_token" {
  type      = string
  sensitive = true
}

provider "aws" {}

resource "aws_amplify_app" "this" {
  name                 = "job-word-map"
  platform             = "WEB"
  repository           = "https://github.com/blenz/job-word-map"
  access_token         = var.github_token
  iam_service_role_arn = aws_iam_role.this.arn

  #   environment_variables = {
  #     NEXT_PUBLIC_API_URL = "https://api.example.com"
  #   }

  build_spec = yamlencode({
    version = 1.0
    frontend = {
      phases = {
        preBuild = {
          commands = ["npm install"]
        }
        build = {
          commands = ["npm run build"]
        }
        artifacts = {
          baseDirectory = ".next"
          files         = ["**/*"]
        }
        cache = {
          paths = ["node_modules/**/*"]
        }
      }
    }
  })
}

resource "aws_iam_role" "this" {
  name = "amplify"

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
    "arn:aws:iam::aws:policy/AdministratorAccess"
  ]
}
