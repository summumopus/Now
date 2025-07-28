-- Add indexes for better query performance
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_facilities_search 
ON facilities USING gin(to_tsvector('english', name || ' ' || specialty || ' ' || description));

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_facilities_rating_cost 
ON facilities(rating DESC, estimated_cost ASC);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_facilities_region_specialty 
ON facilities(region, specialty);

-- Add materialized view for popular searches
CREATE MATERIALIZED VIEW IF NOT EXISTS popular_treatments AS
SELECT 
  specialty,
  COUNT(*) as facility_count,
  AVG(rating) as avg_rating,
  MIN(estimated_cost) as min_cost,
  MAX(estimated_cost) as max_cost
FROM facilities 
GROUP BY specialty
ORDER BY facility_count DESC;

-- Refresh the materialized view
REFRESH MATERIALIZED VIEW popular_treatments;

-- Create function to refresh popular treatments daily
CREATE OR REPLACE FUNCTION refresh_popular_treatments()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW popular_treatments;
END;
$$ LANGUAGE plpgsql;

-- Add RLS policies for better security
CREATE POLICY "Enable read access for all users" ON facilities FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON treatments FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON doctors FOR SELECT USING (true);
