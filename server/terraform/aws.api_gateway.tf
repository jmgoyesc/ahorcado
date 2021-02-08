module "ahorcado_api" {
  source = "./modules/aws-apigateway"

  lambda_connect = {
      arn = module.lambda_ws_connect.invoke_arn
      function_name = module.lambda_ws_connect.function_name
  }

  lambda_disconnect = {
      arn = module.lambda_ws_disconnect.invoke_arn
      function_name = module.lambda_ws_disconnect.function_name
  }
}