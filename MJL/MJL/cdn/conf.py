import os

AWS_ACCESS_KEY_ID=os.environ.get("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY=os.environ.get("AWS_SECRET_ACCESS_KEY")
AWS_STORAGE_BUCKET_NAME=os.environ.get("AWS_STORAGE_BUCKET_NAME")

AWS_S3_ENDPOINT_URL="https://sgp1.digitaloceanspaces.com"

AWS_S3_OBJECT_PARAMETERS = {
    "CacheControl" : "max-age=86400",
}

AWS_LOCATION = f"https://{AWS_STORAGE_BUCKET_NAME}.nyc3.digitaloceanspaces.com"

STATICFILES_STORAGE = "MJL.cdn.backends.StaticRootStorage"
DEFAULT_FILE_STORAGE = "MJL.cdn.backends.MediaRootStorage"