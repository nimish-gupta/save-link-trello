#!/bin/bash

set -eux

ENCRYPTION_KEY=$1

FILE_NAME='.env'
ENCRYPTED_FILE_NAME="$FILE_NAME.encrypted"
openssl aes-256-cbc -e -in $FILE_NAME -out $ENCRYPTED_FILE_NAME -md md5 -k $ENCRYPTION_KEY
echo "Encrypted file $ENCRYPTED_FILE_NAME"
