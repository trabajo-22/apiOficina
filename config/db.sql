



CREATE TABLE usuario (
    uid INT IDENTITY(1,1) PRIMARY KEY,
    ucedula NVARCHAR(11),
    unombres NVARCHAR(100),
    uapellidos NVARCHAR(100),
    ucorreo NVARCHAR(100),
    ufecha DATE DEFAULT GETDATE(),
    FOREIGN KEY (agid) REFERENCES area(aid) 
);




CREATE TABLE agencia (
    agid INT IDENTITY(1,1) PRIMARY KEY,
    agnombre NVARCHAR(300),
    agfecha DATE DEFAULT GETDATE()
);


CREATE TABLE area (
    aid INT IDENTITY(1,1) PRIMARY KEY,
    anombre NVARCHAR(200),
    aicon Ntext,
    agid INT,
    afecha DATE DEFAULT GETDATE(),
    FOREIGN KEY (agid) REFERENCES agencia(agid) 
);





CREATE TABLE turnos (
    tid INT IDENTITY(1,1) PRIMARY KEY,
    tcedula NVARCHAR(11),
    tnombres NVARCHAR(200),
    tapellidos NVARCHAR(200),
    tcorreo NVARCHAR(200),
    tturno NVARCHAR(10),
    ttipoturno NVARCHAR(200),
    idarea INT,  
    idagencia INT,
    tfecha DATE DEFAULT GETDATE()
    FOREIGN KEY (idarea) REFERENCES area(aid) 
    FOREIGN KEY (idagencia) REFERENCES agencia(agid) 
);







