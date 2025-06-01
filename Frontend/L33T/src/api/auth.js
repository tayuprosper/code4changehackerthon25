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
  const response = await fetch(`${BASE_URL}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ username: email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Login failed");
  }

  const data = await response.json();
  
  // Save token and user data
  localStorage.setItem("token", data.access_token);
  localStorage.setItem("uid", data.uid);  // Make sure this matches your API response
  // localStorage.setItem("userData", JSON.stringify(data.user)); // Save entire user object if available
  
  // Set token expiration (assuming expires_in is in seconds)
  if (data.expires_in) {
    localStorage.setItem("token_expires", Date.now() + (data.expires_in * 1000));
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
