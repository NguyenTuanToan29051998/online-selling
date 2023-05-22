import type { NextPage } from 'next';
import CustomHead from '../../components/atoms/headers/CustomHead';
import RegisterBody from '../../components/templates/RegisterBody';

const Register: NextPage = () => {
  return (
    <>
      <CustomHead />
      <RegisterBody />
    </>
  );
};

export default Register;
