# State bucket for storing and sharing terraform state
terraform {
  backend "s3" {
    bucket  = "javascript-levelup-test-bucket-1465"
    key     = "terraform-state/terraform.tfstate"
    region  = "eu-west-1"
    encrypt = true
  }
}
