import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { getStudent } from './storage/forStorage';

export async function loader({ params }) {
  const student = await getStudent(params.studentId);
  if (!student) {
    // бросаем ответ с кодом 404 — React Router покажет errorElement
    throw new Response('Not Found', { status: 404 });
  }
  return { student };
}

export default function Student() {
  const { student } = useLoaderData();
  return (
    <div>
      <h2>{student.name} {student.surname}</h2>
      <p>Year: {student.year}</p>
      <p>Major: {student.major}</p>
    </div>
  );
}
