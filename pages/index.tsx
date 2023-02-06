import type { NextPage } from 'next';
import CustomHead from '../components/atoms/headers/CustomHead';
import Login from '../components/templates/Login';

const Home: NextPage = () => {
  return (
    <>
      <CustomHead />
      <Login />
    </>
  );
};

export default Home;
