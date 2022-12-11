import os

import firebase_admin
from firebase_admin import credentials, storage


def _initialise_firebase_storage():
    try:
        print('\nConnecting to firebase storage...')
        cred = credentials.Certificate("credentials.json")
        firebase_admin.initialize_app(cred, {
            'storageBucket': 'botrack-d12d6.appspot.com'
        })
        print('Connected to firebase storage successfully! \n Bucket: ' +
              storage.bucket().name + "\n")
    except:
        print("Error ocurred while connecting to firebase storage!")


def establish_storage_connection():
    _initialise_firebase_storage()


def get_source_file(dir=None, source_file_name=None):
    if dir is None:
        return 'Source directory/url not found!'

    if source_file_name is None:
        return 'Source directory/url not found!'

    f = storage.bucket().blob(dir + "/" + source_file_name)
    return f


def upload_dir_to_storage(dir=None, bucket_dir=None, source_file_name=None):
    if dir is None:
        return 'Source directory not found!'

    if bucket_dir is None:
        return 'Bucket dir not found!'

    if source_file_name is None:
        return 'Source file name not found!'

    for filename in os.listdir(dir):
        # Return if it's the source file
        if filename == source_file_name:
            return

        f = os.path.join(dir, filename)
        if os.path.isfile(f):
            print("Upload file: ", f)
            storage.bucket().blob(bucket_dir + '/' + filename).upload_from_filename(f)
