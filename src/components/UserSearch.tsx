import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// GitHub User Type
interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  followers: number;
  public_repos: number;
}

// Function to fetch user data
const fetchGitHubUser = async (username: string): Promise<GitHubUser> => {
  const { data } = await axios.get(`https://api.github.com/users/${username}`);
  return data;
};

const UserSearch: React.FC = () => {
  const [username, setUsername] = useState("");
  const [searchUser, setSearchUser] = useState("");

  // React Query to fetch user data
  const { data, isLoading, isError } = useQuery({
    queryKey: ["githubUser", searchUser],
    queryFn: () => fetchGitHubUser(searchUser),
    enabled: !!searchUser, // Only fetch when searchUser is set
  });

  const handleSearch = () => {
    setSearchUser(username);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleSearch} disabled={!username.trim()}>
        🔍 Search
      </button>

      {isLoading && <p>Loading...</p>}
      {isError && <p>❌ User not found!</p>}

      {data && (
        <div className="user-card">
          <img src={data.avatar_url} alt={data.name} />
          <h2>{data.name || data.login}</h2>
          <p>{data.bio || "No bio available"}</p>
          <p>👥 {data.followers} Followers</p>
          <p>📂 {data.public_repos} Repositories</p>
        </div>
      )}
    </div>
  );
};

export default UserSearch;
