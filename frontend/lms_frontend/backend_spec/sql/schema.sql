-- LMS schema (PostgreSQL/MySQL compatible)

create table students (
   id          serial primary key,
   roll_number varchar(32) unique not null,
   name        varchar(128) not null,
   dob         date,
   gender      varchar(16),
   email       varchar(128) unique,
   cnic        varchar(32),
   mobile      varchar(32),
   blood_group varchar(8),
   nationality varchar(64),
   degree      varchar(32),
   batch       varchar(16),
   section     varchar(16),
   campus      varchar(64),
   status      varchar(16)
);

create table courses (
   id      serial primary key,
   code    varchar(32) unique not null,
   title   varchar(128) not null,
   credits int not null
);

create table enrollments (
   id          serial primary key,
   student_id  int not null
      references students ( id )
         on delete cascade,
   course_id   int not null
      references courses ( id )
         on delete cascade,
   enrolled_at timestamp default current_timestamp,
   unique ( student_id,
            course_id )
);

create table requests (
   id         serial primary key,
   student_id int not null
      references students ( id )
         on delete cascade,
   type       varchar(32) not null,
   message    text not null,
   status     varchar(16) default 'RECEIVED',
   created_at timestamp default current_timestamp
);

-- Demo data
insert into students (
   roll_number,
   name,
   dob,
   gender,
   email,
   cnic,
   mobile,
   blood_group,
   nationality,
   degree,
   batch,
   section,
   campus,
   status
) values ( '20F-0117',
           'Mustafa Aqeel',
           '2001-11-11',
           'Male',
           'f200117@cfd.nu.edu.pk',
           '35202-8216137-5',
           '0313-4605512',
           'O',
           'Pakistan',
           'BSCS',
           '2020',
           '8A',
           'Chiniot Faisalabad',
           'Current' );

insert into courses (
   code,
   title,
   credits
) values ( 'CS101',
           'Intro to Programming',
           3 ),( 'CS201',
                 'Data Structures',
                 4 ),( 'CS301',
                       'Algorithms',
                       4 ),( 'CS302',
                             'Operating Systems',
                             4 );