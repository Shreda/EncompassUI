provider "aws" {
    profile = "default"
    region = "ap-southeast-2"
}

# resource "aws_s3_bucket" "staging_devsecurely_net" {
#     bucket = "staging.devsecurely.net"
#     acl = "public-read"
#     policy = <<S3POLICY
# {
#     "Version": "2012-10-17",
#     "Statement": [
#         {
#             "Sid": "PublicReadGetObject",
#             "Effect": "Allow",
#             "Principal": "*",
#             "Action": [
#                 "s3:GetObject"
#             ],
#             "Resource": [
#                 "arn:aws:s3:::staging.devsecurely.net/*"
#             ]
#         }
#     ]
# }
# S3POLICY
#     website {
#         index_document = "index.html"
#         error_document = "index.html"
#     }
# }

resource "aws_s3_bucket" "app_tacent_io" {
    bucket = "app.tacent.io"
    acl = "public-read"
    policy = <<S3POLICY
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:GetObject"
            ],
            "Resource": [
                "arn:aws:s3:::app.tacent.io/*"
            ]
        }
    ]
}
S3POLICY
    website {
        index_document = "index.html"
        error_document = "index.html"
    }
}

resource "aws_iam_role" "CodeBuild" {
    name = "CodeBuild"
    
    assume_role_policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Service": "codebuild.amazonaws.com"
            },
            "Action": "sts:AssumeRole"
        }
    ]
}
EOF
}

resource "aws_iam_role_policy" "codebuildpolicy" {
    role = "${aws_iam_role.CodeBuild.name}"
    policy = <<POLICY
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Resource": [
                "*"
            ],
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"                   
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:*"
            ],
            "Resource": [
                "${aws_s3_bucket.app_tacent_io.arn}",
                "${aws_s3_bucket.app_tacent_io.arn}/*"
            ]
        },
        {
            "Action": [
                "ecr:BatchCheckLayerAvailability",
                "ecr:CompleteLayerUpload",
                "ecr:GetAuthorizationToken",
                "ecr:InitiateLayerUpload",
                "ecr:PutImage",
                "ecr:UploadLayerPart"                
            ],
            "Resource": "*",
            "Effect": "Allow"
        }
    ]
}
POLICY
}

resource "aws_codebuild_project" "tacentreactbuild" {
    name = "tacentreactbuild"
    build_timeout = "5"
    service_role = "${aws_iam_role.CodeBuild.arn}"



    environment {
        compute_type = "BUILD_GENERAL1_SMALL"
        image = "aws/codebuild/nodejs:10.1.0"
        type = "LINUX_CONTAINER"
        environment_variable {
            name = "S3_BUCKET"
            value = "s3://${aws_s3_bucket.app_tacent_io.bucket}"
        }
        environment_variable {
            name = "REACT_APP_STAGE"
            value = "production"
        }
    }

    artifacts {
        type = "S3"
        location = "${aws_s3_bucket.app_tacent_io.bucket}"
        path = "build/*"
    }

    source {
        type = "GITHUB"
        location = "https://github.com/danielmoore-info/EncompassUI.git"
        git_clone_depth = 1
    }
}


resource "aws_codebuild_webhook" "example" {
  project_name = "${aws_codebuild_project.tacentreactbuild.name}"

  filter_group {
    filter {
      type = "EVENT"
      pattern = "PUSH"
    }

    filter {
      type = "HEAD_REF"
      pattern = "master"
    }
  }
}