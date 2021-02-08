# dynamodb tables for players and game
resource "aws_dynamodb_table" "players" {
  name           = "ahorcado_players"
  hash_key       = "connectionId"
  read_capacity  = 5
  write_capacity = 5
  attribute {
    name = "connectionId"
    type = "S"
  }
}

resource "aws_dynamodb_table" "game" {
  name     = "ahorcado_game"
  hash_key = "game"

  read_capacity  = 5
  write_capacity = 5
  attribute {
    name = "game"
    type = "S"
  }
}