CREATE TABLE IF NOT EXISTS GAME (
    id SERIAL PRIMARY KEY NOT NULL,
    team1 TEXT NOT NULL,
    team2 TEXT NOT NULL,
    week INTEGER NOT NULL,
)