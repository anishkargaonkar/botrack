from http.client import BAD_REQUEST
import os
import uuid

from flask import Flask, abort, jsonify, make_response, request, json
import requests
from predict import main
from predict import get_default_args
from storage import establish_storage_connection, get_source_file, upload_dir_to_storage

DOWNLOAD_FOLDER = "audio"

app = Flask(__name__)


@app.route("/health", methods=['GET'])
def health():
    return 'Server is live!'


@app.route("/extract", methods=['POST'])
def index():
    data = request.form
    try:
        source_url = data.get('url')
        if source_url is None:
            abort(make_response(jsonify(message="Source url is empty!"), 400))
    except:
        abort(make_response(jsonify(message="Source url is not found!"), 400))

    try:
        print("Download source file...")
        source_url_list = source_url.split('/')
        source_file_name = source_url_list[len(source_url_list) - 1]
        source_directory_name = source_url_list[len(
            source_url_list) - 2] + '__' + uuid.uuid4().hex

        # Create a parent dir
        source_directory_path = os.path.join(
            DOWNLOAD_FOLDER, source_directory_name)
        os.mkdir(source_directory_path)
        source_path = os.path.join(
            DOWNLOAD_FOLDER, source_directory_name, source_file_name)

        print("Downloading source file...")
        source_file = get_source_file(
            dir=source_url_list[len(source_url_list) - 2],
            source_file_name=source_file_name)

        print("Writing to file...")
        source_file.download_to_filename(source_path)
        print("Source file successfully downloaded!")
    except:
        abort(make_response(jsonify(message="Downloading of file failed"), 400))

    args = get_default_args(path=source_path)
    main(args)

    try:

        res = upload_dir_to_storage(dir=source_directory_path,
                            bucket_dir=source_url_list[len(
                                source_url_list) - 2],
                            source_file_name=source_file_name)
    except:
        abort(make_response(jsonify(message="Uploading extracted audio failed!"), 400))

    return make_response(jsonify(res))


if __name__ == "__main__":
    establish_storage_connection()
    app.run(host="127.0.0.1", port=8080, debug=True)
