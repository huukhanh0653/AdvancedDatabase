USE QLY_NHAHANG;
GO

-- Tạo filegroup
ALTER DATABASE QLY_NHAHANG
ADD FILEGROUP FG_CHONMON_DaTra;
GO

ALTER DATABASE QLY_NHAHANG
ADD FILEGROUP FG_CHONMON_ChuaTra;
GO

-- Tạo file
ALTER DATABASE QLY_NHAHANG
ADD FILE
(
    NAME = 'CHONMON_DaTra_FILE',
    FILENAME = '/var/opt/mssql/data/CHONMON_DaTra_FILE.ndf',
    SIZE = 1MB,
    MAXSIZE = UNLIMITED,
    FILEGROWTH = 1
) TO FILEGROUP FG_CHONMON_DaTra;
GO

ALTER DATABASE QLY_NHAHANG
ADD FILE
(
    NAME = 'CHONMON_ChuaTra_FILE',
    FILENAME = '/var/opt/mssql/data/CHONMON_ChuaTra_FILE.ndf',
    SIZE = 1MB,
    MAXSIZE = UNLIMITED,
    FILEGROWTH = 1
) TO FILEGROUP FG_CHONMON_ChuaTra;
GO

--Tạo partition function
CREATE PARTITION FUNCTION PF_CHONMON(BIT)
AS RANGE RIGHT FOR VALUES 
(
    1
);
GO

-- Bước 3: Tạo Partition Scheme
CREATE PARTITION SCHEME PS_CHONMON
AS PARTITION PF_CHONMON TO 
    (
		FG_CHONMON_ChuaTra, FG_CHONMON_DaTra
    );
GO

-- Bước 4: Tạo Clustered Index
-- Xóa Primary Key cũ và các constraint

/*
SELECT 
    i.name AS Index_name
FROM 
    sys.tables AS t
JOIN 
    sys.indexes AS i ON t.object_id = i.object_id
WHERE 
    i.is_primary_key = 1
    AND t.name = 'CHONMON'
GO
*/

ALTER TABLE CHONMON
DROP CONSTRAINT FK_CHONMON_CHONMON
GO

ALTER TABLE CHONMON
DROP CONSTRAINT PK__CHONMON__B5C50D7A66B253EE;
GO

-- Tạo primary key với non clustered và tạo lại các constraint đã xóa
ALTER TABLE CHONMON
ADD CONSTRAINT PK_CHONMON PRIMARY KEY 
NONCLUSTERED (MaPhieu, MaMon)
ON [PRIMARY];
GO


CREATE CLUSTERED INDEX IX_CHONMON_TRAMON
ON CHONMON
(
	TraMon
) ON PS_CHONMON(TraMon);
GO

/* Kiểm thử
--Xem filegroup đã tạo
SELECT name as [File Group Name]
FROM sys.filegroups
WHERE type = 'FG'
GO 

-- Confirm Datafiles
SELECT name as [DB FileName],physical_name as         
[DB File Path]
FROM sys.database_files
where type_desc = 'ROWS'
GO


SELECT 
    OBJECT_NAME(p.object_id) AS table_name,
    i.name AS index_name,
    i.type_desc AS index_type,
    p.partition_number,
    f.name AS file_group,
    p.rows AS row_count
FROM sys.partitions p
JOIN sys.indexes i ON p.object_id = i.object_id AND p.index_id = i.index_id
JOIN sys.destination_data_spaces dds ON p.partition_number = dds.destination_id
JOIN sys.filegroups f ON dds.data_space_id = f.data_space_id
WHERE OBJECT_NAME(p.object_id) = 'CHONMON'
ORDER BY p.partition_number, i.type_desc;




SELECT * 
FROM sys.partition_functions 
WHERE name = 'PF_CHONMON';
GO

SELECT * 
FROM sys.partition_schemes 
WHERE name = 'PS_CHONMON';
GO

INSERT CHONMON VALUES (21310, 16, 2, 0);
GO
*/
