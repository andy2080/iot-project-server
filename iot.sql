DROP DATABASE IF EXISTS iot;
CREATE DATABASE iot;

\c iot;

CREATE TYPE sensor_type AS ENUM ('temperature', 'humidity', 'gyrometer', 'accelerator');
CREATE TABLE group_1 (
  ID SERIAL PRIMARY KEY,
  value real,
  sensor_name sensor_type,
  time_stamp timestamptz
);

INSERT INTO group_1 (value, sensor_name, time_stamp)
  VALUES (1.02, 'humidity', now());
