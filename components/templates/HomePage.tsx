import { FC, useEffect, useRef, useState } from 'react';
import Banner from '../organisms/Banner';
import useTrans from '../../hooks/useTrans';
import { useRouter } from 'next/router';
import BackToTop from '../atoms/buttons/BackToTop';
import styles from '../../styles/components/templates/HomePage.module.scss';
import HomeBody from '../organisms/HomeBody';
import CustomContainer from '../molecules/CustomContainer';

type PropTypes = {

};

const HomePage: FC<PropTypes> = () => {
  const supportInforRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

  }, []);

  return (
    <>
      {/* <Banner /> */}
      <div className={styles.homepage}>
        <HomeBody />
      </div>
      <div ref={supportInforRef} />
      <div className={styles.textures}>
        <div ref={eventsRef} />
        <div className={styles.btnArea}>
          <BackToTop />
        </div>
      </div>
    </>
  );
};

export default HomePage;
