// app/context/SidebarContext.js
"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import axios from "axios";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [news, setNews] = useState([]);
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
  const [showWelcomeCard, setShowWelcomeCard] = useState(false);
  let path = process.env.NEXT_PUBLIC_API_URL;
  if (process.env.NODE_ENV !== "development") {
    path = process.env.NEXT_PUBLIC_API_URL;
  } else {
    path = "http://localhost:5000";
  }
 const [isPWA, setIsPWA] = useState(true);
  useEffect(() => {
    // Check if the app is running as a PWA
    const checkPWA = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const isInStandaloneIOS = isIOS && window.navigator.standalone === true;
      
      setIsPWA((isStandalone || isInStandaloneIOS));
    };

    checkPWA();
    window.addEventListener('appinstalled', checkPWA);
    
    return () => {
      window.removeEventListener('appinstalled', checkPWA);
    };
  }, []);

  const whatsappLink = "https://chat.whatsapp.com/ECjLqsnPeWm3mU4UNC362s";
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
  const fetchUserFromToken = useCallback(async () => {
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
  }, [path, setUser, setError]);

  // Fetch all posts
  const fetchPosts = useCallback(async () => {
    try {
      const response = await axios.get(path + "/api/posts");
      setPosts(response.data);
      //  console.log('Posts',response.data);
    } catch (err) {
      setError(err.message);
    }
  }, [path, setPosts, setError]);
  // Fetch all news
  const fetchNews = useCallback(async () => {
    try {
      const response = await axios.get(path + "/api/news");
      setNews(response.data.reverse());
      //console.log('news',response.data);
    } catch (err) {
      setError(err.message);
    }
  }, [path, setNews]);

  const [feedbacks, setFeedbacks] = useState([]);
  // fetch feedbacks

  const fetchFeedbacks = useCallback(async () => {
    const token = localStorage.getItem("token"); // Or wherever you store the JWT

    try {
      const response = await axios.get(path + "/api/contacts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFeedbacks(response.data.reverse());
      // console.log('Contact data',response.data);
    } catch (err) {
      setError(err.message);
    }
  }, [path, setFeedbacks, setError]);
  // Fetch all posts
  const fetchStories = useCallback(async () => {
    try {
      const response = await axios.get(path + "/api/stories");
      setStories((response.data).reverse());
      //console.log(response.data);
    } catch (err) {
      setError(err.message);
    }
  }, [path, setStories, setError]);
  // Fetch all prices
  const fetchPrices = useCallback(async () => {
    try {
      const response = await axios.get(path + "/api/prices");
      setPrices(response.data);
      //console.log(response.data);
    } catch (err) {
      setError(err.message);
    }
  }, [path, setPrices, setError]);

  // Fetch all blogs
  const fetchBlogs = useCallback(async () => {
    try {
      const response = await axios.get(path + "/api/blogs");
      setBlogs(response.data.reverse());
      // console.log(response.data);
    } catch (err) {
      setError(err.message);
    }
  }, [path, setBlogs, setError]);

  // Fetch all posts
  const fetchEvents = useCallback(async () => {
    try {
      const response = await axios.get(path + "/api/events");
      setEvents(response.data.reverse());
    } catch (err) {
      setError(err.message);
    }
  }, [path, setEvents, setError]);

  // Fetch specific post
  const fetchPostById = useCallback(
    async (id) => {
      try {
        const response = await axios.get(path + `/api/posts/${id}`);
        return response.data;
      } catch (err) {
        setError(err.message);
      }
    },
    [path, setError]
  );

  // Fetch all comments for a post
  const fetchComments = async () => {
      try {
        const response = await axios.get(path + `/api/comments`);
        setComments(response.data.reverse());
        console.log('All comments',response.data);
        
      } catch (err) {
        setError(err.message);
      }
    }
   useEffect(()=>{
    console.log('log nhi ho');
    
    fetchComments()
   },[])

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
  const fetchUsers = useCallback(
    async (token) => {
      try {
        const response = await axios.get(`${path}/api/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (err) {
        setError(err.message);
      }
    },
    [path, setUsers, setError]
  ); // Add all used dependencies (path, setUsers, setError)
  // Fetch user Villages
  const fetchVillages = useCallback(
    async (id) => {
      try {
        const response = await axios.get(path + `/api/villages`);
        setVillages(response.data);
      } catch (err) {
        setError(err.message);
      }
    },
    [path, setVillages, setError]
  );

  const updateBlog = useCallback(
    async (id, updatedData) => {
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
    },
    [path, setBlogs]
  );

  const updatePrice = useCallback(
    async (id, updatedData) => {
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
    },
    [path, setPrices]
  );

  useEffect(() => {
    const token = localStorage.getItem("token"); // Or wherever you store the JWT
    if (user) {
      fetchUsers(token);
    }
  }, [user, fetchUsers]);

/* if minus sign then convert in list item */
const formatContent = (content) => {
  if (!content) return "";

  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const formattedLines = [];
  let lastLineWasContent = false;

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();

    if (trimmedLine === '') {
      if (lastLineWasContent) {
        formattedLines.push(<br key={`br-${index}`} />);
        lastLineWasContent = false;
      }
      return;
    }

    if (trimmedLine.startsWith('- ')) {
      const listItem = trimmedLine.substring(2);
      formattedLines.push(
        <div key={`li-${index}`} className="flex items-start mb-2 ml-4">
          <span className="text-emerald-500 mr-2 mt-1">•</span>
          <span className="text-sm md:text-base leading-relaxed">
            {formatTextStyles(listItem)}
          </span>
        </div>
      );
      lastLineWasContent = true;
      return;
    }

    // Check if line contains boxed content (#...#)
    if (trimmedLine.includes('#')) {
      formattedLines.push(...formatBoxedText(trimmedLine, index));
    } else {
      formattedLines.push(
        <p key={`p-${index}`} className="mb-4 text-sm md:text-base leading-relaxed">
          {formatTextStyles(trimmedLine)}
        </p>
      );
    }

    lastLineWasContent = true;
  });

  return formattedLines;
};

const formatBoxedText = (line, index) => {
  const boxedRegex = /#(.*?)#/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = boxedRegex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      const beforeText = line.slice(lastIndex, match.index);
      parts.push(
        <p key={`before-${index}-${lastIndex}`} className="mb-4 text-sm md:text-base leading-relaxed">
          {formatTextStyles(beforeText)}
        </p>
      );
    }

    parts.push(
      <div
        key={`box-${index}-${match.index}`}
        className="border-l-4 border-emerald-500 bg-emerald-50 px-3 py-2 my-2 text-sm md:text-base leading-relaxed"
      >
        {formatTextStyles(match[1])}
      </div>
    );

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < line.length) {
    const remainingText = line.slice(lastIndex);
    parts.push(
      <p key={`after-${index}-${lastIndex}`} className="mb-4 text-sm md:text-base leading-relaxed">
        {formatTextStyles(remainingText)}
      </p>
    );
  }

  return parts;
};

/* if double hastrick text hilight and enlarge */
const formatTextStyles = (text) => {
  const parts = [];
  let currentIndex = 0;

  const doubleAsteriskRegex = /\*\*(.*?)\*\*/g;
  let match;

  while ((match = doubleAsteriskRegex.exec(text)) !== null) {
    if (match.index > currentIndex) {
      const beforeText = text.slice(currentIndex, match.index);
      parts.push(formatSingleAsterisk(beforeText));
    }

    parts.push(
      <span
        key={`highlight-${match.index}`}
        className=" text-emerald-900 font-semibold"
      >
        {match[1]}
      </span>
    );

    currentIndex = match.index + match[0].length;
  }

  if (currentIndex < text.length) {
    const remainingText = text.slice(currentIndex);
    parts.push(formatSingleAsterisk(remainingText));
  }

  return parts.length > 0 ? parts : formatSingleAsterisk(text);
};

/* if single Astrick bold and black text */
const formatSingleAsterisk = (text) => {
  const parts = [];
  const singleAsteriskRegex = /\*([^*]+?)\*/g;
  let lastIndex = 0;
  let match;

  while ((match = singleAsteriskRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    parts.push(
      <strong key={`bold-${match.index}`} className="font-bold text-black">
        {match[1]}
      </strong>
    );

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
};

  useEffect(() => {
    const token1 = localStorage.getItem("token"); // Or wherever you store the JWT
    fetchPosts();
    fetchNews();
    fetchFeedbacks();
    fetchUsers(token1);
    fetchBlogs();
    fetchPrices();
    fetchStories();
    fetchVillages();
    fetchEvents();
    fetchUserFromToken();
    setToken(token1);
    //fetchUserFromToken()
  }, [
    fetchBlogs,
    fetchEvents,
    fetchFeedbacks,
    fetchPosts,
    fetchNews,
    fetchPrices,
    fetchStories,
    fetchUserFromToken,
    fetchVillages,
    fetchUsers,
  ]);
  // Sign in function (generate token)
  const signIn = async (email, password) => {
    try {
      const response = await axios.post(path + "/api/auth/login", {
        email,
        password,
      });
      console.log("login data", response.data.user);

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
function removeAsterisks(str) {
  return str.replace(/\*/g, '');
}
  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,removeAsterisks,
        toggleSidebar,
        closeSidebar,
        user,isPWA,
        users,
        news,formatContent,
        setNews,
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
        feedbacks,
        setFeedbacks,
        fetchFeedbacks,
        fetchComments,
        showWelcomeCard,
        setShowWelcomeCard,
        fetchUser,
        fetchEvents,
        signIn,
        fetchVillages,
        signUp,
        whatsappLink,
        createPost,
        updatePost,
        deletePost,
        deleteComment,
        fetchNews,
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
        setError,
        logOut,
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
