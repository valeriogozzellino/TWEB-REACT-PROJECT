CREATE TABLE IF NOT EXISTS public.clubs
(
    club_id integer NOT NULL DEFAULT nextval('clubs_club_id_seq'::regclass),
    club_code character varying(50) COLLATE pg_catalog."default",
    name character varying(255) COLLATE pg_catalog."default",
    domestic_competition_id character varying(50) COLLATE pg_catalog."default",
    total_market_value numeric(15,2),
    squad_size integer,
    average_age numeric(5,2),
    foreigners_number integer,
    foreigners_percentage numeric(5,2),
    national_team_players integer,
    stadium_name character varying(255) COLLATE pg_catalog."default",
    stadium_seats integer,
    net_transfer_record character varying(255) COLLATE pg_catalog."default",
    coach_name character varying(255) COLLATE pg_catalog."default",
    last_season integer,
    url character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT clubs_pkey PRIMARY KEY (club_id)
)