variable "lambda_connect" {
  type = object({
    arn    = string
    function_name = string
  })
}
variable "lambda_disconnect" {
  type = object({
    arn    = string
    function_name = string
  })
}