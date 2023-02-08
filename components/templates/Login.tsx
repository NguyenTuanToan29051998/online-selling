import type { NextPage } from 'next';
import styles from '../../styles/Login.module.scss';
import { useRouter } from 'next/router';
import useTrans from '../../hooks/useTrans';
import { useState } from 'react';
import { Login } from '@/models/login';
import { LoginApiManagement } from '../../api-clients/login';
import axios from 'axios';

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
    console.log(loginInfo, 'x');

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

  return (
    <div className={styles.loginBody}>
      <div className="container">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <div id="first">
              <div className={`${styles.myform}`}>
                <div className="logo mb-3">
                  <div className="col-md-12 text-center">
                    <h1>Login</h1>
                  </div>
                </div>
                <div>
                  <div className={styles.formGroup}>
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                      type="email"
                      name="email"
                      className={styles.formControl}
                      id="email"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      onChange={(e) => setLoginInfo({...loginInfo, username: e.target.value})}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="exampleInputEmail1">Password</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className={styles.formControl}
                      aria-describedby="emailHelp"
                      placeholder="Enter Password"
                      onChange={(e) => setLoginInfo({...loginInfo, password: e.target.value})}
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
                      Login
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
                      <div className={`${styles.btn} ${styles.google} ${styles.btn} ${styles.mybtn}`}><i className="fa fa-google-plus">
                      </i> Signup using Google
                      </div>
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <p className="text-center">{`Don't have account?`}<a href="replace">Sign up here</a></p>
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
