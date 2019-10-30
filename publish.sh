
mkdir -p temp

node build/update_version.js && \
    cp -R package* src/* LICENSE README.md temp && \
    cd temp && npm publish --access public && \
    rm temp

