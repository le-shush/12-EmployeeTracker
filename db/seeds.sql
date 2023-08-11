INSERT INTO departments (department)
VALUES  ('Administration'),
        ('Sales'),
        ('Marketing'),
        ('Engineering'),
        ('Finance'),
        ('Legal'),
        ('Human Resources');

INSERT INTO roles (job_title, salary, department_id)
VALUES  ('CEO', '200000', 1),
        ('CFO', '150000', 5),
        ('CTO', '150000', 4),
        ('VP of Sales', '100000', 2),
        ('Sales Manager', '80000', 2),
        ('Salesperson', '50000', 2),
        ('Software Engineer', '80000', 4),
        ('Project Manager', '80000', 4),
        ('Product Manager','80000', 3),
        ('Marketing Manager', '80000', 3),
        ('Marketing Analyst', '60000', 3),
        ('Legal Counsel', '100000', 6),
        ('HR Manager', '80000', 7),
        ('HR Representative', '60000', 7);

INSERT INTO employees (employee_firstName, employee_lastName, employee_roleID, employee_managerID)
VALUES  
        -- CEO
        ('John', 'Smith', 1, null),
        
        -- CFO
        ('Martha', 'Evergreen', 2, 1),
        
        -- CTO
        ('Harry', 'Potter', 3, 1),
        
        -- VP of Sales
        ('Lucy', 'Brown', 4, 1),
        
        -- Sales Manager
        ('Ella', 'Johnson', 5, 4),
        
        -- Salesperson
        ('James', 'Davis', 6, 5),
        
        -- Software Engineer
        ('Alice', 'Miller', 7, 3),
        
        -- Project Manager
        ('Sophia', 'Williams', 8, 3),
        
        -- Product Manager
        ('Michael', 'Anderson', 9, 1),
        
        -- Marketing Manager
        ('Robert', 'Taylor', 10, 1),
        
        -- Marketing Analyst
        ('Liam', 'Moore', 11, 10),
        
        -- Legal Counsel
        ('Oliver', 'Martinez', 12, 1),
        
        -- HR Manager
        ('Benjamin', 'Rodriguez', 13, 1),
        
        -- HR Representative
        ('Emma', 'Martinez', 14, 13);
