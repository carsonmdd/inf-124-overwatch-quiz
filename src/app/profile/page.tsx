import Achievement from '../../components/Achievement';
import React from 'react';

const Profile = () => {
	return (
		<>
		  <div className="flex-1 flex items-center justify-center">
			  <h1 className="text-4xl font-black uppercase italic">Profile</h1>
		  </div>

		  <Achievement></Achievement>
		  
		</>
	);
};

export default Profile;
