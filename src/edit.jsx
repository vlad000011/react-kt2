import React from 'react';
import { Form, useLoaderData, redirect } from 'react-router-dom';
import { getStudent, updateStudent } from './storage/forStorage';

export async function loader({ params }) {
  const student = await getStudent(params.studentId);
  if (!student) throw new Response('Not Found', { status: 404 });
  return { student };
}

export async function action({ request, params }) {
  const form = await request.formData();
  const updates = {
    name: form.get('name'),
    surname: form.get('surname'),
    year: form.get('year'),
    major: form.get('major')
  };
  await updateStudent(params.studentId, updates);
  // После сохранения — редирект на страницу студента
  return redirect(`/students/${params.studentId}`);
}

export default function Edit() {
  const { student } = useLoaderData();

  return (
    <div>
      <h2>Edit {student.name}</h2>
      <Form method="post">
        <input placeholder="name" name="name" defaultValue={student.name} />
        <input placeholder="surname" name="surname" defaultValue={student.surname} />
        <input placeholder="year" name="year" defaultValue={student.year} />
        <input placeholder="major" name="major" defaultValue={student.major} />
        <button type="submit">Save</button>
      </Form>
    </div>
  );
}
