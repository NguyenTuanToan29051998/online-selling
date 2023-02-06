import { Menu } from '@/models/menu';
import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import CustomHead from '../components/atoms/headers/CustomHead';
import CustomLoading from '../components/molecules/CustomLoading';
import Footer from '../components/organisms/Footer';
import Header from '../components/organisms/Header';
// import FacebookChatPlugin from '../components/templates/FacebookChatPlugin';
import { navSIB } from '../public/const';

type PropsType = {
  children: any;
}

const Layout: FC<PropsType> = ({ children }) => {

  return (
    <>
      <CustomHead />
      {/* <FacebookChatPlugin /> */}
      <Header />
      <main style={{ backgroundColor: '#f2f3f7' }}>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
