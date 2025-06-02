// app/context/SidebarContext.js
"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [villages, setVillages] = useState([]);
  const [prices, setPrices] = useState([]);
  const [stories, setStories] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [events, setEvents] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null); // Store token in state
const path = process.env.NEXT_PUBLIC_API_URL;
//const path = 'http://localhost:5000';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const siteBrand = "Nayta Patel Network";
  const siteLogo = "/tactor.png";

  const tags = [
    // Farming & Agriculture
    "farming",
    "kheti",
    "agriculture",
    "krishi",
    "organic farming",
    "jaivik kheti",
    "crop rotation",
    "fasal chakkar",
    "soil health",
    "mitti swasthya",
    "fertilizers",
    "khad",
    "pesticides",
    "keetnashak",
    "irrigation",
    "sinchai",
    "harvest",
    "katai",
    "tractor",
    "traktor",
    "plough",
    "hal",

    // Animals & Dairy
    "cow",
    "gay",
    "buffalo",
    "bhains",
    "dairy",
    "dudh",
    "milk",
    "doodh",
    "cattle",
    "pashu",
    "livestock",
    "janwar",
    "animal husbandry",
    "pashupalan",
    "goat",
    "bakri",
    "sheep",
    "bhed",
    "poultry",
    "murgi",
    "fish farming",
    "machli palan",

    // Crops
    "wheat",
    "gehu",
    "rice",
    "chawal",
    "corn",
    "makka",
    "sugarcane",
    "ganna",
    "cotton",
    "kapas",
    "soybean",
    "soyabean",
    "pulses",
    "dal",
    "vegetables",
    "sabzi",
    "fruits",
    "phal",

    // Patel Community
    "patel",
    "community",
    "samaj",
    "leuva patel",
    "kadva patel",
    "farmer community",
    "kisan samaj",
    "nayata patel",
    "nayata samaj",
    "patel pariwar",
    "hajj",
    "umrah",
    "makka madina",
    "ajmer",

    // Islamic Terms
    "islam",
    "islamic",
    "muslim",
    "muslim community",
    "namaz",
    "salah",
    "roza",
    "fasting",
    "ramzan",
    "ramadan",
    "eid",
    "eid mubarak",
    "quran",
    "hadith",
    "masjid",
    "mosque",
    "imam",
    "mullah",
    "halal",
    "zakat",
    "charity",
    "sadaqah",

    // Weather & Disasters
    "weather",
    "mosam",
    "rain",
    "baarish",
    "drought",
    "sukha",
    "flood",
    "aapda",
    "cyclone",
    "toofan",
    "storm",
    "aandhi",
    "heatwave",
    "garmi",
    "cold wave",
    "sardi",
    "climate",
    "jalvayu",

    // Village Life
    "village",
    "gaon",
    "rural",
    "gramin",
    "panchayat",
    "sarpanch",
    "well",
    "kuan",
    "pond",
    "talab",
    "farm",
    "khet",
    "farmer",
    "kisan",
    "farmer protest",
    "kisan andolan",

    // Social & Cultural
    "marriage",
    "shaadi",
    "wedding",
    "vivah",
    "festival",
    "tyohar",
    "diwali",
    "deepawali",
    "holi",
    "eid",
    "bakrid",
    "eid al-adha",
    "community program",
    "samajik karyakram",
    "religious",
    "dharmik",

    // Development
    "development",
    "vikas",
    "roads",
    "sadak",
    "infrastructure",
    "sanrachna",
    "electricity",
    "bijli",
    "water",
    "pani",
    "education",
    "shiksha",
    "health",
    "swasthya",
    "hospital",
    "aspatal",

    // Food & Nutrition
    "roti",
    "chapati",
    "bread",
    "dairy products",
    "dudh utpad",
    "ghee",
    "clarified butter",
    "butter",
    "makhan",
    "curd",
    "dahi",
    "cheese",
    "paneer",
    "milk powder",
    "doodh powder",

    // Farming Tools
    "plough",
    "hal",
    "sickle",
    "hasiya",
    "hoe",
    "kudal",
    "shovel",
    "phavda",
    "trowel",
    "trowel",
    "rake",
    "rake",

    // Natural Elements
    "earth",
    "prithvi",
    "water",
    "jal",
    "air",
    "vayu",
    "fire",
    "agni",
    "sky",
    "aakash",
    "sun",
    "surya",
    "moon",
    "chandra",
    "stars",
    "tare",

    // Animal Products
    "manure",
    "khad",
    "compost",
    "compost",
    "wool",
    "oon",
    "leather",
    "chamda",
    "honey",
    "shahad",
    "beekeeping",
    "madhu makhi palan",

    // Financial
    "loan",
    "karz",
    "subsidy",
    "anudan",
    "insurance",
    "bima",
    "market",
    "mandi",
    "price",
    "daam",
    "profit",
    "munafa",
    "loss",
    "nuksan",

    // Seasons
    "summer",
    "garmi",
    "winter",
    "sardi",
    "monsoon",
    "barsaat",
    "spring",
    "basant",
    "autumn",
    "patjhad",

    // Measurement
    "acre",
    "ekar",
    "hectare",
    "hectare",
    "kilogram",
    "kilo",
    "quintal",
    "kwintal",
    "liter",
    "liter",

    // Family
    "family",
    "parivar",
    "children",
    "bacche",
    "elders",
    "buzurg",
    "women",
    "mahila",
    "men",
    "purush",

    // Additional Terms
    "organic",
    "jaivik",
    "sustainable",
    "sambhav",
    "tradition",
    "parampara",
    "modern",
    "adhunik",
    "technology",
    "takniki",
    "innovation",
    "navachar",
    "cooperative",
    "sahkari",
    "self-help group",
    "swayam sahayata samuh",
  ];
  // Auto-login if token exists
  const fetchUserFromToken = async () => {
    try {
      const token = localStorage.getItem("token"); // Or wherever you store the JWT
      axios.defaults.headers["Authorization"] = `Bearer ${token}`;

      if (!token) {
        setError("No token found");
        return;
      }


      const response = await axios.get(path + "/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
//console.log('User data',response.data);
      // document.cookie = `token=${token}; path=/`;
      setUser(response.data);
      //console.log(response.data, 'data of user');
    } catch (err) {
      setError("Failed to fetch user");
      console.error(err);
    }
  };

  // Fetch all posts
  const fetchPosts = async () => {
    try {
      const response = await axios.get(path + "/api/posts");
      setPosts(response.data);
      console.log(response.data);
    } catch (err) {
      setError(err.message);
    }
  };
  // Fetch all posts
  const fetchStories = async () => {
    try {
      const response = await axios.get(path + "/api/stories");
      setStories(response.data);
      //console.log(response.data);
    } catch (err) {
      setError(err.message);
    }
  };
  // Fetch all prices
  const fetchPrices = async () => {
    try {
      const response = await axios.get(path + "/api/prices");
      setPrices(response.data);
      //console.log(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      const response = await axios.get(path + "/api/blogs");
      setBlogs(response.data);
      // console.log(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch all posts
  const fetchEvents = async () => {
    try {
      const response = await axios.get(path + "/api/events");
      setEvents(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch specific post
  const fetchPostById = async (id) => {
    try {
      const response = await axios.get(path + `/api/posts/${id}`);
      return response.data;
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch all comments for a post
  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(path + `/api/comments/post/${postId}`);
      setComments(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch user data
  const fetchUser = async (id) => {
    try {
      const response = await axios.get(path + `/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
      //document.cookie = `token=${token}; path=/`;
    } catch (err) {
      setError(err.message);
    }
  };
  // Fetch user data
  const fetchUsers = async (token) => {
    try {
      const response = await axios.get(path + `/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (err) {
      setError(err.message);
    }
  };
  // Fetch user Villages
  const fetchVillages = async (id) => {
    try {
      const response = await axios.get(path + `/api/villages`);
      setVillages(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateBlog = async (id, updatedData) => {
    const token = localStorage.getItem("token");
    //console.log('blog update function called', updatedData);

    try {
      const response = await fetch(`${path}/api/blogs/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: updatedData, // updatedData must be an instance of FormData
      });

      if (!response.ok) {
        throw new Error("Failed to update blog");
      }

      const updatedBlog = await response.json();

      setBlogs((prev) =>
        prev.map((blog) => (blog._id === id ? updatedBlog : blog))
      );

      return updatedBlog;
    } catch (error) {
      console.error("Error updating blog:", error);
      throw error;
    }
  };

  const updatePrice = async (id, updatedData) => {
    const token = localStorage.getItem("token");
    console.log("Sending data:", updatedData);

    try {
      const response = await axios.put(
        `${path}/api/prices/${id}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Axios stores response data in response.data
      setPrices(response.data);
      return response.data;
    } catch (error) {
      console.error("Update error:", {
        message: error.message,
        response: error.response?.data,
      });
      throw error;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token"); // Or wherever you store the JWT
if(user){
   fetchUsers(token);
}
   
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Or wherever you store the JWT

    fetchPosts();
    fetchUsers(token);
    fetchBlogs();
    fetchPrices();
    fetchStories();
    fetchVillages();
    fetchEvents();
    fetchUserFromToken();
    setToken(localStorage.getItem("token"));
    //fetchUserFromToken()
  }, []);
  // Sign in function (generate token)
  const signIn = async (email, password) => {
    try {
      const response = await axios.post(path + "/api/auth/login", {
        email,
        password,
      });
      console.log('login data',response.data.user);
      
      setUser(response.data.user);
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
    } catch (err) {
      // More specific error handling
      if (err.response) {
        setError(err.response.data.message || "Login failed");
      } else {
        setError("Network error or server unavailable");
      }
    }
  };
  // Sign up function
  const signUp = async (userData) => {
    console.log(userData);

    try {
      const response = await axios.post(path + "/api/auth/register", userData);
      setUser(response.data.user);
      // console.log(response.data.token);

      setToken(response.data.token); // Set the token received from backend
      localStorage.setItem("token", response.data.token); // Store token in local storage for persistence
    } catch (err) {
      setError(err.message);
    }
  };

  // Create a post
  const createPost = async (postData) => {
    try {
      const response = await axios.post(path + "/api/posts", postData);
      setPosts([...posts, response.data]);
    } catch (err) {
      setError(err.message);
    }
  };

  // Update a post
  const updatePost = async (id, updatedData) => {
    try {
      const response = await axios.put(path + `/api/posts/${id}`, updatedData);
      setPosts(posts.map((post) => (post._id === id ? response.data : post)));
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete a post
  const deletePost = async (id) => {
    try {
      await axios.delete(path + `/api/posts/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete a comment
  const deleteComment = async (commentId) => {
    try {
      await axios.delete(path + `/api/comments/${commentId}`);
      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (err) {
      setError(err.message);
    }
  };

  // Like a post
  const likePost = async (postId) => {
    try {
      const response = await axios.post(path + `/api/likes/${postId}`);
      setLikes([...likes, response.data]);
    } catch (err) {
      setError(err.message);
    }
  };

  // Unlike a post
  const unlikePost = async (postId) => {
    try {
      await axios.delete(path + `/api/likes/${postId}`);
      setLikes(likes.filter((like) => like.post !== postId));
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete contact message
  const deleteContact = async (contactId) => {
    try {
      await axios.delete(path + `/api/contacts/${contactId}`);
      // Handle deletion in state
    } catch (err) {
      setError(err.message);
    }
  };

  // Logout function (clear token)
  const logOut = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token"); // Remove token from local storage
  };
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  function formatDate(dateString) {
    const date = new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    return date; // Example: "27/04/2025"
  }

  function timeAgo(timestamp) {
    // Convert the timestamp to a Date object if it isn't already
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    // Time intervals in seconds
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };

    // Calculate the time difference for each interval
    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);

      if (interval >= 1) {
        return interval === 1
          ? `${interval} ${unit} ago`
          : `${interval} ${unit}s ago`;
      }
    }

    return "just now";
  }

  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
        closeSidebar,
        user,
        users,
        path,
        posts,
        setPosts,
        blogs,
        setBlogs,
        comments,
        updatePrice,
        likes,
        loading,
        error,
        token,
        fetchPosts,
        updateBlog,
        fetchPostById,
        fetchComments,
        fetchUser,
        fetchEvents,
        signIn,
        fetchVillages,
        signUp,
        createPost,
        updatePost,
        deletePost,
        deleteComment,
        events,
        setEvents,
        likePost,
        unlikePost,
        timeAgo,
        siteUrl,
        siteBrand,
        siteLogo,
        deleteContact,
        logOut,
        stories,
        tags,
        formatDate,
        prices,
        villages,
        setVillages,
        setToken,
        setUser,
        setError,logOut
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function usePatel() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
