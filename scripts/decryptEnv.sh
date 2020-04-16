#!/bin/bash

set -eu

ENCRYPTION_KEY=$ENCRYPTION_KEY

if [ -z $ENCRYPTION_KEY ]
then
  echo "hi"
  ENCRYPTION_KEY=$1
fi

FILE_NAME=api/_config/constants.js
ENCRYPTED_FILE_NAME="$FILE_NAME.encrypted"
openssl aes-256-cbc -d -in $ENCRYPTED_FILE_NAME -out $FILE_NAME -md md5 -k $ENCRYPTION_KEY
echo "Decryped file $FILE_NAME"
