import type { NextPageWithLayout } from '../_app';
import { ReactElement, useEffect, useState } from 'react';
import Layout from '../../layouts';
import axios from 'axios';
import { BannerType } from '@/models/banner';
import CustomLoading from '../../components/molecules/CustomLoading';
import CartBody from '../../components/templates/CartBody';
import CustomContainer from '../../components/molecules/CustomContainer';
import FavoriteBody from '../../components/templates/FavoriteBody';

const Favorite: NextPageWithLayout = () => {

  return (
    <CustomContainer size="medium">
      <FavoriteBody />
    </CustomContainer>
  );
};

Favorite.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default Favorite;
