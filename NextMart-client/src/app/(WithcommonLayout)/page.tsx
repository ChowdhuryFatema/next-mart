"use client"

import { useUser } from '@/context/UserContext';
import React from 'react';

const HomePage = () => {

  const user = useUser();
  console.log("user", user);

  return (
    <div>
      <h2>Welcome to nextmart home page</h2>
    </div>
  );
};

export default HomePage;