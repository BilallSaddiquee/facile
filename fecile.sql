PGDMP     ,                    {            fecile    15.3    15.3 ,    ,           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            -           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            .           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            /           1262    16409    fecile    DATABASE     �   CREATE DATABASE fecile WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE fecile;
                postgres    false            �            1259    16411    admin_users    TABLE     �   CREATE TABLE public.admin_users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    contact character varying(255) NOT NULL
);
    DROP TABLE public.admin_users;
       public         heap    postgres    false            �            1259    16441    channel    TABLE     �   CREATE TABLE public.channel (
    id integer NOT NULL,
    name character varying(255),
    description text,
    ws_id integer
);
    DROP TABLE public.channel;
       public         heap    postgres    false            �            1259    16440    channel_id_seq    SEQUENCE     �   CREATE SEQUENCE public.channel_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.channel_id_seq;
       public          postgres    false    220            0           0    0    channel_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.channel_id_seq OWNED BY public.channel.id;
          public          postgres    false    219            �            1259    16486    co_worker_group    TABLE     l   CREATE TABLE public.co_worker_group (
    co_worker_id integer NOT NULL,
    channel_id integer NOT NULL
);
 #   DROP TABLE public.co_worker_group;
       public         heap    postgres    false            �            1259    16471    co_worker_workspace    TABLE     r   CREATE TABLE public.co_worker_workspace (
    co_worker_id integer NOT NULL,
    workspace_id integer NOT NULL
);
 '   DROP TABLE public.co_worker_workspace;
       public         heap    postgres    false            �            1259    16419 
   co_workers    TABLE     �   CREATE TABLE public.co_workers (
    name character varying(255),
    password character varying(255),
    id integer NOT NULL,
    email character varying(255)
);
    DROP TABLE public.co_workers;
       public         heap    postgres    false            �            1259    16461    co_workers_id_seq    SEQUENCE     �   CREATE SEQUENCE public.co_workers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.co_workers_id_seq;
       public          postgres    false    216            1           0    0    co_workers_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.co_workers_id_seq OWNED BY public.co_workers.id;
          public          postgres    false    221            �            1259    16410    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    215            2           0    0    users_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.users_id_seq OWNED BY public.admin_users.id;
          public          postgres    false    214            �            1259    16427 	   workspace    TABLE     �   CREATE TABLE public.workspace (
    id integer NOT NULL,
    name character varying(255),
    description text,
    admin_id integer
);
    DROP TABLE public.workspace;
       public         heap    postgres    false            �            1259    16426    workspace_id_seq    SEQUENCE     �   CREATE SEQUENCE public.workspace_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.workspace_id_seq;
       public          postgres    false    218            3           0    0    workspace_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.workspace_id_seq OWNED BY public.workspace.id;
          public          postgres    false    217            |           2604    16414    admin_users id    DEFAULT     j   ALTER TABLE ONLY public.admin_users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 =   ALTER TABLE public.admin_users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    215    215                       2604    16444 
   channel id    DEFAULT     h   ALTER TABLE ONLY public.channel ALTER COLUMN id SET DEFAULT nextval('public.channel_id_seq'::regclass);
 9   ALTER TABLE public.channel ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220            }           2604    16462    co_workers id    DEFAULT     n   ALTER TABLE ONLY public.co_workers ALTER COLUMN id SET DEFAULT nextval('public.co_workers_id_seq'::regclass);
 <   ALTER TABLE public.co_workers ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    216            ~           2604    16430    workspace id    DEFAULT     l   ALTER TABLE ONLY public.workspace ALTER COLUMN id SET DEFAULT nextval('public.workspace_id_seq'::regclass);
 ;   ALTER TABLE public.workspace ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            !          0    16411    admin_users 
   TABLE DATA           I   COPY public.admin_users (id, name, email, password, contact) FROM stdin;
    public          postgres    false    215   b2       &          0    16441    channel 
   TABLE DATA           ?   COPY public.channel (id, name, description, ws_id) FROM stdin;
    public          postgres    false    220   �3       )          0    16486    co_worker_group 
   TABLE DATA           C   COPY public.co_worker_group (co_worker_id, channel_id) FROM stdin;
    public          postgres    false    223   j4       (          0    16471    co_worker_workspace 
   TABLE DATA           I   COPY public.co_worker_workspace (co_worker_id, workspace_id) FROM stdin;
    public          postgres    false    222   �4       "          0    16419 
   co_workers 
   TABLE DATA           ?   COPY public.co_workers (name, password, id, email) FROM stdin;
    public          postgres    false    216   �4       $          0    16427 	   workspace 
   TABLE DATA           D   COPY public.workspace (id, name, description, admin_id) FROM stdin;
    public          postgres    false    218   _5       4           0    0    channel_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.channel_id_seq', 12, true);
          public          postgres    false    219            5           0    0    co_workers_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.co_workers_id_seq', 7, true);
          public          postgres    false    221            6           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 17, true);
          public          postgres    false    214            7           0    0    workspace_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.workspace_id_seq', 11, true);
          public          postgres    false    217            �           2606    16448    channel channel_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.channel
    ADD CONSTRAINT channel_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.channel DROP CONSTRAINT channel_pkey;
       public            postgres    false    220            �           2606    16490 $   co_worker_group co_worker_group_pkey 
   CONSTRAINT     x   ALTER TABLE ONLY public.co_worker_group
    ADD CONSTRAINT co_worker_group_pkey PRIMARY KEY (co_worker_id, channel_id);
 N   ALTER TABLE ONLY public.co_worker_group DROP CONSTRAINT co_worker_group_pkey;
       public            postgres    false    223    223            �           2606    16475 ,   co_worker_workspace co_worker_workspace_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.co_worker_workspace
    ADD CONSTRAINT co_worker_workspace_pkey PRIMARY KEY (co_worker_id, workspace_id);
 V   ALTER TABLE ONLY public.co_worker_workspace DROP CONSTRAINT co_worker_workspace_pkey;
       public            postgres    false    222    222            �           2606    16464    co_workers co_workers_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.co_workers
    ADD CONSTRAINT co_workers_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.co_workers DROP CONSTRAINT co_workers_pkey;
       public            postgres    false    216            �           2606    16418    admin_users users_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.admin_users DROP CONSTRAINT users_pkey;
       public            postgres    false    215            �           2606    16434    workspace workspace_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.workspace
    ADD CONSTRAINT workspace_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.workspace DROP CONSTRAINT workspace_pkey;
       public            postgres    false    218            �           2606    16449    channel channel_ws_id_fkey    FK CONSTRAINT     {   ALTER TABLE ONLY public.channel
    ADD CONSTRAINT channel_ws_id_fkey FOREIGN KEY (ws_id) REFERENCES public.workspace(id);
 D   ALTER TABLE ONLY public.channel DROP CONSTRAINT channel_ws_id_fkey;
       public          postgres    false    3205    220    218            �           2606    16496 /   co_worker_group co_worker_group_channel_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.co_worker_group
    ADD CONSTRAINT co_worker_group_channel_id_fkey FOREIGN KEY (channel_id) REFERENCES public.channel(id);
 Y   ALTER TABLE ONLY public.co_worker_group DROP CONSTRAINT co_worker_group_channel_id_fkey;
       public          postgres    false    3207    223    220            �           2606    16491 1   co_worker_group co_worker_group_co_worker_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.co_worker_group
    ADD CONSTRAINT co_worker_group_co_worker_id_fkey FOREIGN KEY (co_worker_id) REFERENCES public.co_workers(id);
 [   ALTER TABLE ONLY public.co_worker_group DROP CONSTRAINT co_worker_group_co_worker_id_fkey;
       public          postgres    false    216    223    3203            �           2606    16476 9   co_worker_workspace co_worker_workspace_co_worker_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.co_worker_workspace
    ADD CONSTRAINT co_worker_workspace_co_worker_id_fkey FOREIGN KEY (co_worker_id) REFERENCES public.co_workers(id);
 c   ALTER TABLE ONLY public.co_worker_workspace DROP CONSTRAINT co_worker_workspace_co_worker_id_fkey;
       public          postgres    false    216    3203    222            �           2606    16481 9   co_worker_workspace co_worker_workspace_workspace_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.co_worker_workspace
    ADD CONSTRAINT co_worker_workspace_workspace_id_fkey FOREIGN KEY (workspace_id) REFERENCES public.workspace(id);
 c   ALTER TABLE ONLY public.co_worker_workspace DROP CONSTRAINT co_worker_workspace_workspace_id_fkey;
       public          postgres    false    222    3205    218            �           2606    16435 !   workspace workspace_admin_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.workspace
    ADD CONSTRAINT workspace_admin_id_fkey FOREIGN KEY (admin_id) REFERENCES public.admin_users(id);
 K   ALTER TABLE ONLY public.workspace DROP CONSTRAINT workspace_admin_id_fkey;
       public          postgres    false    3201    218    215            !   9  x�e��o�0ǟۿ�ޖ8�k�ɶ1��-��!SP�Ι�ׯ�"�����~?�_�LP��K�+g����[����C���BH.)��*��h�p�ֹ��V*T��И_ԅ�ʅ࣍Ʋr�ݥ� �$�cS��a���Y�=d�2�ш�^�+*��{8���n9)��lhɥƆ�랲��`��F0��d�? �#�;�uYt-wS+�p�	E$C$e���k����o��@�Q((���-f�i��Ε�y泡��E|:��K`�H��&_���G8�����)�ֿI�znv�%};���6M����R�Y��4      &   �   x�]�;�0Dk�{H(�|�(�P$
�Y��#���qLA����M#N*�1���
8�'dP���W�[K�;��A�"*�N��r��kqN޻�6qt�'(�Ĝ2K�G~#�*/r&�CP�F�bK�=�����d��'�i@ظ��g�����u�j/��3)���[      )      x�3��2������ z�      (      x������ � �      "   �   x�U�;�0���_с�@y�jp!qru��M(�[b��[4�t=��y�v2��z�KQA	s���^�լGC���:��U�4�%�#H�GE?9�}��*��%�����X��U�M5PD��"�	I����#�[_{l�Kҡ�CY
7B�y��6�y�co�cT_      $   �   x��лNA���
W����)"(h̬�;�<V~�	Y��=���5��|�7z�;�%F~/�vB_E�:����9���^,��9�/x���>O'鏲�o�Q�����h%;�eH�m֢��sC�Ĉ��b� .q	�R�I8�
��?��!Y!S�=E�[9VX������=��gʬ�U��G�7��c�2mW��i�gђ����:|;G�o~e�     