create table users (
  id bigint primary key generated always as identity,
  name text not null,
  email text not null unique,
  password_hash text not null,
  role text not null check (role in ('student', 'instructor', 'admin')),
  phone text,
  location text,
  bio text,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp
);

create table instructors (
  id bigint primary key generated always as identity,
  user_id bigint references users (id) on delete cascade,
  bio text,
  expertise text[],
  department text
);

create table education (
  id bigint primary key generated always as identity,
  instructor_id bigint references instructors (id) on delete cascade,
  degree text not null,
  institution text not null,
  year int not null
);

create table courses (
  id bigint primary key generated always as identity,
  title text not null,
  description text,
  category text,
  level text,
  duration interval,
  price numeric(10, 2),
  is_published boolean default false,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp,
  image_url text,
  instructor_id bigint references instructors (id) on delete set null
);

create table students (
  id bigint primary key generated always as identity,
  user_id bigint references users (id) on delete cascade,
  enrollment_date date default current_date,
  program text,
  interests text[]
);

create table achievements (
  id bigint primary key generated always as identity,
  student_id bigint references students (id) on delete cascade,
  title text not null,
  date date not null,
  description text
);

create table enrollments (
  id bigint primary key generated always as identity,
  student_id bigint references students (id) on delete cascade,
  course_id bigint references courses (id) on delete cascade,
  progress int default 0,
  enrolled_at timestamp default current_timestamp
);

create table modules (
  id bigint primary key generated always as identity,
  course_id bigint references courses (id) on delete cascade,
  title text not null,
  description text,
  is_published boolean default false
);

create table lessons (
  id bigint primary key generated always as identity,
  module_id bigint references modules (id) on delete cascade,
  title text not null
);

create table resources (
  id bigint primary key generated always as identity,
  course_id bigint references courses (id) on delete cascade,
  title text not null,
  type text check (type in ('file', 'link', 'github')) not null,
  url text null
);

create table announcements (
  id bigint primary key generated always as identity,
  course_id bigint references courses (id) on delete cascade,
  title text not null,
  content text,
  created_at timestamp default current_timestamp
);

create table admins (
  id bigint primary key generated always as identity,
  user_id bigint references users (id) on delete cascade
);

create table video_lessons (
  id bigint primary key generated always as identity,
  lesson_id bigint references lessons (id) on delete cascade,
  url text not null
);

create table text_lessons (
  id bigint primary key generated always as identity,
  lesson_id bigint references lessons (id) on delete cascade,
  description text not null
);

create table assignment_lessons (
  id bigint primary key generated always as identity,
  lesson_id bigint references lessons (id) on delete cascade,
  description text not null,
  instructions text,
  points int not null,
  due_date date
);

create table attendance (
  id bigint primary key generated always as identity,
  student_id bigint not null references students (id) on delete cascade,
  course_id bigint not null references courses (id) on delete cascade,
  attended_at timestamp default current_timestamp,
  status text check (status in ('present', 'absent', 'late')),
  unique (student_id, course_id, attended_at)
);

create index idx_enrollments_course_id on enrollments(course_id);
create index idx_enrollments_student_id on enrollments(student_id);
create index idx_attendance_course_id on attendance(course_id);
create index idx_attendance_student_id on attendance(student_id);
