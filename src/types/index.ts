export type EtholLecturer = {
  id: number;
  nip: string;
  nama: string;
  jurusan: string;
  role: "dosen";
};

export type Courses = {
  name: string;
  id: string;
  description: string;
  thumbnail_url: string;
  modules: {
    id: string;
    title: string;
    submodules: {
      id: string;
      user_progress: {
        is_done: boolean;
      }[];
    }[];
  }[];
}[];

export type Course = {
  name: string;
  id: string;
  description: string;
  thumbnail_url: string;
  modules: {
    id: string;
    title: string;
    submodules: {
      id: string;
      title: string;
    }[];
  }[];
};

export type Lesson = {
  title: string;
  contents: string;
  module_id: string;
  modules: {
    submodules: {
      title: string;
      id: string;
    }[];
    title: string;
    id: string;
    prog_languages: {
      id: string;
      name: string;
      thumbnail_url: string;
    };
  };
};

/**
 * Model admins
 */

export type admins = {
  id?: string;
  user_id: string;
  name: string;
  pswd: string;
  createdAt?: Date;
  updatedAt?: Date;
};

/**
 * Model classes
 */

export type classes = {
  id?: string;
  kelas: string;
  program: string;
  jurusan: string;
  createdAt?: Date;
  updatedAt?: Date;
  students?: students[];
};

/**
 * Model lecturers
 */

export type lecturers = {
  id?: string;
  user_id: string;
  name: string;
  position: string;
  nip: string;
  avatar_url: string | null;
  createdAt?: Date;
  updatedAt?: Date;
};

/**
 * Model modules
 */

export type modules = {
  id?: string;
  prog_languages_id: string;
  title: string;
  order: number;
  overview: string;
  createdAt?: Date;
  updatedAt?: Date;
  prog_languages?: prog_languages;
  submodules: submodules[];
};

/**
 * Model prog_languages
 */

export type prog_languages = {
  id: string;
  name: string;
  thumbnail_url?: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  modules?: modules[];
};

/**
 * Model quizzes
 */

export type quizzes = {
  id?: string;
  assignee_id: string;
  title: string;
  class_id: string;
  question: string;
  due_time: Date;
  prog_languages_id: string;
  prog_languages?: prog_languages[];
  createdAt?: Date;
  updatedAt?: Date;
  student_to_quiz?: student_to_quiz[];
  lecturers?: lecturers;
  classes?: classes;
};

/**
 * Model student_to_quiz
 */

export type student_to_quiz = {
  student_id: string;
  quiz_id: string;
  answer?: string;
  score?: number;
  code?: string;
  feedback?: string;
  students?: students;
  is_submitted: boolean;
  time_submitted?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  quizzes?: quizzes;
};

/**
 * Model students
 */

export type students = {
  id?: string;
  user_id: string;
  class_id: string;
  name: string;
  nrp: string;
  avatar_url: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  classes?: classes;
};

/**
 * Model submodule_exercises
 */

export type submodule_exercises = {
  id?: string;
  submodule_id: string;
  placeholder: string;
  expected_output: string;
  expected_code: string;
  createdAt?: Date;
  updatedAt?: Date;
};

/**
 * Model submodules
 */

export type submodules = {
  id?: string;
  title: string;
  module_id: string;
  contents: string;
  order: number;
  is_exercise: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  modules: modules & {
    prog_languages: prog_languages;
  };
  submodule_exercises?: submodule_exercises;
};

/**
 * Model user_progress
 */

export type user_progress = {
  student_id: string;
  submodule_id: string;
  is_done: boolean;
  last_answer: string;
  createdAt?: Date;
  updatedAt?: Date;
};
