FROM valkey/valkey:8.0-alpine

# Run Valkey with persistence enabled and require the password from env
CMD ["sh", "-c", "valkey-server --appendonly yes --requirepass \"$VALKEY_PASSWORD\""]
