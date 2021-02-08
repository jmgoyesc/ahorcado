module "lambda_ws_connect" {
  source      = "./modules/aws-lambda"
  path        = "${path.module}/../lambdas/ws_connect"
  name        = "ws_connect"
  description = "Connect WebSocket. Register user connection"
  region      = var.region
  variables = {
    CONNECTION_DB_TABLE = "ahorcado_players"
  }
  policies = {
    "dynamo_add" = "${path.module}/../lambdas/policies/dynamo_add.json"
  }
}

module "lambda_ws_disconnect" {
  source      = "./modules/aws-lambda"
  path        = "${path.module}/../lambdas/ws_disconnect"
  name        = "ws_disconnect"
  description = "Disconnect WebSocket. Delete user connection"
  region      = var.region
  variables = {
    CONNECTION_DB_TABLE = "ahorcado_players"
  }
  policies = {
    "dynamo_delete" = "${path.module}/../lambdas/policies/dynamo_delete.json"
  }
}

module "lambda_ws_get_status" {
  source      = "./modules/aws-lambda"
  path        = "${path.module}/../lambdas/ws_get_status"
  name        = "ws_get_status"
  description = "Get status of the game"
  region      = var.region
  variables = {
    GAME_DB_TABLE = "ahorcado_game"
  }
  policies = {
    "dynamo_delete" = "${path.module}/../lambdas/policies/dynamo_game_getitem.json"
  }
}