import styles from './not-found-page.module.css';

import ContainerPage from '../../components/container-page/container-page';
import Header from '../../components/header/header';
import NotFoundImg from '../../images/404.png';

export default function NotFoundPage() {
  return (
    <ContainerPage>
      <Header />
      <div className={styles.containerImg}>
        <img src={NotFoundImg} alt='Page not found' />
      </div>
    </ContainerPage>
  );
}
