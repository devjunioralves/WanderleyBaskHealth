CREATE TABLE IF NOT EXISTS mapped_urls (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url_source VARCHAR(255) NOT NULL,
    url_mapped VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);