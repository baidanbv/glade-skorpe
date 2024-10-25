'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

import { jwtDecode } from 'jwt-decode';
import { MdOutlineLogout } from 'react-icons/md';

import { useMessages, useOrders } from '@/store';

import Loader from '@/components/layouts/Loader/Loader';

const BackofficeLayout = ({ children }) => {
  const router = useRouter();
  const currentPathName = usePathname();

  const messages = useMessages((state) => state.messages);
  const orders = useOrders((state) => state.orders);

  const loadMessages = useMessages((state) => state.loadMessages);
  const loadOrders = useOrders((state) => state.loadOrders);

  const [authorized, setAuthorized] = useState(false);
  const [userRole, setUserRole] = useState('');

  const unReadMessagesAmount = messages.filter((item) => item.status === false);
  const unReadOrdersAmount = orders.filter((item) => item.shipped === false);

  useEffect(() => {
    loadMessages();
    loadOrders();

    const pollingInterval = setInterval(() => {
      loadMessages();
      loadOrders();
    }, 10000);

    return () => clearInterval(pollingInterval);
  }, [loadMessages, loadOrders]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
      return;
    }

    const decodedToken = jwtDecode(token);
    setUserRole(decodedToken.role);

    if (decodedToken.role === 'guest') {
      router.push('/');
      localStorage.removeItem('token');
      return;
    }

    setAuthorized(true);
  }, [router]);

  const handleLogOut = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  if (!authorized) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen grid grid-rows-layout grid-cols-layout">
      <header className="bg-accent text-secondary h-[100px] flex items-center justify-between px-12 row-start-1 col-start-1 col-end-3">
        <div className="flex items-center gap-5 px-6">
          <Link href="/backoffice" className={`text-2xl ${currentPathName === '/backoffice' ? 'text-background' : 'text-secondary'}  hover:text-background`}>
            Backoffice
          </Link>
          <Link href="/" className="text-xl">
            Homepage
          </Link>
        </div>
        <MdOutlineLogout className="cursor-pointer hover:text-red-500" title="Log out" onClick={handleLogOut} />
      </header>

      {userRole === 'admin' && (
        <aside className="bg-accent h-full py-6 px-5 row-start-2 col-start-1">
          <Link href="/backoffice/dishes" className={`font-kurale mb-5 text-2xl block hover:text-secondary ${currentPathName === '/backoffice/dishes' ? 'text-secondary text-4xl' : 'text-background'}  `}>
            Dishes
          </Link>

          <Link href="/backoffice/employees" className={`font-kurale mb-5 text-2xl block hover:text-secondary ${currentPathName === '/backoffice/employees' ? 'text-secondary text-4xl' : 'text-background'}  `}>
            Employees
          </Link>

          <Link href="/backoffice/messages" className={` flex items-center gap-2  font-kurale mb-5 text-2xl hover:text-secondary ${currentPathName === '/backoffice/messages' ? 'text-secondary text-4xl' : 'text-background'} `}>
            <span>Messages</span>
            {unReadMessagesAmount.length > 0 && <span className=" text-sm text-secondary bg-background p-2 rounded-full w-5 h-5 flex items-center justify-center">{unReadMessagesAmount.length}</span>}
          </Link>

          <Link href="/backoffice/orders" className={`flex items-center gap-2 font-kurale mb-5 text-2xl hover:text-secondary ${currentPathName === '/backoffice/orders' ? 'text-secondary text-4xl' : 'text-background'}  `}>
            <span>Orders</span>
            {unReadOrdersAmount.length > 0 && <span className=" text-sm text-secondary bg-background p-2 rounded-full w-5 h-5 flex items-center justify-center">{unReadOrdersAmount.length}</span>}
          </Link>

          <Link href="/backoffice/categories" className={`font-kurale mb-5 text-2xl block hover:text-secondary ${currentPathName === '/backoffice/categories' ? 'text-secondary text-4xl' : 'text-background'}  `}>
            Categories
          </Link>

          <Link href="/backoffice/ingredients" className={`font-kurale mb-5 text-2xl block hover:text-secondary ${currentPathName === '/backoffice/ingredients' ? 'text-secondary text-4xl' : 'text-background'}  `}>
            Ingredients
          </Link>

          <Link href="/backoffice/users" className={`font-kurale mb-5 text-2xl block hover:text-secondary ${currentPathName === '/backoffice/users' ? 'text-secondary text-4xl' : 'text-background'}  `}>
            Users
          </Link>
        </aside>
      )}

      <main className="p-10 row-start-2 col-start-2 bg-background">{children}</main>

      <footer className="bg-accent text-secondary h-[100px] flex items-center justify-center row-start-3 col-start-1 col-end-3">© 2024 Den Glade Skorpe</footer>
    </div>
  );
};

export default BackofficeLayout;
