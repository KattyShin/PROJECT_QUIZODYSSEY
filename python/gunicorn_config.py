# Number of worker processes
# Using 1 worker to prevent memory issues on free tier
workers = 1

# Maximum time (in seconds) a worker can handle a request before being killed
timeout = 120

# The socket to bind to
bind = "0.0.0.0:10000"

# Preload application code before worker processes are forked
# This helps with memory usage
preload_app = True

# Type of worker class to use
# 'sync' is the standard synchronous worker
worker_class = 'sync'

# Maximum number of simultaneous clients
worker_connections = 1000

# Maximum requests a worker will process before restarting
# This helps prevent memory leaks
max_requests = 1000
max_requests_jitter = 100

# Logging
accesslog = '-'
errorlog = '-'
loglevel = 'info'