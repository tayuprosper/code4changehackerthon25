export function collectSignupInfo(userData) {
    console.log("collected data: ", userData);
} 

const BASE_URL = "https://code4changehackerthon25.onrender.com"; // Replace with actual backend URL

// 🔐 Sign Up
export async function signup(userData) {
    // e.preventDefault();

  const response = await fetch(`${BASE_URL}/users/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  console.log(data);
  // if (!response.ok) throw new Error(data.detail || console.log("Signup Failed!"));
    
    return data;
    
}

// 🔑 Login (JWT Token Request)
export async function login(email, password) {
  const response = await fetch(`https://code4changehackerthon25.onrender.com/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ 
      username: email, 
      password: password 
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Login failed");
  }

  const data = await response.json();
  console.log("Login API Response:", data); // Debug log

  // Save the token and user data
  localStorage.setItem("token", data.access_token);
  
  // Make sure these match your actual API response structure
  if (data.user_id) {
    localStorage.setItem("uid", data.user_id);
  } else if (data.user?.id) {
    localStorage.setItem("uid", data.user.id);
  } else {
    console.warn("No user ID found in login response");
  }

  // Set token expiration (assuming expires_in is in seconds)
  if (data.expires_in) {
    const expiresAt = Date.now() + (data.expires_in * 1000);
    localStorage.setItem("token_expires", expiresAt);
  }

  return data;
}
// 👤 Get Current User (Protected Route)
export async function getCurrentUser(token) {
  const response = await fetch(`${BASE_URL}/me`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.detail || "Failed to fetch user");
  return data;
}

// ❌ Logout (Optional - Frontend only)
export function logout() {
  localStorage.removeItem("access_token");
}
