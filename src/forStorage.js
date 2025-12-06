import localforage from 'localforage';

const STORE_KEY = 'students';

localforage.config({ name: 'students-app' });

export async function getStudents() {
  const data = await localforage.getItem(STORE_KEY);
  return Array.isArray(data) ? data : [];
}

export async function setStudents(students) {
  await localforage.setItem(STORE_KEY, students);
  return students;
}

export async function createStudent(student) {
  const students = await getStudents();
  const id = Date.now().toString();
  const newStudent = { id, ...student };
  students.push(newStudent);
  await setStudents(students);
  return newStudent;
}

export async function getStudent(id) {
  const students = await getStudents();
  return students.find(s => s.id === id) || null;
}

export async function updateStudent(id, updates) {
  const students = await getStudents();
  const idx = students.findIndex(s => s.id === id);
  if (idx === -1) return null;
  students[idx] = { ...students[idx], ...updates };
  await setStudents(students);
  return students[idx];
}

export async function deleteStudent(id) {
  let students = await getStudents();
  students = students.filter(s => s.id !== id);
  await setStudents(students);
  return true;
}
