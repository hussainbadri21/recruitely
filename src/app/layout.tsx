import type { Metadata } from "next";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Link from 'next/link'
import { Button } from 'antd';


export const metadata: Metadata = {
  title: "Recruitely",
  description: "Tool for recruiters for managing applicant data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='m-0'>
        <header className="bg-white">
          <nav className=" flex items-center justify-between p-6 lg:px-8 border-b-2 border-gray-300 shadow-lg mb-4" >
            <div className="flex lg:flex-1">
              <Link href="/" className="-m-1.5 p-1.5 no-underline text-xl font-bold text-gray-900">
                <span className="">Recruitely</span>
              </Link>
            </div>
            <Button type="primary" size={'large'} href="candidate/add">
              Add Candidate
            </Button>
          </nav>
        </header>
        <div className="p-8 sm:p-[50px]">
          <AntdRegistry>
            {children}
          </AntdRegistry>
        </div>
      </body>
    </html>
  );
}
