-- Generated by Oracle SQL Developer Data Modeler 18.1.0.082.1035
--   at:        2018-04-11 17:40:36 PDT
--   site:      Oracle Database 11g
--   type:      Oracle Database 11g



CREATE TABLE has (
    project_code      CHAR(4 CHAR) NOT NULL,
    person_code       CHAR(6 CHAR) NOT NULL,
    salary            NUMBER NOT NULL,
    deadline          DATE NOT NULL,
    hiring_date       DATE NOT NULL,
    job_description   VARCHAR2(4000)
);

ALTER TABLE has ADD CONSTRAINT has_pk PRIMARY KEY ( project_code,
                                                    person_code );

CREATE TABLE owns (
    project_code   CHAR(4 CHAR) NOT NULL
);

ALTER TABLE owns ADD CONSTRAINT owns_pk PRIMARY KEY ( project_code );

CREATE TABLE person (
    code               CHAR(6 CHAR) NOT NULL,
    first_name         VARCHAR2(4000) NOT NULL,
    last_name          VARCHAR2(4000) NOT NULL,
    middle_name        VARCHAR2(4000),
    email              VARCHAR2(4000) NOT NULL,
    department         VARCHAR2(4000),
    office             VARCHAR2(4000)  
   ,
    social_factor      NUMBER NOT NULL,
    salary             NUMBER NOT NULL,
    hiring_date        DATE NOT NULL,
    deadline           DATE NOT NULL,
    job_description    VARCHAR2(4000),
    salary1            NUMBER NOT NULL,
    deadline1          DATE NOT NULL,
    hiring_date1       DATE NOT NULL,
    job_description1   VARCHAR2(4000)
);

ALTER TABLE person ADD CONSTRAINT person_pk PRIMARY KEY ( code );

CREATE TABLE professor (
    code            CHAR(6 CHAR) NOT NULL,
    first_name      VARCHAR2(4000) NOT NULL,
    last_name       VARCHAR2(4000) NOT NULL,
    middle_name     VARCHAR2(4000),
    email           VARCHAR2(4000) NOT NULL,
    department      VARCHAR2(4000),
    office          VARCHAR2(4000)
   ,
    social_factor   NUMBER NOT NULL,
    password        CHAR(32 CHAR) NOT NULL,
    username        CHAR(5 CHAR) NOT NULL
);

CREATE TABLE project (
    name              VARCHAR2(4000) NOT NULL,
    code              CHAR(4 CHAR) NOT NULL,
    budget            NUMBER,
    description       VARCHAR2(4000),
    owner             CHAR(4 CHAR),
    current_balance   NUMBER NOT NULL,
    start_date        DATE NOT NULL,
    end_date          DATE NOT NULL
);

ALTER TABLE project ADD CONSTRAINT project_pk PRIMARY KEY ( code );

ALTER TABLE has
    ADD CONSTRAINT has_person_fk FOREIGN KEY ( person_code )
        REFERENCES person ( code );

ALTER TABLE has
    ADD CONSTRAINT has_project_fk FOREIGN KEY ( project_code )
        REFERENCES project ( code );

-- Error - Foreign Key owns_Professor_FK has no columns

ALTER TABLE owns
    ADD CONSTRAINT owns_project_fk FOREIGN KEY ( project_code )
        REFERENCES project ( code );

ALTER TABLE professor
    ADD CONSTRAINT person_1_person_fk FOREIGN KEY ( code )
        REFERENCES person ( code );



-- Oracle SQL Developer Data Modeler Summary Report: 
-- 
-- CREATE TABLE                             5
-- CREATE INDEX                             0
-- ALTER TABLE                              8
-- CREATE VIEW                              0
-- ALTER VIEW                               0
-- CREATE PACKAGE                           0
-- CREATE PACKAGE BODY                      0
-- CREATE PROCEDURE                         0
-- CREATE FUNCTION                          0
-- CREATE TRIGGER                           0
-- ALTER TRIGGER                            0
-- CREATE COLLECTION TYPE                   0
-- CREATE STRUCTURED TYPE                   0
-- CREATE STRUCTURED TYPE BODY              0
-- CREATE CLUSTER                           0
-- CREATE CONTEXT                           0
-- CREATE DATABASE                          0
-- CREATE DIMENSION                         0
-- CREATE DIRECTORY                         0
-- CREATE DISK GROUP                        0
-- CREATE ROLE                              0
-- CREATE ROLLBACK SEGMENT                  0
-- CREATE SEQUENCE                          0
-- CREATE MATERIALIZED VIEW                 0
-- CREATE SYNONYM                           0
-- CREATE TABLESPACE                        0
-- CREATE USER                              0
-- 
-- DROP TABLESPACE                          0
-- DROP DATABASE                            0
-- 
-- REDACTION POLICY                         0
-- 
-- ORDS DROP SCHEMA                         0
-- ORDS ENABLE SCHEMA                       0
-- ORDS ENABLE OBJECT                       0
-- 
-- ERRORS                                   3
-- WARNINGS                                 0
