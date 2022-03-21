import Employees from './Employees';

const adminRoutes = [
  {
    path: '/',
    isPrivate: true,
    component: Employees,
    name: 'Employees',
  },
];

export default adminRoutes;
