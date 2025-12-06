import React from 'react';
import { Outlet, NavLink, Form, useLoaderData, useNavigation, redirect } from 'react-router-dom';
import { getStudents, createStudent } from './storage/forStorage';
import StudentList from './components/StudentList';

export async function loader() {
  const students = await getStudents();
  return { students };
}

export async function action({ request }) {
  const form = await request.formData();
  const name = form.get('name') || 'NoName';
  const surname = form.get('surname') || 'NoSurname';
  const year = form.get('year') || '2025';
  const major = form.get('major') || 'Unknown';

  const newStudent = await createStudent({ name, surname, year, major });
  // редирект на страницу редактирования новосозданного студента
  return redirect(`/students/${newStudent.id}/edit`);
}

export default function Root() {
  const { students } = useLoaderData();
  const navigation = useNavigation();

  return (
    <div style={{display:'flex', gap:20}}>
      <aside style={{width:260, padding:10, borderRight:'1px solid #ddd'}}>
        <h2>Students</h2>
        <StudentList students={students} />

        <h3>Add student</h3>
        {/* Form компонент — не отправит реального fetch при client-side navigation
            react-router handles the action on the route */}
        <Form method="post">
          <input placeholder="name" name="name" />
          <input placeholder="surname" name="surname" />
          <input placeholder="year" name="year" />
          <input placeholder="major" name="major" />
          <button type="submit">Add student</button>
        </Form>

        {navigation.state === 'loading' && <div>Loading...</div>}
      </aside>

      <main style={{flex:1, padding:10}}>
        <p>I'm number one in React!</p>
        <Outlet />
      </main>
    </div>
  );
}
