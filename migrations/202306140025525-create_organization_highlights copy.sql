-- // Manual migration run

-- add a summary section to organizations and create a highlights table
ALTER TABLE organizations
ADD COLUMN summary TEXT;

CREATE TABLE IF NOT EXISTS organization_highlights (
    id SERIAL PRIMARY KEY,
    organization_id uuid,
    first_line TEXT,
    second_line TEXT,
    third_line TEXT,
    list_order INTEGER,
    FOREIGN KEY (organization_id) REFERENCES organizations(id)
);

CREATE TABLE IF NOT EXISTS trial_tags (
  trial_id INTEGER,
  tag_id INTEGER,
  FOREIGN KEY (trial_id) REFERENCES trial_data(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (trial_id, tag_id)
);

CREATE TABLE IF NOT EXISTS lab_research (
    id SERIAL PRIMARY KEY,
    organization_id uuid,
    research_type TEXT,
    title Text,
    institution TEXT,
    link TEXT,
    date_published DATE,
    FOREIGN KEY (organization_id) REFERENCES organizations(id)
);

CREATE TABLE IF NOT EXISTS clinical_trials (
    id SERIAL PRIMARY KEY,
    organization_id uuid,
    title Text,
    lead_sponsor TEXT,
    link TEXT,
    active BOOLEAN,
    FOREIGN KEY (organization_id) REFERENCES organizations(id)
);
