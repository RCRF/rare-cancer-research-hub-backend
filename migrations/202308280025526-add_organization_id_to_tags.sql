-- // Manual migration run

-- add a organization_tags table
CREATE TABLE IF NOT EXISTS organization_tags (
    organization_id uuid,
    tag_id INTEGER,
    FOREIGN KEY(organization_id) REFERENCES organizations(id),
    FOREIGN KEY(tag_id) REFERENCES tags(id)
);

-- add a new column tag_type 
ALTER TABLE tags
ADD COLUMN tag_type TEXT;

