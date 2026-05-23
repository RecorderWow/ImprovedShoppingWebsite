--
-- PostgreSQL database dump
--

\restrict M6kKIWdyzLxqSkWia8DrAyhfLMuZxpjbxRwqyLsQQWKfjE8UIXowoYjnQRQz9WU

-- Dumped from database version 16.10
-- Dumped by pg_dump version 16.10

-- Started on 2026-05-23 22:59:05

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 18160)
-- Name: cart; Type: TABLE; Schema: public; Owner: shopping_user
--

CREATE TABLE public.cart (
    id integer NOT NULL,
    product_id integer,
    quantity integer DEFAULT 1,
    user_id integer
);


ALTER TABLE public.cart OWNER TO shopping_user;

--
-- TOC entry 217 (class 1259 OID 18159)
-- Name: cart_id_seq; Type: SEQUENCE; Schema: public; Owner: shopping_user
--

CREATE SEQUENCE public.cart_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cart_id_seq OWNER TO shopping_user;

--
-- TOC entry 4869 (class 0 OID 0)
-- Dependencies: 217
-- Name: cart_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: shopping_user
--

ALTER SEQUENCE public.cart_id_seq OWNED BY public.cart.id;


--
-- TOC entry 216 (class 1259 OID 18151)
-- Name: products; Type: TABLE; Schema: public; Owner: shopping_user
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    price numeric(10,2) NOT NULL,
    description text,
    image_url text
);


ALTER TABLE public.products OWNER TO shopping_user;

--
-- TOC entry 215 (class 1259 OID 18150)
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: shopping_user
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO shopping_user;

--
-- TOC entry 4870 (class 0 OID 0)
-- Dependencies: 215
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: shopping_user
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- TOC entry 220 (class 1259 OID 34503)
-- Name: users; Type: TABLE; Schema: public; Owner: shopping_user
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(100) NOT NULL,
    password text NOT NULL,
    is_admin boolean DEFAULT false
);


ALTER TABLE public.users OWNER TO shopping_user;

--
-- TOC entry 219 (class 1259 OID 34502)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: shopping_user
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO shopping_user;

--
-- TOC entry 4871 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: shopping_user
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4699 (class 2604 OID 18163)
-- Name: cart id; Type: DEFAULT; Schema: public; Owner: shopping_user
--

ALTER TABLE ONLY public.cart ALTER COLUMN id SET DEFAULT nextval('public.cart_id_seq'::regclass);


--
-- TOC entry 4698 (class 2604 OID 18154)
-- Name: products id; Type: DEFAULT; Schema: public; Owner: shopping_user
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- TOC entry 4701 (class 2604 OID 34506)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: shopping_user
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4861 (class 0 OID 18160)
-- Dependencies: 218
-- Data for Name: cart; Type: TABLE DATA; Schema: public; Owner: shopping_user
--

COPY public.cart (id, product_id, quantity, user_id) FROM stdin;
120	1	3	28
123	1	1	30
125	4	1	30
126	5	1	1
127	8	1	1
81	1	1	20
84	3	1	22
87	2	1	24
53	4	1	2
54	5	1	2
55	7	1	2
\.


--
-- TOC entry 4859 (class 0 OID 18151)
-- Dependencies: 216
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: shopping_user
--

COPY public.products (id, name, price, description, image_url) FROM stdin;
1	Red T-Shirt	19.99	Comfortable red t-shirt	https://media.istockphoto.com/id/471188329/photo/plain-red-tee-shirt-isolated-on-white-background.jpg?b=1&s=612x612&w=0&k=20&c=HkyVk1rV-70fy8UdYikI-4kPaO0j2HZMGeE0sz-q5EA=
3	Green Sneakers	79.99	Sporty sneakers	https://www.converse.com.au/media/catalog/product/1/5/150476_0.jpg?optimize=low&fit=bounds&height=&width=
4	Black Cap	15.99	Cool summer cap	https://hiddencamera.com.au/pub/media/catalog/product/cache/28d11862720df4cb95d2e39c9a403982/w/i/wifi-baseball-cap-security-camera1.jpg
5	Black Jacket	99.99	Warm winter jacket	https://www.angeljackets.com/product_images/d/024/mens_black_leather_jacket__53015_zoom.webp
2	Blue Jeans	49.99	Stylish blue jeans	https://drdenim.com.au/cdn/shop/files/RHUE-STREAM-SKY-FADE_ECOM-LARGE_001.jpg?v=1742341987
6	Red Cap	15.99	Red but still cool cap	https://m.media-amazon.com/images/I/615q4ly6-mL._AC_UF1000,1000_QL80_.jpg
7	Black T-Shirt	19.99	Comfortable black t-shirt	https://media.istockphoto.com/id/483960103/photo/blank-black-t-shirt-front-with-clipping-path.jpg?s=612x612&w=0&k=20&c=d8qlXILMYhugXGw6zX7Jer2SLPrLPORfsDsfRDWc-50=
8	Green T-Shirt	19.99	Comfortable green t-shirt	https://img.freepik.com/premium-photo/green-shirt-with-word-t-it-is-hanging-hanger_1028264-7532.jpg?semt=ais_hybrid&w=740&q=80
9	Blue Cap	15.99	Cool green cap	https://m.media-amazon.com/images/I/51oV9qArLHL._AC_.jpg
10	Blue T-Shirt	19.99	Comfy blue shirt	https://hurly-burly.com.au/cdn/shop/files/bluetee-Photoroom_1.png?v=1719903158
11	Green Cap	15.99	cool green cap 	https://m.media-amazon.com/images/I/512L-44pDyL._AC_SY1000_.jpg
12	Red Sneakers	79.99	quite red sneakers	https://assets.vogue.com/photos/689b3eda0103b99304db38c2/3:4/w_748%2Cc_limit/image23.jpg
13	Blue Suit Coat	99.99	Classic blue coat	https://media.istockphoto.com/id/1092378606/photo/blue-womens-insulated-jacket-in-white-background-invisible-mannequin.jpg?s=612x612&w=0&k=20&c=4dOUxP-1-MsRUFwzQzb3mOLThYSysmFN0d9Gg3gWcXs=
\.


--
-- TOC entry 4863 (class 0 OID 34503)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: shopping_user
--

COPY public.users (id, username, password, is_admin) FROM stdin;
2	test2	$2b$10$uubntaxmrp3thTJD3Fkbb.0hymEXmA9hByYzAtah1j5dOyBWdoqwS	f
14	test4	$2b$10$xiPXF12X80iQMs/xYwUOY.Fr/TXoPLq6uQhQgao67HxRASt.xRWNu	f
3	test6	$2b$10$yFCmUgTvmOaghtX4vFDGWedBI66TRyDnrsB/eG/i7sXlNhiNNg0na	f
1	test	$2b$10$oubwAPSSjmphiUmAnm8zWu66bknOsX6eo4sbfBfYF45OmwE7MXwSu	f
15	Ilker	$2b$10$xwwNaZuqt4UKlUAI73L1S.62JZFcjjob7Accqoch9PynPkrqtK.0a	t
20	test7	$2b$10$GyaeSKacq3U.fEMry0q/rejcLRUl8xQGbV7xQ73I6etaMJp6c85hC	f
22	test8	$2b$10$.5aU7aoEnOR.tWgBIXR73uwhcaP/DzAi0vjU/oD00q1jpMNcKyLMO	f
24	test9	$2b$10$VU94t/ecMPM1wuj6zEmWzeaOPE1lyEdelCyo0uspjoeaNDaoccrW2	f
26	test10	$2b$10$XED8dWKyrjWPAf32ikkUIOHMMlekNhkTgjdWl93qg7qQ.gmySDspW	f
28	test11	$2b$10$eSPMclQ3c.khQwz5quh/JecpQiwDXi9vdz24rUmFl5sTm.pTniBYW	f
30	Alex	$2b$10$7dYFHN0FOpGCqI1w4MkWLeJgYm2.DGgv35kwIsyxpAe3W5XymKdv.	f
\.


--
-- TOC entry 4872 (class 0 OID 0)
-- Dependencies: 217
-- Name: cart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: shopping_user
--

SELECT pg_catalog.setval('public.cart_id_seq', 127, true);


--
-- TOC entry 4873 (class 0 OID 0)
-- Dependencies: 215
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: shopping_user
--

SELECT pg_catalog.setval('public.products_id_seq', 13, true);


--
-- TOC entry 4874 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: shopping_user
--

SELECT pg_catalog.setval('public.users_id_seq', 30, true);


--
-- TOC entry 4706 (class 2606 OID 18166)
-- Name: cart cart_pkey; Type: CONSTRAINT; Schema: public; Owner: shopping_user
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (id);


--
-- TOC entry 4704 (class 2606 OID 18158)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: shopping_user
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- TOC entry 4708 (class 2606 OID 34520)
-- Name: cart unique_user_product; Type: CONSTRAINT; Schema: public; Owner: shopping_user
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT unique_user_product UNIQUE (user_id, product_id);


--
-- TOC entry 4710 (class 2606 OID 34511)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: shopping_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4712 (class 2606 OID 34513)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: shopping_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 4713 (class 2606 OID 18167)
-- Name: cart cart_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: shopping_user
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- TOC entry 4714 (class 2606 OID 34514)
-- Name: cart cart_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: shopping_user
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


-- Completed on 2026-05-23 22:59:05

--
-- PostgreSQL database dump complete
--

\unrestrict M6kKIWdyzLxqSkWia8DrAyhfLMuZxpjbxRwqyLsQQWKfjE8UIXowoYjnQRQz9WU

