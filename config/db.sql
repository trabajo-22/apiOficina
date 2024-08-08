



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
    alias NVARCHAR(30),
    afecha DATE DEFAULT GETDATE(),
    FOREIGN KEY (agid) REFERENCES agencia(agid) 
);




CREATE TABLE turnos (
    tid INT IDENTITY(1,1) PRIMARY KEY,
    tcedula NVARCHAR(11),
    tnombres NVARCHAR(200),
    tapellidos NVARCHAR(200),
    tcorreo NVARCHAR(200),
    ttipoturno NVARCHAR(200),
    idarea INT,  
    idagencia INT,
    idcodigo INT,
    tfecha DATE DEFAULT GETDATE(),
    FOREIGN KEY (idarea) REFERENCES area(aid) ,
    FOREIGN KEY (idagencia) REFERENCES agencia(agid) ,
    FOREIGN KEY (idcodigo) REFERENCES codigo(cid) 
);



CREATE TABLE codigo(
    cid INT IDENTITY(1,1) PRIMARY KEY,
    ccodigo INT,
    cfecha DATETIME DEFAULT GETDATE()
)




