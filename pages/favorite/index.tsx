import type { NextPageWithLayout } from '../_app';
import { ReactElement, useEffect, useState } from 'react';
import Layout from '../../layouts';
import axios from 'axios';
import { BannerType } from '@/models/banner';
import CustomLoading from '../../components/molecules/CustomLoading';
import CustomContainer from '../../components/molecules/CustomContainer';
import FavoriteBody from '../../components/templates/FavoriteBody';
import { ProductOverviewType } from '@/models/product';
import { FavoriteApiManagement } from '../../api-clients/favorite';

const Favorite: NextPageWithLayout = () => {

  const [favoriteList, setFavoriteList] = useState<ProductOverviewType[]>([]);

  useEffect(() => {
    let userInfo: { id: string; };
    if (typeof window !== 'undefined') {
      userInfo = JSON.parse(localStorage.getItem('user-info') || '[]');
    } else return;
    FavoriteApiManagement.getFavoritesList(userInfo.id).then((res) => {
      setFavoriteList(res.data.proPage.content);
    }).catch(err => console.log(err));
  }, []);

  return (
    <CustomContainer size="medium">
      <FavoriteBody favoriteList={favoriteList} setFavoriteList={setFavoriteList} />
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
