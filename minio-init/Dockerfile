FROM alpine:latest

# Install curl and bash
RUN apk add --no-cache curl bash

# Install minio client
RUN curl https://dl.min.io/client/mc/release/linux-amd64/mc -o /usr/local/bin/mc && \
    chmod +x /usr/local/bin/mc

# Copy the script
COPY create-buckets.sh /create-buckets.sh

# Make script executable
RUN chmod +x /create-buckets.sh

# Set the entrypoint
ENTRYPOINT ["/create-buckets.sh"]
