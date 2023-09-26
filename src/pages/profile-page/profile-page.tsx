import { FC } from 'react';

import Main from './main/main';

import ContainerPage from '../../components/container-page/container-page';
import Header from '../../components/header/header';

const ProfilePage: FC = () => {
  return (
    <ContainerPage>
      <Header />
      <Main />
    </ContainerPage>
  );
};

export default ProfilePage;
