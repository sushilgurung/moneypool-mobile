import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import ProfileHeader from '../Components/Account/ProfileHeader';
import Options from '../Components/Account/Options';
import Footer from '../Components/Account/Footer';

/**
 * Account Screen where user can change settings, edit profile or logout
 * @returns {TSX.Element} Account Screen
 */
export default function AccountScreen() {
  const { User } = useSelector((state: RootState) => state.user);

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {User ? (
        <>
          <ProfileHeader />
          <Options />
        </>
      ) : null}
      <Footer />
    </ScrollView>
  );
}
