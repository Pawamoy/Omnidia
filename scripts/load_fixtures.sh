#!/usr/bin/env bash
. venv/bin/activate
. scripts/export_env.sh "$@"
./manage.py shell <<EOF
from graph.fixtures import load_genres_batch
load_genres_batch()
EOF
