import type { NextPage } from 'next';
import styles from '../../styles/Login.module.scss';
import { useRouter } from 'next/router';
import useTrans from '../../hooks/useTrans';
import { ChangeEvent, useState } from 'react';
import { Login } from '@/models/login';
import { LoginApiManagement } from '../../api-clients/login';
import axios from 'axios';
import InputField from '../atoms/inputs/InputField';

const Login: NextPage = () => {
  const router = useRouter();
  const trans = useTrans();
  const [loginInfo, setLoginInfo] = useState<Login>({
    username: '',
    password: '',
  });
  const [showValidate, setShowValidate] = useState<boolean>(false);

  const handleLogin = () => {
    setShowValidate(true);
    if (!loginInfo.username.trim()
      || !loginInfo.password.trim()
    ) return;

    if (!loginInfo.username || !loginInfo.password) return;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'JWT fefege...',
      'Cookie': 'JSESSIONID=592B454C641F57822178C1C7753AC561',
      // 'token': 'f1e25a8c-6ec0-11ed-b62e-2a5743127145'
    };
    axios.post(`http://localhost:8080/rest/security/login?username=${loginInfo.username}&password=${loginInfo.password}`, {headers: headers})
      .then(res => {
        localStorage.setItem('user-info', JSON.stringify(res.data));
        router.push('/home');
      })
      .catch(error => console.log(error));
  };

  const handleChangeForm = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginInfo({ ...loginInfo, [name]: value });
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
                    <h1>Đăng nhập</h1>
                  </div>
                </div>
                <div>
                  <div className={styles.formGroup}>
                    <InputField
                      label="Tên đăng nhập"
                      name="username"
                      placeholder="Vui lòng điền tên đăng nhập"
                      required
                      isError={showValidate && !loginInfo?.username}
                      errorText={"Vui lòng điền tên đăng nhập"}
                      value={loginInfo?.username}
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
                      isError={showValidate && !loginInfo?.password}
                      errorText={"Vui lòng điền mật khẩu"}
                      value={loginInfo?.password}
                      onChange={(event) => handleChangeForm(event)}
                      type="text"
                    />
                  </div>
                  {/* <div className={styles.formGroup}>
                    <p className="text-center">By signing up you accept our <a href="#">Terms Of Use</a></p>
                  </div> */}
                  <div className="col-md-12 text-center ">
                    <button
                      type="submit"
                      className={`${styles.btn} ${styles.btnBlock} ${styles.txTfm} ${styles.btnPrimary} ${styles.mybtn}`}
                      onClick={() => handleLogin()}
                    >
                      Đăng nhập
                    </button>
                  </div>
                  <div className="col-md-12 ">
                    <div className={styles.loginOr}>
                      <hr className={styles.hrOr} />
                      <span className={styles.spanOr}>or</span>
                    </div>
                  </div>
                  <div className="col-md-12 mb-3">
                    <div className="text-center">
                      <div className={`${styles.btn} ${styles.google} ${styles.btn} ${styles.mybtn}`} onClick={() => router.push('/register')} role="presentation"><i className="fa fa-google-plus">
                      </i> Đăng ký
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
