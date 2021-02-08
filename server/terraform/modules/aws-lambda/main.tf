locals {
  lambda_src_path = var.path
}

resource "random_uuid" "lambda_src_hash" {
  keepers = {
    for filename in setunion(
      fileset(local.lambda_src_path, "*.js"),
    ) :
    filename => filemd5("${local.lambda_src_path}/${filename}")
  }
}

data "archive_file" "lambda_source_package" {
  type        = "zip"
  source_dir  = local.lambda_src_path
  output_path = "${path.module}/.tmp/${random_uuid.lambda_src_hash.result}.zip"
}

resource "aws_iam_role" "execution_role" {
  name = "ahorcado-lambda-execution-role-${var.name}-${var.region}"
  assume_role_policy = file("${path.module}/assume_role_policy.json")
  tags = {
    provisioner = "terraform"
  }
}

module "policy_log_writer" {
  source = "../aws-policy"
  role_id = aws_iam_role.execution_role.id
  lambda_name = "ahorcado_${var.name}"
  policy_name = "ahorcado-lambda-log-writer-${var.name}"
  path_policy_json = "${path.module}/log_writer_policy.json"
  region = var.region
}

module "extra_policy" {
  for_each = var.policies
  source = "../aws-policy"
  role_id = aws_iam_role.execution_role.id
  lambda_name = "ahorcado_${var.name}"
  policy_name = "ahorcado-lambda-${each.key}-${var.name}"
  path_policy_json = each.value
  region = var.region
}

resource "aws_lambda_function" "lambda_function" {
  function_name = "ahorcado_${var.name}"
  description   = "Ahorcado: ${var.description}"
  role          = aws_iam_role.execution_role.arn
  filename      = data.archive_file.lambda_source_package.output_path
  runtime       = "nodejs12.x"
  handler       = "index.handler"
  memory_size   = 128
  timeout       = 30

  source_code_hash = data.archive_file.lambda_source_package.output_base64sha256

  tags = {
    provisioner = "terraform"
  }

  environment {
    variables = var.variables
  }

  lifecycle {
    ignore_changes = [environment]
  }
}

resource "aws_cloudwatch_log_group" "cloudwatch_log_group" {
  name              = "/aws/lambda/${aws_lambda_function.lambda_function.function_name}"
  retention_in_days = 30
}