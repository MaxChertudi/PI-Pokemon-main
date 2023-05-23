-- Table: public.Pokemons

-- DROP TABLE IF EXISTS public."Pokemons";

CREATE TABLE IF NOT EXISTS public."Pokemons"
(
    id integer NOT NULL DEFAULT nextval('"Pokemons_id_seq"'::regclass),
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    image character varying(255) COLLATE pg_catalog."default",
    health integer,
    attack integer,
    defense integer,
    speed integer,
    height integer,
    weight integer,
    CONSTRAINT "Pokemons_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER SEQUENCE "Pokemons_id_seq" RESTART WITH 2000;

-- Table: public.Types

-- DROP TABLE IF EXISTS public."Types";

CREATE TABLE IF NOT EXISTS public."Types"
(
    id integer NOT NULL DEFAULT nextval('"Types_id_seq"'::regclass),
    name character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT "Types_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Types"
    OWNER to postgres;

-- Table: public.pokemon_type

-- DROP TABLE IF EXISTS public.pokemon_type;

CREATE TABLE IF NOT EXISTS public.pokemon_type
(
    "TypeId" integer NOT NULL,
    "PokemonId" integer NOT NULL,
    CONSTRAINT pokemon_type_pkey PRIMARY KEY ("TypeId", "PokemonId")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.pokemon_type
    OWNER to postgres;