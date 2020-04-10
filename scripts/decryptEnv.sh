#!/bin/bash

set -eux

ENCRYPTION_KEY=$1

FILE_NAME=.env
ENCRYPTED_FILE_NAME="$FILE_NAME.encrypted"
openssl aes-256-cbc -d -in $ENCRYPTED_FILE_NAME -out $FILE_NAME -md md5 -k $ENCRYPTION_KEY
echo "Decryped file $FILE_NAME"
