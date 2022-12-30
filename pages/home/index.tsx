import type { NextPageWithLayout } from '../_app';
import { ReactElement, useEffect, useState } from 'react';
import HomeBody from '../../components/templates/HomeBody';
import Layout from '../../layouts';
import axios from 'axios';
import { BannerType } from '@/models/banner';
import CustomLoading from '../../components/molecules/CustomLoading';

const Home: NextPageWithLayout = () => {

  return (
    <HomeBody />
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default Home;
