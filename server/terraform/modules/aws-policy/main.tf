data "aws_caller_identity" "current" {}

data "template_file" "policy_template" {
   template = file(var.path_policy_json)

   vars = {
     region = var.region
     account_id = data.aws_caller_identity.current.account_id
     lambda_name = var.lambda_name
   }
 }

resource "aws_iam_role_policy" "policy" {
  name = var.policy_name
  role = var.role_id
  policy = data.template_file.policy_template.rendered
}