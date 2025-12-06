import React from 'react';import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root, { loader as rootLoader, action as rootAction } from './root';
import Student, { loader as studentLoader } from './Student';
import Edit, { loader as editLoader, action as editAction } from './Edit';
import NotFound from './NotFound';
import './styles.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: rootLoader,
    action: rootAction,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <div style={{padding:20}}>Welcome — индексная страница</div> },
      {
        path: 'students/:studentId',
        element: <Student />,
        loader: studentLoader,
      },
      {
        path: 'students/:studentId/edit',
        element: <Edit />,
        loader: editLoader,
        action: editAction,
      },
      {
        path: 'students/delete/:studentId',
        action: async ({ params }) => {
          // простая action-обёртка — удаление
          const { deleteStudent } = await import('./storage/forStorage');
          await deleteStudent(params.studentId);
          return { redirect: `/` };
        }
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
