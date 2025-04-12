-- Text to SQL original prompt:
-- give the query that creates all the tables in this database and its foreign keys and it creates its indexes
CREATE TABLE users (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
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
    last_active date
);

CREATE TABLE students (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id bigint,
    enrollment_date date DEFAULT CURRENT_DATE,
    program text,
    status text DEFAULT 'active' CHECK (status IN ('active', 'banned')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE instructors (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id bigint,
    bio text,
    expertise text[],
    department text,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE admins (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id bigint,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE courses (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title text NOT NULL,
    description text,
    category text,
    level text,
    duration text,
    price numeric(10,2),
    is_published text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    image_url text,
    instructor_id bigint,
    learningoutcomes text[],
    prerequisites text[],
    FOREIGN KEY (instructor_id) REFERENCES instructors(id) ON DELETE SET NULL
);

CREATE TABLE modules (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    course_id bigint,
    title text NOT NULL,
    description text,
    is_published boolean DEFAULT false,
    progress integer DEFAULT 0,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

CREATE TABLE lessons (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    module_id bigint,
    title text NOT NULL,
    duration text,
    FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE
);

CREATE TABLE text_lessons (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    lesson_id bigint,
    description text NOT NULL,
    sections json,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);

CREATE TABLE video_lessons (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    lesson_id bigint,
    url text NOT NULL,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);

CREATE TABLE assignment_lessons (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    lesson_id bigint,
    description text NOT NULL,
    instructions text[],
    points integer NOT NULL,
    due_date date,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);

CREATE TABLE enrollments (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    student_id bigint,
    course_id bigint,
    progress integer DEFAULT 0,
    enrolled_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

CREATE TABLE student_lesson_progress (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    student_id bigint NOT NULL,
    lesson_id bigint NOT NULL,
    iscompleted boolean DEFAULT false,
    UNIQUE (student_id, lesson_id),
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);

CREATE TABLE student_assignments (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    student_id bigint NOT NULL,
    assignment_id bigint NOT NULL,
    submitted_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    grade numeric(5,2),
    feedback text,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (assignment_id) REFERENCES assignment_lessons(id) ON DELETE CASCADE
);

CREATE TABLE attendance (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    student_id bigint NOT NULL,
    course_id bigint NOT NULL,
    attended_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    status text CHECK (status IN ('present', 'absent', 'late')),
    UNIQUE (student_id, course_id, attended_at),
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

CREATE TABLE announcements (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    course_id bigint,
    title text NOT NULL,
    content text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

CREATE TABLE resources (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    course_id bigint,
    title text NOT NULL,
    type text NOT NULL CHECK (type IN ('file', 'link', 'github')),
    url text,
    description text,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

CREATE TABLE achievements (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    student_id bigint,
    title text NOT NULL,
    date date NOT NULL,
    description text,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

CREATE TABLE education (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    instructor_id bigint,
    degree text NOT NULL,
    institution text NOT NULL,
    year integer NOT NULL,
    FOREIGN KEY (instructor_id) REFERENCES instructors(id) ON DELETE CASCADE
);

CREATE TABLE interests (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title text NOT NULL
);

CREATE TABLE student_interests (
    student_id bigint NOT NULL,
    interest_id bigint NOT NULL,
    PRIMARY KEY (student_id, interest_id),
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (interest_id) REFERENCES interests(id) ON DELETE CASCADE
);

CREATE TABLE review_course (
    student_id bigint NOT NULL,
    course_id bigint NOT NULL,
    review double precision NOT NULL,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

CREATE INDEX idx_enrollments_student_id ON enrollments(student_id);
CREATE INDEX idx_enrollments_course_id ON enrollments(course_id);
CREATE INDEX idx_student_lesson_progress_student_lesson ON student_lesson_progress(student_id, lesson_id);
CREATE INDEX idx_student_lesson_progress_iscompleted ON student_lesson_progress(iscompleted);
CREATE INDEX idx_student_assignments_student_id ON student_assignments(student_id);
CREATE INDEX idx_student_assignments_assignment_id ON student_assignments(assignment_id);
CREATE INDEX idx_attendance_student_id ON attendance(student_id);
CREATE INDEX idx_attendance_course_id ON attendance(course_id);