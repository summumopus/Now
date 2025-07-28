-- Create facilities table
CREATE TABLE IF NOT EXISTS facilities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  country VARCHAR(100) NOT NULL,
  region VARCHAR(50) NOT NULL,
  specialty VARCHAR(255) NOT NULL,
  rating DECIMAL(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  accreditation TEXT[] DEFAULT '{}',
  price_range VARCHAR(100),
  estimated_cost INTEGER,
  languages TEXT[] DEFAULT '{}',
  wait_time VARCHAR(100),
  description TEXT,
  contact_phone VARCHAR(50),
  contact_email VARCHAR(255),
  contact_website VARCHAR(255),
  address TEXT,
  established VARCHAR(10),
  beds VARCHAR(10),
  departments TEXT[] DEFAULT '{}',
  image_urls TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create treatments table
CREATE TABLE IF NOT EXISTS treatments (
  id SERIAL PRIMARY KEY,
  facility_id INTEGER REFERENCES facilities(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  price_range VARCHAR(100),
  duration VARCHAR(100),
  recovery VARCHAR(255),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create doctors table
CREATE TABLE IF NOT EXISTS doctors (
  id SERIAL PRIMARY KEY,
  facility_id INTEGER REFERENCES facilities(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  specialty VARCHAR(255),
  experience VARCHAR(100),
  education TEXT,
  languages TEXT[] DEFAULT '{}',
  image_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_facilities_country ON facilities(country);
CREATE INDEX IF NOT EXISTS idx_facilities_region ON facilities(region);
CREATE INDEX IF NOT EXISTS idx_facilities_specialty ON facilities(specialty);
CREATE INDEX IF NOT EXISTS idx_facilities_estimated_cost ON facilities(estimated_cost);
CREATE INDEX IF NOT EXISTS idx_treatments_facility_id ON treatments(facility_id);
CREATE INDEX IF NOT EXISTS idx_doctors_facility_id ON doctors(facility_id);

-- Enable Row Level Security (RLS)
ALTER TABLE facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE treatments ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on facilities" ON facilities FOR SELECT USING (true);
CREATE POLICY "Allow public read access on treatments" ON treatments FOR SELECT USING (true);
CREATE POLICY "Allow public read access on doctors" ON doctors FOR SELECT USING (true);
