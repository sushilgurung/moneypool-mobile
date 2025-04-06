import { View, Text, Pressable, ScrollView, Image } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import ProfileHeader from '../Components/Account/ProfileHeader';
import Options from '../Components/Account/Options';
import Footer from '../Components/Account/Footer';

// Main account screen component
export default function AccountScreen() {
  const { User } = useSelector((state: RootState) => state.user);
  const { logout } = useAuth();

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
