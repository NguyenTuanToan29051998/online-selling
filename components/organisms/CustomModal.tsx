import { FC, ReactNode } from 'react';
import { Modal } from 'react-bootstrap';
import useTrans from '../../hooks/useTrans';
import styles from '../../styles/components/organisms/CustomModal.module.scss';

type PropTypes = {
  title: string;
  show: boolean;
  setShow: (modalConfig: any) => void;
  children: ReactNode;
  size?: string;
};

const CustomModal: FC<PropTypes> = (props) => {
  const { title, show, setShow, children, size } = props;
  const trans = useTrans();

  return (
    <Modal show={show} size="sm" centered dialogClassName={`${styles.customModal} ${size && styles.size}`}>
      <div className={styles.wrapper}>
        <p
          className={styles.close}
          onClick={() => setShow(false)}
          onKeyDown={() => setShow(false)}
          role="presentation"
        >
          {trans.close}
        </p>
        <h2 className={styles.title}>{title}</h2>
        {children}
      </div>
    </Modal>
  );
};

export default CustomModal;
