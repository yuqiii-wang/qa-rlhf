python ./backend/app.py
npm start
pushd backend && ./db/elasticsearch-8.15.0/bin/elasticsearch && popd
pushd backend && ./db/kibana-8.15.0/bin/kibana && popd
