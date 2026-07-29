import React from 'react';
import ProfileClient from "@/components/profile/ProfileClient";

export const metadata = {
  title: "Idea-Vault || My Profile",
  description: "Share and explore innovative ideas",
};

const ProfilePage = () => {
    return (
      <ProfileClient />
    );
};

export default ProfilePage;