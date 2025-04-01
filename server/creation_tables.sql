-- Text to SQL original prompt:
-- write sql for creation of all tables in my database
-- 
CREATE TABLE users (
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
    name text NOT NULL,
    email text NOT NULL UNIQUE,
    password_hash text NOT NULL,
    role text NOT NULL CHECK (role IN ('student', 'instructor', 'admin')),
    phone text,
    location text,
    bio text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    image_url text,
    PRIMARY KEY (id)
);

CREATE TABLE students (
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
    user_id bigint,
    enrollment_date date DEFAULT CURRENT_DATE,
    program text,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE instructors (
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
    user_id bigint,
    bio text,
    expertise text[],
    department text,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE admins (
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
    user_id bigint,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE courses (
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
    title text NOT NULL,
    description text,
    category text,
    level text,
    duration text,
    price numeric(10,2),
    is_published boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    image_url text,
    instructor_id bigint,
    PRIMARY KEY (id),
    FOREIGN KEY (instructor_id) REFERENCES instructors(id) ON DELETE SET NULL
);

CREATE TABLE modules (
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
    course_id bigint,
    title text NOT NULL,
    description text,
    is_published boolean DEFAULT false,
    PRIMARY KEY (id),
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

CREATE TABLE lessons (
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
    module_id bigint,
    title text NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE
);

CREATE TABLE text_lessons (
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
    lesson_id bigint,
    description text NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);

CREATE TABLE video_lessons (
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
    lesson_id bigint,
    url text NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);

CREATE TABLE assignment_lessons (
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
    lesson_id bigint,
    description text NOT NULL,
    instructions text,
    points integer NOT NULL,
    due_date date,
    PRIMARY KEY (id),
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);

CREATE TABLE enrollments (
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
    student_id bigint,
    course_id bigint,
    progress integer DEFAULT 0,
    enrolled_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

CREATE TABLE announcements (
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
    course_id bigint,
    title text NOT NULL,
    content text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

CREATE TABLE resources (
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
    course_id bigint,
    title text NOT NULL,
    type text NOT NULL CHECK (type IN ('file', 'link', 'github')),
    url text,
    PRIMARY KEY (id),
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

CREATE TABLE attendance (
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
    student_id bigint NOT NULL,
    course_id bigint NOT NULL,
    attended_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    status text CHECK (status IN ('present', 'absent', 'late')),
    PRIMARY KEY (id),
    UNIQUE (student_id, course_id, attended_at),
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

CREATE TABLE achievements (
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
    student_id bigint,
    title text NOT NULL,
    date date NOT NULL,
    description text,
    PRIMARY KEY (id),
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

CREATE TABLE education (
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
    instructor_id bigint,
    degree text NOT NULL,
    institution text NOT NULL,
    year integer NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (instructor_id) REFERENCES instructors(id) ON DELETE CASCADE
);

CREATE TABLE interests (
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
    title text NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE student_interests (
    student_id bigint NOT NULL,
    interest_id bigint NOT NULL,
    PRIMARY KEY (student_id, interest_id),
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (interest_id) REFERENCES interests(id) ON DELETE CASCADE
);

create index idx_enrollments_course_id on enrollments(course_id);
create index idx_enrollments_student_id on enrollments(student_id);
create index idx_attendance_course_id on attendance(course_id);
create index idx_attendance_student_id on attendance(student_id);
