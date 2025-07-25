'use client'
import LeaderboardDashboard from "../../components/leaderboard";
import { usePatel } from "../../components/patelContext";

export default function Loading() {
 const {villages,users,posts,comments,likes} = usePatel()


return(
    <div>
        <LeaderboardDashboard
  villages={villages} 
  users={users}
  posts={posts}
  comments={comments}
  likes={likes}
/>
    </div>
)

}
