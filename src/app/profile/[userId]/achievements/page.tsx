import Achievements from '@/components/profile/Achievements'
import {getUserById} from '@/data/mockProfileData'


const AchievementsPage = async ({params} : {params : Promise<{userId : string}>}) => {

    const { userId } = await params;
    const user = getUserById(userId)

    if(!user) return <div>User not found, please log in to view achievements.</div>

    return(

        <div className="min-h-screen text-xl bg-ow-dark-blue text-white">
            <div className = "pl-110">
            <h1>Personal Achievements</h1>
            </div>
            <Achievements achievements = {user.achievements}></Achievements>
        </div>
    );
}

export default AchievementsPage;
//http://localhost:3000/profile/user_tracer/achievements
