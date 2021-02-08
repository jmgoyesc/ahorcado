resource "aws_apigatewayv2_api" "ahorcado" {
  name                       = "ahorcado_ws"
  protocol_type              = "WEBSOCKET"
  route_selection_expression = "$request.body.action"
}

# disconnect method
resource "aws_apigatewayv2_route" "connect" {
  api_id    = aws_apigatewayv2_api.ahorcado.id
  route_key = "$connect"
  target = "integrations/${aws_apigatewayv2_integration.lambda_connect.id}"
  route_response_selection_expression = "$default"
}

resource "aws_apigatewayv2_integration" "lambda_connect" {
  api_id           = aws_apigatewayv2_api.ahorcado.id
  integration_type = "AWS"

  connection_type           = "INTERNET"
  content_handling_strategy = "CONVERT_TO_TEXT"
  description               = "Lambda connect"
  integration_method        = "POST"
  integration_uri           = var.lambda_connect.arn
  passthrough_behavior      = "WHEN_NO_MATCH"
}

resource "aws_apigatewayv2_integration_response" "lambda_connect" {
  api_id                   = aws_apigatewayv2_api.ahorcado.id
  integration_id           = aws_apigatewayv2_integration.lambda_connect.id
  integration_response_key = "/200/"
}

resource "aws_lambda_permission" "lambda_connect_permission" {
  statement_id  = "AllowMyDemoAPIInvoke"
  action        = "lambda:InvokeFunction"
  function_name = var.lambda_connect.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.ahorcado.execution_arn}/*/$connect"
}



# connect method
resource "aws_apigatewayv2_route" "disconnect" {
  api_id    = aws_apigatewayv2_api.ahorcado.id
  route_key = "$disconnect"
  target = "integrations/${aws_apigatewayv2_integration.lambda_disconnect.id}"
  route_response_selection_expression = "$default"
}

resource "aws_apigatewayv2_integration" "lambda_disconnect" {
  api_id           = aws_apigatewayv2_api.ahorcado.id
  integration_type = "AWS"

  connection_type           = "INTERNET"
  content_handling_strategy = "CONVERT_TO_TEXT"
  description               = "Lambda connect"
  integration_method        = "POST"
  integration_uri           = var.lambda_disconnect.arn
  passthrough_behavior      = "WHEN_NO_MATCH"
}

resource "aws_apigatewayv2_integration_response" "lambda_disconnect" {
  api_id                   = aws_apigatewayv2_api.ahorcado.id
  integration_id           = aws_apigatewayv2_integration.lambda_disconnect.id
  integration_response_key = "/200/"
}

resource "aws_lambda_permission" "lambda_disconnect_permission" {
  statement_id  = "AllowMyDemoAPIInvoke"
  action        = "lambda:InvokeFunction"
  function_name = var.lambda_disconnect.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.ahorcado.execution_arn}/*/$disconnect"
}


# stage production
resource "aws_apigatewayv2_stage" "prod" {
  api_id = aws_apigatewayv2_api.ahorcado.id
  name   = "production"
}