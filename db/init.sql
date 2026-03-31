CREATE TABLE IF NOT EXISTS fields (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(255) NOT NULL,
  location varchar(255) NOT NULL,
  area_hectares decimal(10, 2) NOT NULL,
  crop_type varchar(100) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sensors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  field_id uuid NOT NULL REFERENCES fields(id) ON DELETE CASCADE,
  type varchar(50) NOT NULL,
  serial_number varchar(100) NOT NULL,
  installed_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sensor_readings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sensor_id uuid NOT NULL REFERENCES sensors(id) ON DELETE CASCADE,
  value decimal(10, 3) NOT NULL,
  unit varchar(20) NOT NULL,
  recorded_at timestamptz NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_sensor_readings_sensor_id_recorded_at
  ON sensor_readings (sensor_id, recorded_at);

INSERT INTO fields (id, name, location, area_hectares, crop_type) VALUES
  ('a1b2c3d4-1111-4000-8000-000000000001', 'Fushë Krujë Vineyard', 'Fushë-Krujë, Durrës County', 4.50, 'grape'),
  ('a1b2c3d4-2222-4000-8000-000000000002', 'Berat Olive Grove', 'Berat, Berat County', 8.20, 'olive'),
  ('a1b2c3d4-3333-4000-8000-000000000003', 'Lushnjë Vegetable Farm', 'Lushnjë, Fier County', 3.00, 'tomato');

INSERT INTO sensors (id, field_id, type, serial_number, installed_at) VALUES
  ('b1b2c3d4-0101-4000-8000-000000000001', 'a1b2c3d4-1111-4000-8000-000000000001', 'soil_temperature', 'ST-001', '2026-01-15'),
  ('b1b2c3d4-0102-4000-8000-000000000002', 'a1b2c3d4-1111-4000-8000-000000000001', 'soil_moisture',    'SM-001', '2026-01-15'),
  ('b1b2c3d4-0103-4000-8000-000000000003', 'a1b2c3d4-1111-4000-8000-000000000001', 'soil_ec',          'EC-001', '2026-01-15'),
  ('b1b2c3d4-0201-4000-8000-000000000004', 'a1b2c3d4-2222-4000-8000-000000000002', 'soil_temperature', 'ST-002', '2026-01-15'),
  ('b1b2c3d4-0202-4000-8000-000000000005', 'a1b2c3d4-2222-4000-8000-000000000002', 'soil_moisture',    'SM-002', '2026-01-15'),
  ('b1b2c3d4-0203-4000-8000-000000000006', 'a1b2c3d4-2222-4000-8000-000000000002', 'soil_ec',          'EC-002', '2026-01-15'),
  ('b1b2c3d4-0301-4000-8000-000000000007', 'a1b2c3d4-3333-4000-8000-000000000003', 'soil_temperature', 'ST-003', '2026-01-15'),
  ('b1b2c3d4-0302-4000-8000-000000000008', 'a1b2c3d4-3333-4000-8000-000000000003', 'soil_moisture',    'SM-003', '2026-01-15'),
  ('b1b2c3d4-0303-4000-8000-000000000009', 'a1b2c3d4-3333-4000-8000-000000000003', 'soil_ec',          'EC-003', '2026-01-15');


DO $$
DECLARE
  sensor RECORD;
  i INT;
  reading_time TIMESTAMPTZ;
  reading_value DECIMAL(10,3);
  reading_unit VARCHAR(20);
  hour_of_day INT;
  base_min DECIMAL;
  base_max DECIMAL;
  interval_seconds INT := (7 * 24 * 3600) / 100;
BEGIN
  FOR sensor IN SELECT s.id, s.type, f.crop_type FROM sensors s JOIN fields f ON f.id = s.field_id
  LOOP
    FOR i IN 0..99 LOOP
      reading_time := now() - interval '7 days' + (i * interval_seconds * interval '1 second');
      hour_of_day := EXTRACT(HOUR FROM reading_time);

      IF sensor.type = 'soil_temperature' THEN
        reading_unit := '°C';
        base_min := 18; base_max := 32;
        IF sensor.crop_type = 'grape' THEN base_min := base_min + 1; base_max := base_max + 1; END IF;
        IF sensor.crop_type = 'tomato' THEN base_min := base_min - 1; base_max := base_max - 1; END IF;
        IF hour_of_day < 7 THEN base_max := base_max - 8;
        ELSIF hour_of_day BETWEEN 11 AND 15 THEN base_min := base_min + 5;
        ELSIF hour_of_day >= 20 THEN base_max := base_max - 6;
        END IF;
        reading_value := ROUND((base_min + random() * (base_max - base_min))::numeric, 1);

      ELSIF sensor.type = 'soil_moisture' THEN
        reading_unit := '%';
        base_min := 15; base_max := 40;
        IF sensor.crop_type = 'grape' THEN base_min := base_min - 5; base_max := base_max - 5; END IF;
        IF sensor.crop_type = 'olive' THEN base_min := base_min - 3; base_max := base_max - 3; END IF;
        IF sensor.crop_type = 'tomato' THEN base_min := base_min + 5; base_max := base_max + 5; END IF;
        IF hour_of_day BETWEEN 5 AND 7 THEN base_min := base_min + 3; base_max := base_max + 5; END IF;
        reading_value := ROUND((base_min + random() * (base_max - base_min))::numeric, 1);

      ELSIF sensor.type = 'soil_ec' THEN
        reading_unit := 'dS/m';
        base_min := 0.2; base_max := 1.5;
        IF sensor.crop_type = 'grape' THEN base_min := base_min + 0.1; END IF;
        IF sensor.crop_type = 'tomato' THEN base_min := base_min + 0.15; END IF;
        reading_value := ROUND((base_min + random() * (base_max - base_min))::numeric, 2);
      END IF;

      INSERT INTO sensor_readings (sensor_id, value, unit, recorded_at)
      VALUES (sensor.id, reading_value, reading_unit, reading_time);
    END LOOP;
  END LOOP;
END $$;
