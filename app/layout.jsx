import './globals.css';
export const metadata = {
  title: 'Den Glade Skorpe',
  description: 'Et moderne pizzaria med online bestilling'
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
