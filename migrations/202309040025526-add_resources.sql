-- // Manual migration run

-- add a resources table
CREATE TABLE IF NOT EXISTS resources (
    id SERIAL PRIMARY KEY,
    title TEXT,
    description TEXT,
    resource_type TEXT,
    link TEXT,
    list_order INTEGER
);

CREATE TABLE IF NOT EXISTS organization_resources (
  organization_id UUID REFERENCES organizations (id),
  resource_id INTEGER REFERENCES resources (id),
  PRIMARY KEY (organization_id, resource_id)
);