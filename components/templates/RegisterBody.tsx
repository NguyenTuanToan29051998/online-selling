import type { NextPage } from 'next';
import styles from '../../styles/components/templates/Register.module.scss';
import { useRouter } from 'next/router';
import useTrans from '../../hooks/useTrans';
import { ChangeEvent, useState } from 'react';
import { Login } from '@/models/login';
import { RegisterType } from '@/models/register';
import { registerManagementAPI } from '../../api-clients/register';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NUMBER_REG } from '../../public/const';
import InputField from '../atoms/inputs/InputField';

const RegisterBody: NextPage = () => {
  const router = useRouter();
  const trans = useTrans();
  const [registerInfo, setRegisterInfo] = useState<RegisterType>({
    lastName: '',
    firstName: '',
    email: '',
    username: '',
    password: '',
    confirmPass: '',
    phoneNumber: '',
    gender: 0,
  });
  const [showValidate, setShowValidate] = useState<boolean>(false);

  const handleRegister = () => {
    // registerManagementAPI.registerAcount(registerInfo);
    setShowValidate(true);
    if (!registerInfo.lastName.trim()
      || !registerInfo.firstName.trim()
      || !registerInfo.email.trim()
      || !registerInfo.username.trim()
      || !registerInfo.password.trim()
      || !registerInfo.phoneNumber.trim()
    ) return;
    const params = {
      lastName: registerInfo.lastName,
      firstName: registerInfo.firstName,
      email: registerInfo.email,
      username: registerInfo.username,
      password: registerInfo.password,
      phoneNumber: registerInfo.phoneNumber,
      gender: registerInfo.gender,
    };
    const headers = {
      'Content-Type': 'application/json',
    };
    axios.post(`http://localhost:8080/register/client`, params ,  {headers: headers})
      .then(res => {
        if (res.data === 'success') {
          router.push('/');
        } else {
          toast.error(res.data);
        }
      })
      .catch(error => console.log(error));
  };

  const handleChangeForm = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRegisterInfo({ ...registerInfo, [name]: value });
  };

  return (
    <div className={styles.loginBody}>
      <div className="container">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <div id="first">
              <div className={`${styles.myform}`}>
                <div className="logo mb-3">
                  <div className="col-md-12 text-center">
                    <h1>Đăng ký</h1>
                  </div>
                </div>
                <div style={{maxHeight: '500px', overflow: "auto", paddingRight: '0.5rem'}}>
                  <div className={styles.formGroup}>
                    <InputField
                      label="Họ"
                      name="lastName"
                      placeholder="Vui lòng điền tên"
                      required
                      isError={showValidate && !registerInfo?.lastName}
                      errorText={"Vui lòng điền tên"}
                      value={registerInfo?.lastName}
                      onChange={(event) => handleChangeForm(event)}
                      type="text"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <InputField
                      label="Tên"
                      name="firstName"
                      placeholder="Vui lòng điền họ"
                      required
                      isError={showValidate && !registerInfo?.firstName}
                      errorText={"Vui lòng điền họ"}
                      value={registerInfo?.firstName}
                      onChange={(event) => handleChangeForm(event)}
                      type="text"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <InputField
                      label="Tên đăng nhập"
                      name="username"
                      placeholder="Vui lòng điền tên đăng nhập"
                      required
                      isError={showValidate && !registerInfo?.username}
                      errorText={"Vui lòng điền tên đăng nhập"}
                      value={registerInfo?.username}
                      onChange={(event) => handleChangeForm(event)}
                      type="text"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <InputField
                      label="Email"
                      name="email"
                      placeholder="Vui lòng điền tên đăng nhập"
                      required
                      isError={showValidate && !registerInfo?.email}
                      errorText={"Vui lòng điền email"}
                      value={registerInfo?.email}
                      onChange={(event) => handleChangeForm(event)}
                      type="text"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <InputField
                      label="Mật khẩu"
                      name="password"
                      placeholder="Vui lòng điền mật khẩu"
                      required
                      isError={showValidate && !registerInfo?.password}
                      errorText={"Vui lòng điền mật khẩu"}
                      value={registerInfo?.password}
                      onChange={(event) => handleChangeForm(event)}
                      type="text"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <InputField
                      label="Xác nhận mật khẩu"
                      name="confirmPass"
                      placeholder="Vui lòng điền xác nhận mật khẩu"
                      required
                      isError={showValidate && !registerInfo?.confirmPass}
                      errorText={"Vui lòng điền xác nhận mật khẩu"}
                      value={registerInfo?.confirmPass}
                      onChange={(event) => handleChangeForm(event)}
                      type="text"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <InputField
                      label="Số điện thoại"
                      name="phoneNumber"
                      placeholder="Vui lòng điền số điện thoại"
                      required
                      isError={showValidate && !registerInfo?.phoneNumber}
                      errorText={"Vui lòng điền số điện thoại"}
                      value={registerInfo?.phoneNumber}
                      onChange={(event) => handleChangeForm(event)}
                      type="text"
                    />
                  </div>
                  <div className="">
                    <label htmlFor="exampleInputEmail1">Giới tính</label>
                    <div className="d-flex gap-5 mt-2">
                      <div className="d-flex gap-2">
                        <input
                          type="radio"
                          name="gender"
                          className={styles.inputRadio}
                          checked={registerInfo.gender === 0}
                          onChange={(e) => setRegisterInfo({...registerInfo, gender: 0})}
                        />
                        <div>Nữ</div>
                      </div>
                      <div className="d-flex gap-2">
                        <input
                          type="radio"
                          name="gender"
                          className={styles.inputRadio}
                          checked={registerInfo.gender === 1}
                          onChange={(e) => setRegisterInfo({...registerInfo, gender: 1})}
                        />
                        <div>Nam</div>
                      </div>
                    </div>
                  </div>
                  {/* <div className={styles.formGroup}>
                    <p className="text-center">By signing up you accept our <a href="#">Terms Of Use</a></p>
                  </div> */}
                  <div className="col-md-12 text-center mt-3">
                    <button
                      type="submit"
                      className={`${styles.btn} ${styles.btnBlock} ${styles.txTfm} ${styles.btnPrimary} ${styles.mybtn}`}
                      onClick={() => handleRegister()}
                    >
                      Đăng ký
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegisterBody;
