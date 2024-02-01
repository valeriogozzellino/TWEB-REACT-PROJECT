CREATE TABLE IF NOT EXISTS public.competitions
(
    competition_id character varying(50) COLLATE pg_catalog."default" NOT NULL,
    competition_code character varying(50) COLLATE pg_catalog."default",
    name character varying(255) COLLATE pg_catalog."default",
    sub_type character varying(50) COLLATE pg_catalog."default",
    type character varying(50) COLLATE pg_catalog."default",
    country_id integer,
    country_name character varying(255) COLLATE pg_catalog."default",
    domestic_league_code character varying(50) COLLATE pg_catalog."default",
    confederation character varying(50) COLLATE pg_catalog."default",
    url character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT competitions_pkey PRIMARY KEY (competition_id)
)
