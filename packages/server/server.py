from http.client import BAD_REQUEST
import os
import uuid

from flask import Flask, abort, jsonify, make_response, request, json
import requests
from predict import main
from predict import get_default_args

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
        source_file_name = uuid.uuid4().hex
        source_directory = os.mkdir(os.path.join(DOWNLOAD_FOLDER, source_file_name))
        source_path = os.path.join(DOWNLOAD_FOLDER, source_file_name, source_file_name + '.mp3')
        source_file = open(source_path, "wb")

        print("Downloading source file...")
        r = requests.get(source_url, allow_redirects=True)

        print("Writing to file...")
        source_file.write(r.content)
        source_file.close()
        print("Source file successfully downloaded!");
    except:
        abort(make_response(jsonify(message="Downloading of file failed"), 400))

    args = get_default_args(path=source_path)
    main(args)

    return 'Extraction done successfully!'


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080, debug=True)
