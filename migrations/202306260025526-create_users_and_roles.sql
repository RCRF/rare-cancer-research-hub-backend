-- // Manual migration run

-- add a summary section to organizations and create a highlights table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS user_roles (
    user_id INTEGER,
    role_id INTEGER,
    organization_id UUID,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(role_id) REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS organizations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

INSERT INTO roles (role_name) VALUES ('ADMIN') ON CONFLICT (role_name) DO NOTHING;
INSERT INTO roles (role_name) VALUES ('USER') ON CONFLICT (role_name) DO NOTHING;

-- update column name from address to address_1
ALTER TABLE organizations 
RENAME COLUMN address TO address_1;

-- update column name from zip to postal_code
ALTER TABLE organizations
RENAME COLUMN zip TO postal_code;

-- add a new column address_1 
ALTER TABLE organizations
ADD COLUMN address_2 TEXT;

-- add a new column highlight_order 
ALTER TABLE articles
ADD COLUMN highlight_order INTEGER;

-- add a new column management_order 
ALTER TABLE articles
ADD COLUMN management_order INTEGER;

-- add a new column order 
ALTER TABLE article_authors
ADD COLUMN list_order INTEGER;


