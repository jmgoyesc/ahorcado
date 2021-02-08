# s3 bucket for the website
resource "aws_s3_bucket" "ahorcado" {
  bucket = "ahorcado.esfacil.de"
  acl    = "public-read"
  policy = file("s3.bucket.policy.json")

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}