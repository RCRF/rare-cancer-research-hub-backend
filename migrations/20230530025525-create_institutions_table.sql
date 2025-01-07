-- // Manual migration run

-- extention to allow the use of uuid
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS tags (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS organizations (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  country TEXT,
  phone TEXT,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS articles (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  headline TEXT,
  description TEXT,
  date_published DATE NOT NULL,
  link TEXT NOT NULL,
  highlighted BOOLEAN DEFAULT FALSE,
  management BOOLEAN DEFAULT FALSE,
  organization_id UUID REFERENCES organizations (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS authors (
  id SERIAL PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  designation TEXT,
  institution TEXT
);

CREATE TABLE IF NOT EXISTS article_authors (
  article_id INTEGER,
  author_id INTEGER,
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
  FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, author_id)
);

CREATE TABLE IF NOT EXISTS articles (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  headline TEXT,
  description TEXT,
  date_published DATE NOT NULL,
  link TEXT NOT NULL,
  organization_id UUID REFERENCES organizations (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS institutions (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  lab TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  country TEXT,
  postal TEXT,
  image TEXT,
  link TEXT
);

CREATE TABLE IF NOT EXISTS providers (
  id UUID PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  designation TEXT,
  institution TEXT NOT NULL,
  address TEXT,
  city TEXT,
  state TEXT,
  country TEXT,
  postal TEXT,
  image TEXT,
  link TEXT,
  order INTEGER
);

CREATE TABLE IF NOT EXISTS provider_tags (
  provider_id UUID,
  tag_id INTEGER,
  FOREIGN KEY (provider_id) REFERENCES providers(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (provider_id, tag_id)
);


CREATE TABLE IF NOT EXISTS institution_tags (
  institution_id UUID,
  tag_id INTEGER,
  FOREIGN KEY (institution_id) REFERENCES institutions(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (institution_id, tag_id)
);

CREATE TABLE IF NOT EXISTS organization_institutions (
  organization_id UUID REFERENCES organizations (id),
  institution_id UUID REFERENCES institutions (id),
  PRIMARY KEY (organization_id, institution_id)
);

CREATE TABLE IF NOT EXISTS organization_providers (
  organization_id UUID REFERENCES organizations (id),
  provider_id UUID REFERENCES providers (id),
  PRIMARY KEY (organization_id, provider_id)
);


CREATE TABLE IF NOT EXISTS trial_data (
  id SERIAL PRIMARY KEY,
  study TEXT NOT NULL,
  treatment TEXT,
  
  category TEXT,
  objective_response INTEGER,
  total_patients INTEGER,
  complete_response INTEGER,
  stable_disease INTEGER,
  orr DECIMAL(5, 2),
  confidence TEXT,
  link TEXT NOT NULL,
  credit TEXT,
  organization_id UUID REFERENCES organizations (id) ON DELETE CASCADE
);


INSERT INTO organizations (name, email, address, city, state, zip, country, phone)
VALUES ('COA - Chromophobe and Oncocytic Tumor Alliance', 'kidneycoa@gmail.com.com', '', 'Buda', 'TX', '78610', 'United States', '');





