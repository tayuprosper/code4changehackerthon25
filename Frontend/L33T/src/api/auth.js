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
    console.log(data);
    return data;
    
}

// 🔑 Login (JWT Token Request)
export async function login(email, password) {
  const response = await fetch(`${BASE_URL}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" }, // ✅ Must be form data
    body: new URLSearchParams({
      username: email, // ✅ Must match FastAPI's OAuth2PasswordRequestForm fields
      password: password,
    }),
  });

  const data = await response.json();
  console.log("Login Response:", data);

  if (!response.ok) throw new Error(data.detail || "Login failed");
  return data; // { access_token, token_type }
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
