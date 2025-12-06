import React from 'react';
import { NavLink, Form } from 'react-router-dom';

export default function StudentList({ students = [] }) {
  return (
    <ul style={{listStyle:'none', padding:0}}>
      {students.map(s => (
        <li key={s.id} style={{marginBottom:8}}>
          <NavLink
            to={`/students/${s.id}`}
            style={({ isActive }) => ({ fontWeight: isActive ? '700' : '400' })}
          >
            {s.name} {s.surname}
          </NavLink>
          <div>
            <NavLink to={`/students/${s.id}/edit`} style={{marginRight:6}}>edit</NavLink>
            <Form method="post" action={`/students/delete/${s.id}`} onSubmit={(e)=>{if(!confirm('Delete?')) e.preventDefault();}}>
              <button type="submit">delete</button>
            </Form>
          </div>
        </li>
      ))}
      {/* несколько тестовых ссылок, как в ТЗ */}
      <li><a href="/students/1">Student1 (href)</a></li>
      <li><a href="/students/2">Student2 (href)</a></li>
    </ul>
  );
}
