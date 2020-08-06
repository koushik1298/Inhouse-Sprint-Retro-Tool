CREATE TABLE IF NOT EXISTS boards (
                id serial primary key,
                name text,
                createby text,
                timestamp timestamptz default current_timestamp);
