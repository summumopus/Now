-- Insert sample facilities
INSERT INTO facilities (
  name, location, country, region, specialty, rating, review_count, 
  accreditation, price_range, estimated_cost, languages, wait_time, 
  description, contact_phone, contact_email, contact_website, address, 
  established, beds, departments
) VALUES 
(
  'Bangkok Heart Hospital',
  'Bangkok, Thailand',
  'Thailand',
  'asia',
  'Cardiology',
  4.8,
  1247,
  ARRAY['JCI', 'ISO 9001', 'HA'],
  '$8,000 - $15,000',
  11500,
  ARRAY['English', 'Thai', 'Japanese', 'Chinese'],
  '2-3 weeks',
  'Specialized cardiac care facility with international patient services and modern equipment.',
  '+66 2 310 3000',
  'info@bangkokheart.co.th',
  'www.bangkokheart.com',
  '2 Soi Soonvijai 7, New Petchburi Rd, Huai Khwang, Bangkok 10310, Thailand',
  '1996',
  '554',
  ARRAY['Cardiology & Cardiac Surgery', 'Interventional Cardiology', 'Cardiac Rehabilitation', 'Emergency Cardiac Care']
),
(
  'Apollo Hospitals Chennai',
  'Chennai, India',
  'India',
  'asia',
  'Multi-specialty',
  4.7,
  892,
  ARRAY['JCI', 'NABH'],
  '$6,000 - $12,000',
  9000,
  ARRAY['English', 'Hindi', 'Tamil'],
  '1-2 weeks',
  'Large multi-specialty hospital with comprehensive cardiac care and rehabilitation services.',
  '+91 44 2829 3333',
  'info@apollohospitals.com',
  'www.apollohospitals.com',
  '21, Greams Lane, Off Greams Road, Chennai - 600006, Tamil Nadu, India',
  '1983',
  '750',
  ARRAY['Cardiology', 'Orthopedics', 'Oncology', 'Neurology', 'Gastroenterology']
),
(
  'Acibadem Maslak Hospital',
  'Istanbul, Turkey',
  'Turkey',
  'europe',
  'Cardiology',
  4.6,
  654,
  ARRAY['JCI', 'TÜV'],
  '$7,000 - $14,000',
  10500,
  ARRAY['English', 'Turkish', 'Arabic'],
  '2-4 weeks',
  'Modern hospital with advanced cardiac surgery capabilities and European standards.',
  '+90 212 304 4444',
  'international@acibadem.com.tr',
  'www.acibadem.com.tr',
  'Büyükdere Cd. No:40, 34457 Sarıyer/İstanbul, Turkey',
  '2009',
  '143',
  ARRAY['Cardiology & Cardiac Surgery', 'Oncology', 'Orthopedics', 'Neurology']
);

-- Insert sample treatments
INSERT INTO treatments (facility_id, name, price_range, duration, recovery, description) VALUES 
(1, 'Coronary Artery Bypass (CABG)', '$12,000 - $18,000', '4-6 hours', '7-10 days hospital stay', 'Surgical procedure to improve blood flow to the heart'),
(1, 'Heart Valve Replacement', '$15,000 - $22,000', '3-5 hours', '5-8 days hospital stay', 'Replacement of damaged heart valves with mechanical or biological valves'),
(1, 'Angioplasty & Stenting', '$8,000 - $12,000', '1-2 hours', '1-2 days hospital stay', 'Minimally invasive procedure to open blocked arteries'),
(2, 'Coronary Artery Bypass (CABG)', '$8,000 - $14,000', '4-6 hours', '7-10 days hospital stay', 'Advanced cardiac surgery with experienced surgeons'),
(2, 'Hip Replacement Surgery', '$6,000 - $10,000', '2-3 hours', '5-7 days hospital stay', 'Complete hip joint replacement with rehabilitation'),
(3, 'Heart Valve Replacement', '$10,000 - $16,000', '3-5 hours', '6-9 days hospital stay', 'Advanced valve replacement with European standards');

-- Insert sample doctors
INSERT INTO doctors (facility_id, name, specialty, experience, education, languages) VALUES 
(1, 'Dr. Somchai Jongjirasiri', 'Cardiac Surgeon', '25 years', 'Harvard Medical School, USA', ARRAY['English', 'Thai']),
(1, 'Dr. Siriporn Tangsombatvisit', 'Interventional Cardiologist', '18 years', 'Mayo Clinic, USA', ARRAY['English', 'Thai', 'Japanese']),
(2, 'Dr. Rajesh Kumar', 'Cardiac Surgeon', '22 years', 'All India Institute of Medical Sciences', ARRAY['English', 'Hindi']),
(2, 'Dr. Priya Sharma', 'Orthopedic Surgeon', '15 years', 'Johns Hopkins University, USA', ARRAY['English', 'Hindi', 'Tamil']),
(3, 'Dr. Mehmet Özkan', 'Cardiac Surgeon', '20 years', 'University of Istanbul Medical School', ARRAY['English', 'Turkish']),
(3, 'Dr. Ayşe Demir', 'Interventional Cardiologist', '16 years', 'Charité Berlin, Germany', ARRAY['English', 'Turkish', 'German']);
